<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;

class SubscriptionController extends Controller
{
    public function index(){
        $subscriptions = auth()->user()->subscriptions()->with("plan", "order")->get();

        return Inertia::render("settings/subscription",[
            "subscriptions"=>$subscriptions
        ]);
    }
}
