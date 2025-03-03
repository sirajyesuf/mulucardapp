<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Http\Requests\Card\CardRequest as Request;
use App\Models\Card;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use SimpleSoftwareIO\QrCode\Facades\QrCode;
class CardController extends Controller
{
    public function create(){

        return Inertia::render('card/create');
    }

    public function  store(Request $request){

        $validated = $request->validated();

        $avatarPath = $request->file('avatar')
            ? Storage::url($request->file('avatar')->store('avatars', 'public'))
            : null;
        $logoPath = $request->file('logo')
            ? Storage::url($request->file('logo')->store('logos', 'public'))
            : null;
        $url = $this->generateUniqueUrl();
        $qrCodePath = $this->generateQRCode($url,$request->banner_color);
        $card = Card::create([
            'url' => $url,
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
            'qr_code' => $qrCodePath
        ]);


        foreach ($validated['links'] as $link) {
            $card->socialLinks()->create([
                'name' => $link['name'],
                'url' => $link['url'],
            ]);
        }
        return redirect()->route('dashboard')->with('success', 'Card created successfully!');
    }

    public function show($url)
    {
        $card = Card::where('url', $url)->with('socialLinks')->firstOrFail();

        return Inertia::render('card/show', ['card' => $card]);
    }


    public function edit($id)
    {
        $card = Card::findOrFail($id);

        return Inertia::render('card/edit', ['card' => $card]);
    }

    public function update(Request $request,$id)
    {       $validated = $request->validated();

            $card = Card::findOrFail($id);

            // Update the card with validated data
            $card->update($validated);

            // Handle file uploads if present
            // if ($request->hasFile('avatar')) {
            //     $card->avatar = $request->file('avatar')->store('avatars', 'public');
            // }
            // if ($request->hasFile('logo')) {
            //     $card->logo = $request->file('logo')->store('logos', 'public');
            // }

            $card->save();

            return redirect()->route('card.show', $card->id)->with('success', 'Card updated successfully');
    }

    public function personalizedURL($id) {

        $validated = request()->validate([
            'personalizedurl' => [
                'required',              // Must not be empty
                'string',                // Must be a string
                'max:255',               // Max length of 255 characters
                'unique:cards,url',      // Must be unique in the 'url' column of the 'cards' table
                'regex:/^[a-zA-Z0-9]+$/' // Only letters (a-z, A-Z) and numbers (0-9), no spaces or special characters
            ],
        ]);

        $card = Card::findOrFail($id);

        $card->url = $validated['personalizedurl'];

        $card->save();

        return redirect()->route('card.show', $card->url)->with('success', 'Card  updated successfully');
    }


    public function delete($id) {

        $card = Card::findOrFail($id);

        $card->delete();

        return redirect()->route('card.create');
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


}
