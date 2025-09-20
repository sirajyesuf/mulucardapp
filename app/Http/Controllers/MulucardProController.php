<?php

namespace App\Http\Controllers;

use Inertia\Inertia;

class MulucardProController extends Controller
{
    public function index()
    {
        $metadata = [
            'title' => 'MuluCard Pro – Blockchain-Verified Digital Identity Cards',
            'description' => 'MuluCard Pro offers NFC & QR cards linked to Cardano-verified profiles, providing secure, blockchain-backed IDs for professionals, events, and organizations.',
            'keywords' => 'blockchain identity, Cardano, NFC cards, QR cards, digital identity, verifiable credentials, professional cards, secure networking',
            'author' => 'MuluCard',

            // Open Graph (Facebook/LinkedIn)
            'og:title' => 'MuluCard Pro – Blockchain-Verified Digital Identity',
            'og:description' => 'Secure, blockchain-backed NFC and QR cards with Cardano verification for professionals and organizations.',
            'og:image' => asset('logo.png'), 
            'og:site_name' => 'MuluCard Pro',

            // Twitter Card
            'twitter:title' => 'MuluCard Pro – Blockchain-Verified Digital Identity',
            'twitter:description' => 'Introducing blockchain technology to professionals through tangible NFC and QR-verified cards.',
            'twitter:image' => asset('logo.png'),
        ];

        return Inertia::render("mulucardpro")
            ->withViewData(['metadata' => $metadata]);
    }
}
