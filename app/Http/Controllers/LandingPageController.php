<?php

namespace App\Http\Controllers;

use App\Http\Resources\PlanResource;
use App\Models\Plan;
use Inertia\Inertia;

class LandingPageController extends Controller
{
    public function index()
    {

        $plans = PlanResource::collection(Plan::availableToCustomers()->get());

        $metadata = [
            'title' => 'MuluCard – Digital Business Cards for Professionals & Teams',
            'description' => 'Create and share stunning digital business cards instantly with MuluCard. Perfect for freelancers, professionals, teams, and businesses.',
            'keywords' => 'digital business card, NFC card, smart business card, contactless card, business networking, professional profile, MuluCard',
            'author' => 'MuluCard',

            // Open Graph (Facebook/LinkedIn)
            'og:title' => 'MuluCard – Smart Digital Business Cards',
            'og:description' => 'Modern NFC-enabled digital cards for professionals. Share your contact instantly with MuluCard.',
            'og:image' => asset('logo.png'),
            'og:site_name' => 'MuluCard',

            // Twitter Card
            'twitter:title' => 'MuluCard – Smart Digital Business Cards',
            'twitter:description' => 'Share contact details, links, and portfolios with just a tap. The future of networking is here with MuluCard.',
            'twitter:image' => asset('logo.png'),
        ];

        return Inertia::render('welcome', [
            'plans' => $plans,
        ])->withViewData(['metadata' => $metadata]);

    }
}
