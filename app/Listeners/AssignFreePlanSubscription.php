<?php

namespace App\Listeners;

use App\Enums\OrderStatus;
use App\Enums\SubscriptionStatus;
use Illuminate\Auth\Events\Registered;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Support\Carbon;
use App\Models\Order;
use App\Models\Plan;

class AssignFreePlanSubscription
{
    /**
     * Create the event listener.
     */
    public function __construct()
    {
        //
    }

    /**
     * Handle the event.
     */
    public function handle(Registered $event): void
    {
        $user = $event->user;

        $freePlan = Plan::where("price",0)->first();

        $order =  $user->orders()->create([
            'order_number' => uniqid(),
            'plan_id' => $freePlan->id,
            'status' => OrderStatus::PAID,
            'payment_ref' => 'FREE AUTHOMATICALLY ASSIGNED DURING REGISTRATION'
        ]);

        $user->subscriptions()->create([
            'plan_id' => $freePlan->id,
            'order_id' => $order->id,
            'status' => SubscriptionStatus::ACTIVE,
            'start_date' => now()->toDateString(),
            'renewal_date' => now()->addYear()->toDateString()
        ]);

    }
}
