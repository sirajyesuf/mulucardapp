<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use auth;
class DashboardController extends Controller
{
    public function index()
    {

        $cards = auth()->user()->cards()->with('socialLinks')->get();


        return Inertia::render('dashboard', ['cards' => $cards]);
    }

}
