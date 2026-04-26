<?php

use App\Models\Plan;
use App\Models\User;
use Inertia\Testing\AssertableInertia;

function planVisibilityPlan(array $overrides = []): Plan
{
    return Plan::create(array_merge([
        'name' => 'Visible Plan',
        'description' => 'A plan for visibility tests',
        'features' => [],
        'price' => 0,
        'number_of_digital_business_card' => 1,
        'number_of_nfc_business_card' => 0,
        'number_of_gallery' => 1,
        'number_of_service' => 1,
    ], $overrides));
}

test('landing page only shows public active plans', function () {
    $visiblePlan = planVisibilityPlan(['name' => 'Public Active']);
    planVisibilityPlan(['name' => 'Hidden Active', 'is_public' => false]);
    planVisibilityPlan(['name' => 'Public Inactive', 'is_active' => false]);

    $this->get(route('home'))
        ->assertOk()
        ->assertInertia(fn (AssertableInertia $page) => $page
            ->component('welcome', false)
            ->has('plans', 1)
            ->where('plans.0.id', $visiblePlan->id)
            ->where('plans.0.name', 'Public Active')
        );
});

test('settings pricing only shows public active plans', function () {
    $user = User::factory()->create();
    $visiblePlan = planVisibilityPlan(['name' => 'Settings Public Active']);
    planVisibilityPlan(['name' => 'Settings Hidden Active', 'is_public' => false]);
    planVisibilityPlan(['name' => 'Settings Public Inactive', 'is_active' => false]);

    $this->actingAs($user)
        ->get(route('settings.plans'))
        ->assertOk()
        ->assertInertia(fn (AssertableInertia $page) => $page
            ->component('settings/plan', false)
            ->has('plans', 1)
            ->where('plans.0.id', $visiblePlan->id)
            ->where('plans.0.name', 'Settings Public Active')
        );
});

test('checkout blocks hidden and inactive plans', function () {
    $user = User::factory()->create();
    $hiddenPlan = planVisibilityPlan(['name' => 'Hidden Plan', 'is_public' => false]);
    $inactivePlan = planVisibilityPlan(['name' => 'Inactive Plan', 'is_active' => false]);

    $this->actingAs($user)
        ->get(route('checkout', $hiddenPlan))
        ->assertNotFound();

    $this->actingAs($user)
        ->get(route('checkout', $inactivePlan))
        ->assertNotFound();
});

test('checkout allows public active plans', function () {
    $user = User::factory()->create();
    $plan = planVisibilityPlan(['name' => 'Checkout Public Active']);

    $this->actingAs($user)
        ->get(route('checkout', $plan))
        ->assertOk()
        ->assertInertia(fn (AssertableInertia $page) => $page
            ->component('checkout', false)
            ->where('plan.id', $plan->id)
            ->where('plan.name', 'Checkout Public Active')
        );
});
