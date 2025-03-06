<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use auth;
use App\Http\Resources\CardResource;

class DashboardController extends Controller
{
    public function index()
    {

        $cards = auth()->user()->cards()->with('socialLinks','galleries','services')->get();

        $cards =  CardResource::collection($cards);

        return Inertia::render('dashboard', ['cards' => $cards]);
    }

}
