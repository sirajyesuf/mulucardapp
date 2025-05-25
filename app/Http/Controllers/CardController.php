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
        \Log::info('updateCardService called', [
            'card_id' => $card->id,
            'services_count' => count($services),
            'services' => $services
        ]);

        // If no services provided, delete all existing services
        if (empty($services)) {
            $card->services()->delete();
            return;
        }

        // Get existing service IDs from database
        $existingServices = $card->services()->get();
        $existingServiceIds = $existingServices->pluck('id')->toArray();
        
        \Log::info('Existing services', [
            'existing_ids' => $existingServiceIds
        ]);
        
        // Collect service IDs from request that are numeric (existing services)
        $requestExistingIds = [];
        $newServices = [];
        $updateServices = [];

        foreach ($services as $service) {
            if (is_numeric($service['id'])) {
                // This is an existing service
                $requestExistingIds[] = (int)$service['id'];
                $updateServices[] = $service;
            } else {
                // This is a new service (has UUID or non-numeric ID)
                $newServices[] = $service;
            }
        }

        \Log::info('Categorized services', [
            'request_existing_ids' => $requestExistingIds,
            'new_services_count' => count($newServices),
            'update_services_count' => count($updateServices)
        ]);

        // Delete services that are no longer in the request
        $servicesToDelete = array_diff($existingServiceIds, $requestExistingIds);
        if (!empty($servicesToDelete)) {
            \Log::info('Deleting services', ['ids' => $servicesToDelete]);
            // Delete old files before deleting records
            foreach ($existingServices->whereIn('id', $servicesToDelete) as $service) {
                if ($service->path) {
                    $this->deleteOldImage($service->path);
                }
            }
            $card->services()->whereIn('id', $servicesToDelete)->delete();
        }

        // Create new services
        foreach ($newServices as $service) {
            \Log::info('Creating new service', ['service' => $service]);
            $serviceData = [
                'name' => $service['name'],
                'description' => $service['description'],
                'path' => '/storage/services/default.jpg' // Default path when no file
            ];
            
            if (isset($service['file']) && $service['file'] !== null) {
                $path = Storage::disk('public')->putFile('services', $service['file']);
                $serviceData['path'] = Storage::url($path);
            }
            
            $card->services()->create($serviceData);
        }

        // Update existing services
        foreach ($updateServices as $service) {
            $serviceId = (int)$service['id'];
            $existingService = $existingServices->where('id', $serviceId)->first();
            
            if (!$existingService) {
                continue; // Skip if service doesn't exist
            }

            \Log::info('Updating existing service', ['id' => $serviceId, 'service' => $service]);

            $serviceData = [
                'name' => $service['name'],
                'description' => $service['description']
            ];
            
            // Handle file update
            if (isset($service['file']) && $service['file'] !== null) {
                // Delete old file if exists
                if ($existingService->path) {
                    $this->deleteOldImage($existingService->path);
                }
                
                $path = Storage::disk('public')->putFile('services', $service['file']);
                $serviceData['path'] = Storage::url($path);
            }
            
            $card->services()->where('id', $serviceId)->update($serviceData);
        }
    }


    protected function updateGalleries($card, $galleries){
        // If no galleries provided, delete all existing galleries
        if (empty($galleries)) {
            $card->galleries()->delete();
            return;
        }

        // Get existing gallery IDs from database
        $existingGalleries = $card->galleries()->get();
        $existingGalleryIds = $existingGalleries->pluck('id')->toArray();
        
        // Collect gallery IDs from request that are numeric (existing galleries)
        $requestExistingIds = [];
        $newGalleries = [];
        $updateGalleries = [];

        foreach ($galleries as $gallery) {
            if (is_numeric($gallery['id'])) {
                // This is an existing gallery
                $requestExistingIds[] = (int)$gallery['id'];
                $updateGalleries[] = $gallery;
            } else {
                // This is a new gallery (has UUID or non-numeric ID)
                $newGalleries[] = $gallery;
            }
        }

        // Delete galleries that are no longer in the request
        $galleriesToDelete = array_diff($existingGalleryIds, $requestExistingIds);
        if (!empty($galleriesToDelete)) {
            // Delete old files before deleting records
            foreach ($existingGalleries->whereIn('id', $galleriesToDelete) as $gallery) {
                if ($gallery->path) {
                    $this->deleteOldImage($gallery->path);
                }
            }
            $card->galleries()->whereIn('id', $galleriesToDelete)->delete();
        }

        // Create new galleries
        foreach ($newGalleries as $gallery) {
            $galleryData = [
                'description' => $gallery['description'],
                'path' => '/storage/galleries/default.jpg' // Default path when no file
            ];
            
            if (isset($gallery['file']) && $gallery['file'] !== null) {
                $path = Storage::disk('public')->putFile('galleries', $gallery['file']);
                $galleryData['path'] = Storage::url($path);
            }
            
            $card->galleries()->create($galleryData);
        }

        // Update existing galleries
        foreach ($updateGalleries as $gallery) {
            $galleryId = (int)$gallery['id'];
            $existingGallery = $existingGalleries->where('id', $galleryId)->first();
            
            if (!$existingGallery) {
                continue; // Skip if gallery doesn't exist
            }

            $galleryData = [
                'description' => $gallery['description']
            ];
            
            // Handle file update
            if (isset($gallery['file']) && $gallery['file'] !== null) {
                // Delete old file if exists
                if ($existingGallery->path) {
                    $this->deleteOldImage($existingGallery->path);
                }
                
                $path = Storage::disk('public')->putFile('galleries', $gallery['file']);
                $galleryData['path'] = Storage::url($path);
            }
            
            $card->galleries()->where('id', $galleryId)->update($galleryData);
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
