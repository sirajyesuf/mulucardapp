<?php

namespace App\Observers;

use App\Models\Order;
use App\Enums\OrderStatus;
use App\Models\Subscription;
use App\Enums\SubscriptionStatus;

class OrderObserver
{
    /**
     * Handle the Order "created" event.
     */
    public function created(Order $order): void
    {
        //
    }

    /**
     * Handle the Order "updated" event.
     */
    public function updated(Order $order): void
    {
        if($order->isDirty('status') && $order->status == OrderStatus::PAID){

            //inactive all existing subscriptions first
            $order->user->subscriptions()->where('status',SubscriptionStatus::ACTIVE)
            ->update([
                'status' => SubscriptionStatus::CANCELLED
            ]);
            // create new subscription entry
            $order->user->subscriptions()->create([
                "plan_id"=>$order->plan_id,
                "start_date"=>now(),
                "status"=>SubscriptionStatus::ACTIVE,
                "order_id"=>$order->id,
                "renewal_date"=>now()->addYear()
            ]);

        }
    }

    /**
     * Handle the Order "deleted" event.
     */
    public function deleted(Order $order): void
    {
        //
    }

    /**
     * Handle the Order "restored" event.
     */
    public function restored(Order $order): void
    {
        //
    }

    /**
     * Handle the Order "force deleted" event.
     */
    public function forceDeleted(Order $order): void
    {
        //
    }
}
