<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Http\Requests\Card\CardRequest as StoreRequest;
use App\Http\Requests\Card\UpdateCardRequest as UpdateRequest;
use App\Models\Card;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use SimpleSoftwareIO\QrCode\Facades\QrCode;
use App\Http\Resources\CardResource;
use JeroenDesloovere\VCard\VCard;
use App\Enums\CardSocialLinks;
use Illuminate\Support\Facades\DB;

class CardController extends Controller
{
    public function create(){

    
        if (auth()->user()->cannot('create', Card::class)) {
            return redirect()->back();
        }

        return Inertia::render('card/create');
    }

    protected function storeCardService($services, $card){

        foreach($services as $service) {

            $path = Storage::disk('public')->putFile('services', $service['file']);
            $card->services()->create([
                'path' => Storage::url($path),
                'name' => $service['name'],
                'description' => $service['description']
            ]);
        }
    }

    protected function storeCardGallery($galleries, $card){

        foreach ($galleries as $gallery) {

            $path = Storage::disk('public')->putFile('galleries', $gallery['file']);
            $card->galleries()->create([
                'path' => Storage::url($path),
                'description' => $gallery['description'],
            ]);
        }
    }

    protected function storeCardLinks($links, $card){

        foreach ($links as $link) {

            $card->socialLinks()->create([
                'name' => $link['name'],
                'url' => $link['url'],
            ]);
    }
    }

    public function  store(StoreRequest $request){
        
        $validated = $request->validated();

        $bannerPath = $request->file('banner.file')
            ? Storage::url($request->file('banner.file')->store('banners', 'public'))
            : null;

        $avatarPath = $request->file('avatar.file')
            ? Storage::url($request->file('avatar.file')->store('avatars', 'public'))
            : null;
        $logoPath = $request->file('logo.file')
            ? Storage::url($request->file('logo.file')->store('logos', 'public'))
            : null;

        $url = $this->generateUniqueUrl();

        $qrCodePath = $this->generateQRCode(route('card.hello',['url' => $url]),$request->banner_color);

        $card = Card::create([
            'url' => $url,
            'banner' => $bannerPath,
            'avatar' => $avatarPath,
            'logo' => $logoPath,
            'first_name' => $request->first_name,
            'last_name' => $request->last_name,
            'job_title' => $request->job_title,
            'organization' => $request->organization,
            'user_id' => auth()->id(),
            'banner_color' => $request->banner_color,
            'email' => $request->email,
            'phone' => $request->phone,
            'headline' => $request->headline,
            'address' => $request->address,
            'location' => $request->location,
            'qr_code' => $qrCodePath,
            'business_hours' => $request->business_hours_enabled ? $request->business_hours : null,
        ]);

        if($request->links and count($request->links) > 0){
            $this->storeCardLinks($request->links, $card);
        }

        if(isset($request->galleries)){
            $this->storeCardGallery($validated['galleries'], $card);
        }

        if(isset($request->services)){
            $this->storeCardService($validated['services'], $card);
        }

        return redirect()->route('dashboard')->with('success', 'Card created successfully!');
    }

    public function show($id)
    {
        $card = Card::where('id', $id)->with('socialLinks', 'galleries', 'services')->firstOrFail();

        if (auth()->user()->cannot('view',$card)) {

            return redirect()->route('dashboard');
        }

        $card = new CardResource($card);
        return Inertia::render('card/show', ['card' => $card]);
    }


    public function edit($id)
    {
        $card = Card::where('id', $id)->with('socialLinks', 'galleries', 'services')->firstOrFail();

        if (auth()->user()->cannot('update',$card)) {

            return redirect()->route('dashboard');
        }

        $card = new CardResource($card);

        return Inertia::render('card/edit', ['card' => $card]);
    }

    public function update(UpdateRequest $request, $id)
    {     

        $validated = $request->validated();
        $card = Card::findOrFail($id);


        // Handle file uploads
        $bannerPath = $card->banner;
        if ($request->hasFile('banner.file')) {
            // Delete old banner if it exists
            if ($card->banner) {
                $this->deleteOldImage($card->banner);
            }
            $bannerPath = Storage::url($request->file('banner.file')->store('banners', 'public'));
        }

        $avatarPath = $card->avatar;
        if ($request->hasFile('avatar.file')) {
            // Delete old avatar if it exists
            if ($card->avatar) {
                $this->deleteOldImage($card->avatar);
            }
            $avatarPath = Storage::url($request->file('avatar.file')->store('avatars', 'public'));
        }

        $logoPath = $card->logo;
        if ($request->hasFile('logo.file')) {
            // Delete old logo if it exists
            if ($card->logo) {
                $this->deleteOldImage($card->logo);
            }
            $logoPath = Storage::url($request->file('logo.file')->store('logos', 'public'));
        }

        // Update card basic information
        $card->update([
            'banner' => $bannerPath,
            'avatar' => $avatarPath,
            'logo' => $logoPath,
            'first_name' => $request->first_name,
            'last_name' => $request->last_name,
            'job_title' => $request->job_title,
            'organization' => $request->organization,
            'banner_color' => $request->banner_color,
            'email' => $request->email,
            'phone' => $request->phone,
            'headline' => $request->headline,
            'address' => $request->address,
            'location' => $request->location,
            'business_hours' => $request->business_hours_enabled ? $request->business_hours : null,
        ]);


        //update social links for the card
        $this->updateSocialLinks($card, $validated);

        $this->updateCardService($card, $validated['services'] ?? []);
        $this->updateGalleries($card, $validated['galleries'] ?? []);

        return redirect()->back();
    }

    protected function updateCardService($card, $services){
        // pluck all services ids belongs the card
        $serviceIds = $card->services->pluck('id')->filter()->toArray();

        //services length zero delelte all services
        if(count($services) === 0){
            $card->services()->delete();
            return;
        }

        foreach($services as $service){
            
            if($service['file'] === null){

                $card->services()->where('id', $service['id'])->update([
                    'name' => $service['name'],
                    'description' => $service['description']
                ]);
            }

            if($service['file'] !== null and !in_array($service['id'], $serviceIds)){
                $path = Storage::disk('public')->putFile('services', $service['file']);
                $card->services()->create([
                    'path' => Storage::url($path),
                    'name' => $service['name'],
                    'description' => $service['description']
                ]);
            }

            if($service['file'] !== null and in_array($service['id'], $serviceIds)){
                $path = Storage::disk('public')->putFile('services', $service['file']);
                $card->services()->where('id', $service['id'])->update([
                    'path' => Storage::url($path),
                    'name' => $service['name'],
                    'description' => $service['description']
                ]);
            }
        }
    }


    protected function updateGalleries($card, $galleries){

        // pluck all gallery ids from the $galleries
        $galleryIds = array_filter(array_column($galleries, 'id'));

        foreach($card->galleries as $gallery){
            
            if(!in_array($gallery->id, $galleryIds)){
                $gallery->delete();
            }
        }

        $dbGalleryIds = $card->galleries->pluck('id')->filter()->toArray();

        foreach($galleries as $gallery){

            if($gallery['file'] === null){
                $card->galleries()->where('id', $gallery['id'])->update([
                    'description' => $gallery['description']
                ]);
            }

            if($gallery['file'] !== null and !in_array($gallery['id'], $dbGalleryIds)){
                $path = Storage::disk('public')->putFile('galleries', $gallery['file']);
                $card->galleries()->create([
                    'path' => Storage::url($path),
                    'description' => $gallery['description']
                ]);
            }

            if($gallery['file'] !== null and in_array($gallery['id'], $dbGalleryIds)){
                $path = Storage::disk('public')->putFile('galleries', $gallery['file']);
                $card->galleries()->where('id', $gallery['id'])->update([
                    'path' => Storage::url($path),
                    'description' => $gallery['description']
                ]);
            }
        }
        
    }

    protected function updateSocialLinks($card, $validated){
        try {
            DB::beginTransaction();
            
            // Delete all existing social links for this card
            $card->socialLinks()->delete();

            // Create new social links if they exist
            if (!empty($validated['links'])) {
                foreach ($validated['links'] as $link) {
                    $card->socialLinks()->create([
                        'name' => $link['name'],
                        'url' => $link['url'],
                    ]);
                }
            }

            DB::commit();
        } catch (\Exception $e) {
            DB::rollBack();
            throw $e;
        }
    }


    public function settings($id){

        $card = Card::findOrFail($id);

        $validated = request()->validate([
            'personalizedurl' => [
                'required',
                'string',                // Must be a string
                'max:255',               // Max length of 255 characters
                'unique:cards,url,' . $card->id,
                'regex:/^[a-zA-Z0-9]+$/' // Only letters (a-z, A-Z) and numbers (0-9), no spaces or special characters
            ],
            'cardname' => [
                'nullable',
                'string',                // Must be a string
                'max:255',               // Max length of 255 characters
            ],

            'status' => [
                'required',
                'boolean',               // Must be a boolean
            ],
        ]);


        if($card->url !== $validated['personalizedurl']){
            $qrCodePath = $this->generateQRCode(route('card.hello', ['url' => $validated['personalizedurl']]), $card->banner_color);
            $card->qr_code = $qrCodePath;
            $card->url = $validated['personalizedurl'];
        }

        if($card->cardname !== $validated['cardname']){
            $card->cardname = $validated['cardname'];
        }

        if($card->status !== $validated['status']){
            $card->status = $validated['status'];
        }

        if($card->isDirty()){
            $card->save();
        }   

        return to_route('card.show', $card->id);
    }




    


    public function delete($id) {

        $card = Card::findOrFail($id);

        $card->delete();

        return redirect()->route('dashboard');
    }



    public function downloadVCard($id){

        $this->updateTotalSaves($id);

        $card = Card::findOrFail($id);

        // Create a new vCard instance
        $vcard = new VCard();

        // Add personal data
        $vcard->addName($card->last_name, $card->first_name);
        $vcard->addEmail($card->email);
        $vcard->addPhoneNumber($card->phone, 'WORK');
        $vcard->addCompany($card->organization);
        $vcard->addJobtitle($card->job_title);
        $vcard->addPhoneNumber($card->phone);
        // $vcard->addAddress(null, null, $card->address, $card->location);

        // Add social links (optional, non-standard but supported by some clients)
        foreach ($card->socialLinks ?? [] as $link) {
            if (!empty($link['url'])) {
                $vcard->addUrl($link['url'], strtoupper($link['name']));
            }
        }

        // Optionally add a photo (if avatar exists)
        if (!empty($card->avatar)) {
            $avatarPath = storage_path('app/public/' . $card->avatar);
            if (file_exists($avatarPath)) {
                $vcard->addPhoto($avatarPath);
            }
        }

        // Generate the vCard content
        // $vcardContent = $vcard->getOutput();

        // Return as a downloadable file
        // return response($vcardContent, 200, [
        //     'Content-Type' => 'text/vcard',
        //     'Content-Disposition' => 'attachment; filename="contact.vcf"',
        // ]);
        //

        // return $vcard->download();

        return response($vcard->getOutput(), 200, [
        'Content-Type' => 'text/vcard; charset=utf-8',
        'Content-Disposition' => 'inline; filename="contact.vcf"',
        ]);

    }

   protected  function generateUniqueUrl($length = 8) {
        do {
            // Generate a random string of specified length
            $uniqueString = Str::random($length);

            // Check if it exists in the cards table url column
            $exists = Card::where('url', $uniqueString)->exists();
        } while ($exists); // Keep generating if it already exists

        return $uniqueString;
    }


    protected function generateQrCode($url,$color){

        $size = 400;
        list($r, $g, $b) = sscanf($color, "#%02x%02x%02x");


        $qrCode = QrCode::format('png')
            ->size($size)
            ->color($r, $g, $b)
            ->generate($url);

        $path = 'qrcodes/' . Str::random(40) . '.png';
        Storage::disk('public')->put($path, $qrCode);

        return $path;

    }

    protected function deleteOldImage($path)
    {
        if ($path) {
            $relativePath = Str::after($path, Storage::url('/'));
            if (Storage::disk('public')->exists($relativePath)) {
                Storage::disk('public')->delete($relativePath);
            }
        }
    }

    public function updateTotalSaves($id){
        $card = Card::where('id', $id)->firstOrFail();
        $card->total_saves++;
        $card->save();
        
        return response()->json(['success' => true]);
    }


}
