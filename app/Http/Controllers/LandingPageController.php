<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Plan;

class LandingPageController extends Controller
{
    public function index(){


        $plans = Plan::all();


        return Inertia::render("welcome",[

            "plans"=>$plans
        ]);
    }
}
