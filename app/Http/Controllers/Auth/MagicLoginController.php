<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;
use Inertia\Inertia;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Auth;
use App\Mail\MagicLinkMail;
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

        Mail::to($user->email)->send(new MagicLinkMail($url));

        return redirect()->back();

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
