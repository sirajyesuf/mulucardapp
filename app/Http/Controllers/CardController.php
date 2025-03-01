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
