<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;
use Illuminate\Support\Facades\App;

class SecureHeaders
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        $response = $next($request);

        $response->headers->set('Strict-Transport-Security', 'max-age=63072000; includeSubDomains; preload');
        // $response->headers->set('Content-Security-Policy', "default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'");
        $response->headers->set('X-Frame-Options', 'DENY');
        $response->headers->set('X-Content-Type-Options', 'nosniff');
        $response->headers->set('Referrer-Policy', 'no-referrer-when-downgrade');
        $response->headers->set('Permissions-Policy', 'geolocation=(), microphone=()');


        if (App::environment('local')) {
            // Relaxed CSP for local dev with Vite + React
            $response->headers->set('Content-Security-Policy',
            "default-src 'self' http://127.0.0.1:5173; " .
            "script-src 'self' 'unsafe-inline' 'unsafe-eval' http://127.0.0.1:5173; " .
            "style-src 'self' 'unsafe-inline' http://127.0.0.1:5173 https://fonts.bunny.net; " .
            "font-src 'self' https://fonts.bunny.net; " .
            "connect-src 'self' ws://127.0.0.1:5173 http://127.0.0.1:5173; " .
            "img-src 'self' data:; " .
            "object-src 'none'; " .
            "frame-ancestors 'none';"
        );
        } else {
            // Strict CSP for production
            $response->headers->set('Content-Security-Policy',
            "default-src 'self'; " .
            "script-src 'self'; " .
            "style-src 'self' 'unsafe-inline' https://fonts.bunny.net; " .
            "font-src 'self' https://fonts.bunny.net; " .
            "connect-src 'self'; " .
            "img-src 'self' data:; " .
            "object-src 'none'; " .
            "frame-ancestors 'none';"
        );
        }

        return $response;
    }
}
