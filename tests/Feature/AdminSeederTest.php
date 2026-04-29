<?php

use App\Enums\OrderStatus;
use App\Enums\Role;
use App\Enums\SubscriptionStatus;
use App\Models\Plan;
use App\Models\User;
use Database\Seeders\AdminSeeder;

test('admin seeder connects admin to admin unlimited plan', function () {
    $this->seed(AdminSeeder::class);
    $this->seed(AdminSeeder::class);

    $admin = User::where('email', 'admin@admin.com')->first();
    $adminPlan = Plan::where('name', 'Admin Unlimited')->first();

    expect($admin)->not->toBeNull()
        ->and($admin->role)->toBe(Role::ADMIN->value)
        ->and($adminPlan)->not->toBeNull()
        ->and($adminPlan->is_public)->toBeFalse()
        ->and($adminPlan->is_active)->toBeTrue()
        ->and($adminPlan->number_of_digital_business_card)->toBe(-1)
        ->and(User::where('email', 'admin@admin.com')->count())->toBe(1)
        ->and(Plan::where('name', 'Admin Unlimited')->count())->toBe(1)
        ->and($admin->subscriptions()->where('plan_id', $adminPlan->id)->where('status', SubscriptionStatus::ACTIVE->value)->count())->toBe(1)
        ->and($admin->orders()->where('plan_id', $adminPlan->id)->where('status', OrderStatus::PAID->value)->count())->toBe(1);
});

test('admin seeder preserves existing admin user record', function () {
    $admin = User::factory()->create([
        'name' => 'Existing Admin',
        'email' => 'admin@admin.com',
        'role' => Role::CUSTOMER->value,
    ]);

    $this->seed(AdminSeeder::class);

    expect($admin->fresh())->not->toBeNull()
        ->and($admin->fresh()->id)->toBe($admin->id)
        ->and($admin->fresh()->name)->toBe('Existing Admin')
        ->and($admin->fresh()->role)->toBe(Role::ADMIN->value);
});
