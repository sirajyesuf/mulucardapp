<?
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
        try {
            // Validate the request
            $validated = $request->validate([
                'email' => 'required|email|exists:users,email',
            ]);

            // Find the user
            $user = User::where('email', $validated['email'])->first();

            // Generate the magic link URL
            $url = $user->generateLoginUrl();

            // Send the magic link email
            Mail::to($user->email)->send(new MagicLinkMail($url));

            // Return a success response for Inertia
            return Inertia::render('auth/magic-login')->with([
                'status' => 'Magic link has been sent to your email.',
            ]);

        } catch (ValidationException $e) {
            // Return validation errors to Inertia
            return back()->withErrors($e->errors())->withInput();

        } catch (\Swift_TransportException $e) {
            // Handle email sending failure
            return back()->withErrors([
                'email' => 'Failed to send the magic link email. Please try again later.',
            ]);

        } catch (\Exception $e) {
            // Handle any other unexpected errors
            return back()->withErrors([
                'email' => 'An unexpected error occurred. Please try again.',
            ]);
        }
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