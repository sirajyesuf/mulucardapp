<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\BankInformation;
use App\Models\Plan;
use Illuminate\Support\Facades\Auth;

class CheckoutController extends Controller
{
    public function index(Plan $plan){

        $banks  = BankInformation::all();

        return Inertia::render("checkout",[
            "banks"=>$banks,
            "plan"=>$plan
        ]);
    }


    public function store(Request $request,Plan $plan){

        $request->validate([
            "bank"=>"required|array",
            "transactionCode"=>"required",
        ]);

        $order = Auth::user()->orders()->create([
            "order_number"=>uniqid(),
            "plan_id"=>$plan->id,
            "status"=>"pending",
            "payment_ref"=>$request->transactionCode
        ]);

        dd($order);


        return redirect()->route("dashboard")->with("success","Order has been placed successfully");

    }
}
