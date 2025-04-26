<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Carbon\Carbon;
use App\Models\Subscription;
use App\Models\Plan;
use App\Enums\SubscriptionStatus;
use Illuminate\Support\Facades\DB;
use App\Models\User;
use App\Models\Order;
use App\Enums\OrderStatus;

class UpdateUserSubscriptionStatus extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'subscription:update-status';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Update the status of user subscriptions daily';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $now = Carbon::today();

        // Find active subscriptions that have reached their renewal date
        $expiredSubscriptions = Subscription::with(['user', 'plan'])
            ->where('status', SubscriptionStatus::ACTIVE->value)
            ->where('renewal_date', '<=', $now)
            ->get();

        $freePlan = Plan::where('price', 0)->first();

        if (!$freePlan) {
            $this->error('Free plan not found!');
            return 1;
        }

        foreach ($expiredSubscriptions as $subscription) {

            DB::transaction(function () use ($subscription, $freePlan) {

                // Mark current subscription as expired
                $subscription->update([
                    'status' => SubscriptionStatus::EXPIRED->value
                ]);

                // Create a zero-amount order to track the automatic downgrade to free plan
                $order = Order::create([
                    'order_number' => uniqid(),
                    'user_id' => $subscription->user_id,
                    'plan_id' => $freePlan->id,
                    'status' => OrderStatus::PAID->value,
                    'payment_ref' => sprintf('AUTO-DOWNGRADE-%s-%s', $subscription->user_id, now()->format('YmdHis')),
                ]);


                // Create subscription linked to the order
                Subscription::create([
                    'user_id' => $subscription->user_id,
                    'plan_id' => $freePlan->id,
                    'order_id' => $order->id,
                    'start_date' => now(),
                    'renewal_date' => now()->addYear(),
                    'status' => SubscriptionStatus::ACTIVE->value
                ]);

            });
        }

        $this->info("Processed {$expiredSubscriptions->count()} expired subscriptions.");

        return 0;
    }
}
