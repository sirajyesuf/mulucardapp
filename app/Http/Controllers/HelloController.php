<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Http\Resources\CardResource;
use App\Models\Card;

class HelloController extends Controller
{
    public function index($url)
    {

        $card = Card::where('url', $url)->with('socialLinks', 'galleries', 'services')->firstOrFail();
        $card = new CardResource($card);

        return Inertia::render('hello',["url"=>$url,"card"=>$card]);
    }
}
