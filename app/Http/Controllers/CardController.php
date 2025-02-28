<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Http\Requests\Card\CardRequest as Request;
use App\Models\Card;
use Illuminate\Support\Facades\Storage;


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
        $card = Card::create([
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
        ]);

        // Store each link in the social_links table
        //
        foreach ($validated['links'] as $link) {
            $card->socialLinks()->create([
                'name' => $link['name'],
                'url' => $link['url'],
            ]);
        }
        return redirect()->route('dashboard')->with('success', 'Card created successfully!');
    }
}
