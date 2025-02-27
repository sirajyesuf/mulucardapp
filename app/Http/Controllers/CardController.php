<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Http\Requests\Card\CardRequest as Request;
use App\Models\Card;

class CardController extends Controller
{
    public function create(){

        return Inertia::render('card/create');
    }

    public function  store(Request $request){

        $validated = $request->validated();
// Handle file uploads
        $avatarPath = $request->file('avatar')
            ? $request->file('avatar')->store('avatars', 'public')
            : null;
        $logoPath = $request->file('logo')
            ? $request->file('logo')->store('logos', 'public')
            : null;
        $card = Card::create([
            'avatar' => $avatarPath,
            'logo' => $logoPath,
            'first_name' => $request->first_name,
            'last_name' => $request->last_name,
            'job_title' => $request->job_title,
            'organization' => $request->organization,
            'user_id' => auth()->id(),
        ]);

        // Store each link in the social_links table
        foreach ($validated['links'] as $link) {
            $card->socialLinks()->create([
                'name' => $link['name'],
                'url' => $link['value'],
            ]);
        }
        return redirect()->route('dashboard')->with('success', 'Card created successfully!');
    }
}
