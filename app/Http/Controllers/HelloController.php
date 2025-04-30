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
            
            $metadata = $this->getMetaData($card);

            $this->updateTotalViews($url);
            
            $cardRe = new CardResource($card);

            return Inertia::render('hello',["url"=>$url,"card"=>$cardRe])->withViewData(['metadata' => $metadata]);

        } catch (\Illuminate\Database\Eloquent\ModelNotFoundException $e) {
            return redirect('/');
        }
    }


    protected function getMetaData($card){


        $metadata = [
            'title' => $card->first_name . " " .$card->last_name,
            'description' => $card->headline,
            'keywords' => '',
            'author' => 'MuluCard',
    
            // Open Graph (Facebook/LinkedIn)
            'og:title' => $card->first_name . " " .$card->last_name,
            'og:description' => $card->headline,
            'og:image' => asset($card->avatar), 
            'og:site_name' => 'MuluCard',
    
            // Twitter Card
            'twitter:title' => $card->first_name . " " .$card->last_name,
            'twitter:description' => $card->headline,
            'twitter:image' => asset($card->avatar),
        ];

        return $metadata;


    }

    protected function updateTotalViews($url)
    {
        $card = Card::where('url', $url)->firstOrFail();
        $card->total_views++;
        $card->save();
    }
}
