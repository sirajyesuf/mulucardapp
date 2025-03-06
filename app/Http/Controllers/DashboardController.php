<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use auth;
class DashboardController extends Controller
{
    public function index()
    {

        $cards = auth()->user()->cards()->with('socialLinks','galleries','services')->get();


        return Inertia::render('dashboard', ['cards' => $cards]);
    }

}
