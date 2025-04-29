<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <title inertia>{{ config('app.name', 'Laravel') }}</title>

        {{-- Standard Meta Tags --}}
        <link rel="canonical" href="{{ url()->current() }}" />
        <meta name="robots" content="index, follow"> {{-- Adjust content as needed (e.g., 'noindex, nofollow') --}}
        <meta name="description" content="mulucard-Modern digital business cards for freelancers, professionals, and businesses.">
        <meta name="keywords" content="digital business card, nfc card based business card, business card, card, digital card, nfc card">
        <meta name="author" content="MuluCard">

        {{-- Open Graph / Facebook Meta Tags --}}
        <meta property="og:type" content="website">
        <meta property="og:url" content="{{ url()->current() }}">
        <meta property="og:title" content="{{ config('app.name', 'Laravel') }}">
        <meta property="og:description" content="Modern digital business cards for freelancers, professionals, and businesses.">
        <meta property="og:image" content="{{ asset('logo.png') }}"> {{-- Replace with actual image path --}}
        <meta property="og:site_name" content="{{ config('app.name', 'Laravel') }}">

        {{-- Twitter Card Meta Tags --}}
        <meta name="twitter:card" content="summary_large_image"> {{-- Use 'summary' for smaller images --}}
        <meta name="twitter:url" content="{{ url()->current() }}">
        <meta name="twitter:title" content="{{ config('app.name', 'Laravel') }}">
        <meta name="twitter:description" content="Modern digital business cards for freelancers, professionals, and businesses.">
        <meta name="twitter:image" content="{{ asset('logo.png') }}"> {{-- Replace with actual image path --}}
        <meta name="twitter:site" content="@MuluCard"> {{-- Replace with your site's Twitter handle --}}
        <meta name="twitter:creator" content="@MuluCard"> {{-- Replace with the content creator's Twitter handle (optional) --}}

        {{-- Favicon --}}
        <link rel="icon" href="{{ asset('/favicon.ico') }}" type="image/x-icon"> {{-- Replace with your favicon path --}}
        {{-- Add other favicon sizes/types if needed (e.g., apple-touch-icon) --}}

        {{-- Fonts --}}
        <link rel="preconnect" href="https://fonts.bunny.net">
        <link href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600" rel="stylesheet" />

        <script
        crossorigin="anonymous"
        src="https://cdn.jsdelivr.net/npm/meta-scan/dist/auto.global.js"
        data-auto-enable="true"
      ></script>
        @routes
        @viteReactRefresh
        @vite(['resources/js/app.tsx', "resources/js/pages/{$page['component']}.tsx"])
        @inertiaHead
    </head>
    <body class="font-sans antialiased">
        @inertia
    </body>
</html>
