<?php

namespace App\Http\Controllers;

use App\Models\BankInformation;
use App\Models\Plan;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class CheckoutController extends Controller
{
    public function index(Plan $plan)
    {

        abort_unless($plan->is_public && $plan->is_active, 404);

        $banks = BankInformation::all();

        return Inertia::render('checkout', [
            'banks' => $banks,
            'plan' => $plan,
        ]);
    }

    public function store(Request $request, Plan $plan)
    {

        abort_unless($plan->is_public && $plan->is_active, 404);

        $request->validate([
            'bank' => 'required|array',
            'transactionCode' => 'required',
            'email' => 'required|email',
        ]);

        Auth::user()->orders()->create([
            'order_number' => uniqid(),
            'plan_id' => $plan->id,
            'status' => 'pending',
            'payment_ref' => $request->transactionCode,
        ]);

        // return redirect()->route("dashboard")->with("success","Order has been placed successfully");
        return redirect()->back();

    }
}
