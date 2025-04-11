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
        try {
            $card = Card::where('url', $url)->where('status', true)->with('socialLinks', 'galleries', 'services')->firstOrFail();
            $this->updateTotalViews($url);
            $card = new CardResource($card);
            return Inertia::render('hello',["url"=>$url,"card"=>$card]);
        } catch (\Illuminate\Database\Eloquent\ModelNotFoundException $e) {
            return redirect('/');
        }
    }

    protected function updateTotalViews($url)
    {
        $card = Card::where('url', $url)->firstOrFail();
        $card->total_views++;
        $card->save();
    }
}
