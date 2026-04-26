<?php

use App\Enums\OrderStatus;
use App\Enums\SubscriptionStatus;
use App\Models\Order;
use App\Models\Plan;
use App\Models\Subscription;
use App\Models\User;
use Database\Seeders\PlanSeeder;

test('plan seeder preserves existing plans orders and subscriptions', function () {
    $user = User::factory()->create();
    $existingPlan = Plan::create([
        'name' => 'Free',
        'price' => 123,
        'description' => 'Existing production plan',
        'features' => ['Existing feature'],
        'number_of_digital_business_card' => 9,
        'number_of_nfc_business_card' => 0,
        'number_of_gallery' => 9,
        'number_of_service' => 9,
        'most_popular' => false,
        'is_public' => true,
        'is_active' => true,
    ]);

    $order = Order::create([
        'order_number' => 'PROD-ORDER',
        'user_id' => $user->id,
        'plan_id' => $existingPlan->id,
        'status' => OrderStatus::PAID->value,
        'payment_ref' => 'PROD-PAYMENT',
    ]);

    Subscription::create([
        'user_id' => $user->id,
        'plan_id' => $existingPlan->id,
        'order_id' => $order->id,
        'status' => SubscriptionStatus::ACTIVE->value,
        'start_date' => now()->toDateString(),
        'renewal_date' => now()->addYear()->toDateString(),
    ]);

    $this->seed(PlanSeeder::class);
    $this->seed(PlanSeeder::class);

    $adminPlan = Plan::where('name', 'Admin Unlimited')->first();

    expect(Plan::where('name', 'Free')->count())->toBe(1)
        ->and(Plan::whereIn('name', ['Free', 'Professional', 'Enterprise', 'Admin Unlimited'])->count())->toBe(4)
        ->and(Plan::where('name', 'Admin Unlimited')->count())->toBe(1)
        ->and($adminPlan)->not->toBeNull()
        ->and($adminPlan->number_of_digital_business_card)->toBe(-1)
        ->and($adminPlan->number_of_gallery)->toBe(-1)
        ->and($adminPlan->number_of_service)->toBe(-1)
        ->and($adminPlan->is_public)->toBeFalse()
        ->and($adminPlan->is_active)->toBeTrue()
        ->and(Order::count())->toBe(1)
        ->and(Subscription::count())->toBe(1)
        ->and($existingPlan->fresh()->price)->toBe(123);
});
