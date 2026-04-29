<?php

namespace App\Http\Controllers;

use App\Models\BankInformation;
use App\Models\Plan;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Illuminate\Validation\Rule;
use Inertia\Inertia;

class CheckoutController extends Controller
{
    public function index(Plan $plan)
    {

        abort_unless($plan->is_public && $plan->is_active, 404);

        $banks = BankInformation::query()
            ->where('is_active', true)
            ->orderBy('name')
            ->get()
            ->map(fn (BankInformation $b) => [
                'id' => $b->id,
                'name' => $b->name,
                'type' => $b->type,
                'account_holder' => $b->account_holder,
                'account_number' => $b->account_number,
                'phone_number' => $b->phone_number,
                'logo' => $b->logo,
                'logo_url' => $b->logo ? Storage::disk('public')->url($b->logo) : null,
            ]);

        return Inertia::render('checkout', [
            'banks' => $banks,
            'plan' => $plan,
        ]);
    }

    public function store(Request $request, Plan $plan)
    {

        abort_unless($plan->is_public && $plan->is_active, 404);

        $validated = $request->validate([
            'payment_method_id' => [
                'required',
                'integer',
                Rule::exists('bank_information', 'id')->where(fn ($query) => $query->where('is_active', true)),
            ],
            'transactionCode' => 'required|string|max:255',
            'email' => 'required|email',
        ]);

        /** @var BankInformation $method */
        $method = BankInformation::query()->whereKey($validated['payment_method_id'])->firstOrFail();

        abort_unless($method->is_active, 404);

        if ($method->type === 'bank' && blank($method->account_number)) {
            abort(422, 'Invalid payment method configuration.');
        }

        if ($method->type === 'wallet' && blank($method->phone_number)) {
            abort(422, 'Invalid payment method configuration.');
        }

        $snapshot = [
            'name' => $method->name,
            'type' => $method->type,
            'holder' => $method->account_holder,
            'identifier_last4' => $method->type === 'bank'
                ? substr((string) $method->account_number, -4)
                : substr((string) $method->phone_number, -4),
        ];

        Auth::user()->orders()->create([
            'order_number' => uniqid(),
            'plan_id' => $plan->id,
            'status' => 'pending',
            'payment_ref' => $validated['transactionCode'],
            'payment_method_id' => $method->id,
            'payment_snapshot' => $snapshot,
        ]);

        return redirect()->back();
    }
}
