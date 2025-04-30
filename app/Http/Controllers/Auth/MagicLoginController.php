<?php
namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;
use Inertia\Inertia;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Auth;
use App\Mail\MagicLinkMail;
use Illuminate\Validation\ValidationException;

class MagicLoginController extends Controller
{
    public function show()
    {
        return Inertia::render('auth/magic-login');
    }

    public function send(Request $request)
    {

        // Validate the request
        $validated = $request->validate([
            'email' => 'required|email|exists:users,email',
        ]);

        try {

            // Find the user
            $user = User::where('email', $validated['email'])->first();

            // Generate the magic link URL
            $url = $user->generateLoginUrl();

            // Send the magic link email
            Mail::to($user->email)->send(new MagicLinkMail($url));

            return back()->withSuccess([
                'message' => 'login magic link has been sent to your email address.',
            ]);

        }
        catch (\Symfony\Component\Mailer\Exception\TransportException $e) {
            return back()->withError([
                'message' => 'Failed to send the magic link email. Please try again later.',
            ]);
        }
        
        
    }

    public function verify(Request $request, $user)
    {
        if (!$request->hasValidSignature()) {
            
            return Inertia::render('invalid-login');
        }

        $user = User::findOrFail($user);

        Auth::login($user);

        return redirect()->route('dashboard');
    }
}