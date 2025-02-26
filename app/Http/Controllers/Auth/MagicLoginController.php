<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;
use Inertia\Inertia;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Auth;

class MagicLoginController extends Controller
{
    public function show()
    {
        return Inertia::render('auth/magic-login');
    }

    public function  send(Request $request){

        $request->validate(['email' => 'required|email|exists:users,email']);
        $user = User::where('email', $request->email)->first();
        $url = $user->generateLoginUrl();

        // Send the email
        Mail::raw("Click this link to log in: $url", function ($message) use ($user) {
        $message->to($user->email)->subject('Your Magic Login Link');
        });


        return redirect()->back()->with('success', 'Magic link sent! Check your email.');

    }

    public function verify(Request $request, $user)
    {
        if (!$request->hasValidSignature()) {
            return Inertia::render('auth/magic-login', [
                'errors' => ['link' => 'Invalid or expired magic link.'],
            ]);
        }

        $user = User::findOrFail($user);

        Auth::login($user);

        return redirect()->route('dashboard');
    }


}
