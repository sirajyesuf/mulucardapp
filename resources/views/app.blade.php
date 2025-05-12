<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">



        @if(isset($metadata))
            {{-- Standard Meta Tags --}}
            <link rel="canonical" href="{{ url()->current() }}" />
            <meta name="robots" content="index, follow">
            <title>{{ $metadata['title'] }}</title>
            <meta name="description" content="{{$metadata['description']}}">
            <meta name="keywords" content="{{$metadata['keywords']}}">
            <meta name="author" content="{{$metadata['author']}}">

            {{-- Open Graph / Facebook Meta Tags --}}
            <meta property="og:type" content="website">
            <meta property="og:url" content="{{ url()->current() }}">

            <meta property="og:title" content="{{$metadata['og:title']}}">
            <meta property="og:description" content="{{$metadata['og:description']}}">
            <meta property="og:image" content="{{$metadata['og:image']}}">
            <meta property="og:site_name" content="{{ $metadata['og:site_name'] }}">
            <meta property="og:image:height" content="1200">
            <meta property="og:image:width" content="600">
            <meta property="og:image:type" content="image/png">

            {{-- Twitter Card Meta Tags --}}
            <meta name="twitter:card" content="summary_large_image">
            <meta name="twitter:url" content="{{ url()->current() }}">
            <meta name="twitter:title" content="{{$metadata['twitter:title']}}">
            <meta name="twitter:description" content="{{$metadata['twitter:description']}}">
            <meta name="twitter:image" content="{{$metadata['twitter:image']}}">
            <meta name="twitter:site" content="@MuluCard">
            <meta name="twitter:creator" content="@MuluCard">
        @endif




        {{-- Favicon --}}
        <link rel="icon" href="{{ asset('/favicon.ico') }}" type="image/x-icon">

        {{-- Fonts --}}
        <link rel="preconnect" href="https://fonts.bunny.net">
        <link href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600" rel="stylesheet" />

        @routes
        @viteReactRefresh
        @vite(['resources/js/app.tsx', "resources/js/pages/{$page['component']}.tsx"])
        @inertiaHead
    </head>
    <body class="font-sans antialiased">
        @inertia
    </body>
</html>
