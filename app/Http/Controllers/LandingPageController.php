<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Plan;
use App\Http\Resources\PlanResource;

class LandingPageController extends Controller
{
    public function index(){


        $plans = PlanResource::collection(Plan::all());

        return Inertia::render("welcome",[

            "plans"=>$plans
        ]);

    }
}
