<?php

use App\Enums\OrderStatus;
use App\Enums\SubscriptionStatus;
use App\Models\Card;
use App\Models\Order;
use App\Models\Plan;
use App\Models\Subscription;
use App\Models\User;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;

function createCardPayload(array $overrides = []): array
{
    return array_replace_recursive([
        'template' => 'classic',
        'avatar' => [
            'file' => UploadedFile::fake()->image('avatar.jpg'),
        ],
        'first_name' => 'Ada',
        'last_name' => 'Lovelace',
        'organization' => '',
        'job_title' => '',
        'banner_color' => '#3a59ae',
        'links' => [],
        'phone' => '',
        'email' => '',
        'headline' => '',
        'address' => '',
        'location' => '',
        'business_hours_enabled' => false,
        'business_hours' => [],
        'galleries' => [],
        'services' => [],
    ], $overrides);
}

function subscribeUserForCardCreation(User $user, int $cardLimit = 2, int $galleryLimit = 2, int $serviceLimit = 2): Plan
{
    $plan = Plan::create([
        'name' => 'Test Plan',
        'price' => 0,
        'description' => 'Plan for card creation tests',
        'features' => [],
        'number_of_digital_business_card' => $cardLimit,
        'number_of_gallery' => $galleryLimit,
        'number_of_service' => $serviceLimit,
    ]);

    $order = Order::create([
        'order_number' => 'TEST-'.uniqid(),
        'user_id' => $user->id,
        'plan_id' => $plan->id,
        'status' => OrderStatus::PAID->value,
        'payment_ref' => 'TEST',
    ]);

    Subscription::create([
        'user_id' => $user->id,
        'plan_id' => $plan->id,
        'order_id' => $order->id,
        'status' => SubscriptionStatus::ACTIVE->value,
        'start_date' => now()->toDateString(),
        'renewal_date' => now()->addYear()->toDateString(),
    ]);

    return $plan;
}

test('card creation post requires an active subscription', function () {
    Storage::fake('public');

    $user = User::factory()->create();

    $this->actingAs($user)
        ->post(route('card.store'), createCardPayload())
        ->assertForbidden();

    expect(Card::count())->toBe(0);
});

test('card creation post enforces the plan card limit', function () {
    Storage::fake('public');

    $user = User::factory()->create();
    subscribeUserForCardCreation($user, cardLimit: 1);

    Card::create([
        'user_id' => $user->id,
        'url' => 'existing-card',
        'first_name' => 'Existing',
        'last_name' => 'Card',
        'organization' => '',
        'job_title' => '',
        'headline' => '',
        'banner_color' => '#3a59ae',
    ]);

    $this->actingAs($user)
        ->post(route('card.store'), createCardPayload())
        ->assertForbidden();

    expect(Card::count())->toBe(1);
});

test('subscribed users can create a card without preview path fields', function () {
    Storage::fake('public');

    $user = User::factory()->create();
    subscribeUserForCardCreation($user);

    $response = $this->actingAs($user)->post(route('card.store'), createCardPayload([
        'galleries' => [
            [
                'file' => UploadedFile::fake()->image('gallery.jpg'),
                'description' => 'Gallery image',
            ],
        ],
        'services' => [
            [
                'file' => UploadedFile::fake()->image('service.jpg'),
                'name' => 'Consulting',
                'description' => 'Business consulting',
            ],
        ],
    ]));

    $response->assertRedirect(route('dashboard', absolute: false));

    $card = Card::with('galleries', 'services')->first();

    expect($card)->not->toBeNull()
        ->and($card->galleries)->toHaveCount(1)
        ->and($card->services)->toHaveCount(1);
});

test('social link names must be supported platforms', function () {
    Storage::fake('public');

    $user = User::factory()->create();
    subscribeUserForCardCreation($user);

    $this->actingAs($user)
        ->from(route('card.create'))
        ->post(route('card.store'), createCardPayload([
            'links' => [
                [
                    'name' => 'unsupported',
                    'url' => 'https://example.com/profile',
                ],
            ],
        ]))
        ->assertRedirect(route('card.create', absolute: false))
        ->assertSessionHasErrors('links.0.name');

    expect(Card::count())->toBe(0);
});

function createValidationCase(array $overrides, string|array $errors, ?callable $setup = null): array
{
    return compact('overrides', 'errors', 'setup');
}

function cardValidationLongText(int $length = 256): string
{
    return str_repeat('a', $length);
}

test('card creation validates each create request rule', function (array $case) {
    Storage::fake('public');

    ['overrides' => $overrides, 'errors' => $errors, 'setup' => $setup] = $case;

    $user = User::factory()->create();
    subscribeUserForCardCreation($user);

    if ($setup !== null) {
        $setup($user);
    }

    $this->actingAs($user)
        ->from(route('card.create'))
        ->post(route('card.store'), createCardPayload($overrides))
        ->assertRedirect(route('card.create', absolute: false))
        ->assertSessionHasErrors($errors);

    expect(Card::count())->toBe(0);
})->with([
    'template is required' => [createValidationCase(['template' => null], 'template')],
    'template must be supported' => [createValidationCase(['template' => 'minimal'], 'template')],
    'banner must be an image' => [createValidationCase(['banner' => ['file' => UploadedFile::fake()->create('banner.pdf', 10, 'application/pdf')]], 'banner.file')],
    'banner may not exceed 2MB' => [createValidationCase(['banner' => ['file' => UploadedFile::fake()->image('banner.jpg')->size(2049)]], 'banner.file')],
    'avatar is required' => [createValidationCase(['avatar' => ['file' => null]], 'avatar.file')],
    'avatar must be an image' => [createValidationCase(['avatar' => ['file' => UploadedFile::fake()->create('avatar.pdf', 10, 'application/pdf')]], 'avatar.file')],
    'avatar may not exceed 2MB' => [createValidationCase(['avatar' => ['file' => UploadedFile::fake()->image('avatar.jpg')->size(2049)]], 'avatar.file')],
    'logo must be an image' => [createValidationCase(['logo' => ['file' => UploadedFile::fake()->create('logo.pdf', 10, 'application/pdf')]], 'logo.file')],
    'logo may not exceed 2MB' => [createValidationCase(['logo' => ['file' => UploadedFile::fake()->image('logo.jpg')->size(2049)]], 'logo.file')],
    'first name is required' => [createValidationCase(['first_name' => null], 'first_name')],
    'first name must be text' => [createValidationCase(['first_name' => ['Ada']], 'first_name')],
    'first name may not exceed 255 characters' => [createValidationCase(['first_name' => cardValidationLongText()], 'first_name')],
    'last name is required' => [createValidationCase(['last_name' => null], 'last_name')],
    'last name must be text' => [createValidationCase(['last_name' => ['Lovelace']], 'last_name')],
    'last name may not exceed 255 characters' => [createValidationCase(['last_name' => cardValidationLongText()], 'last_name')],
    'organization must be text' => [createValidationCase(['organization' => ['Org']], 'organization')],
    'organization may not exceed 255 characters' => [createValidationCase(['organization' => cardValidationLongText()], 'organization')],
    'job title must be text' => [createValidationCase(['job_title' => ['Engineer']], 'job_title')],
    'job title may not exceed 255 characters' => [createValidationCase(['job_title' => cardValidationLongText()], 'job_title')],
    'banner color is required' => [createValidationCase(['banner_color' => null], 'banner_color')],
    'banner color must be a hex color' => [createValidationCase(['banner_color' => 'purple'], 'banner_color')],
    'links must be an array' => [createValidationCase(['links' => 'https://example.com'], 'links')],
    'links may not exceed 100 items' => [createValidationCase(['links' => array_fill(0, 101, ['name' => 'website', 'url' => 'https://example.com'])], 'links')],
    'link name is required' => [createValidationCase(['links' => [['name' => null, 'url' => 'https://example.com']]], 'links.0.name')],
    'link name must be supported' => [createValidationCase(['links' => [['name' => 'unsupported', 'url' => 'https://example.com']]], 'links.0.name')],
    'link url is required' => [createValidationCase(['links' => [['name' => 'website', 'url' => null]]], 'links.0.url')],
    'link url must use https' => [createValidationCase(['links' => [['name' => 'website', 'url' => 'http://example.com']]], 'links.0.url')],
    'phone must be text' => [createValidationCase(['phone' => ['123']], 'phone')],
    'phone may not exceed 255 characters' => [createValidationCase(['phone' => cardValidationLongText()], 'phone')],
    'email must be valid' => [createValidationCase(['email' => 'not-an-email'], 'email')],
    'email may not exceed 255 characters' => [createValidationCase(['email' => cardValidationLongText().'@example.com'], 'email')],
    'headline must be text' => [createValidationCase(['headline' => ['headline']], 'headline')],
    'headline may not exceed 255 characters' => [createValidationCase(['headline' => cardValidationLongText()], 'headline')],
    'address must be text' => [createValidationCase(['address' => ['address']], 'address')],
    'address may not exceed 255 characters' => [createValidationCase(['address' => cardValidationLongText()], 'address')],
    'location must be text' => [createValidationCase(['location' => ['location']], 'location')],
    'location may not exceed 255 characters' => [createValidationCase(['location' => cardValidationLongText()], 'location')],
    'business hours enabled is required' => [createValidationCase(['business_hours_enabled' => null], 'business_hours_enabled')],
    'business hours enabled must be boolean' => [createValidationCase(['business_hours_enabled' => 'sometimes'], 'business_hours_enabled')],
    'business hours are required when enabled' => [createValidationCase(['business_hours_enabled' => true, 'business_hours' => null], 'business_hours')],
    'business hours must be an array' => [createValidationCase(['business_hours_enabled' => true, 'business_hours' => 'open'], 'business_hours')],
    'business hours may not exceed 7 days' => [createValidationCase(['business_hours_enabled' => true, 'business_hours' => array_fill(0, 8, ['day' => 'Monday', 'isOpen' => true, 'open' => '09:00', 'close' => '17:00'])], 'business_hours')],
    'business hour day is required' => [createValidationCase(['business_hours_enabled' => true, 'business_hours' => [['isOpen' => true, 'open' => '09:00', 'close' => '17:00']]], 'business_hours.0.day')],
    'business hour isOpen must be boolean' => [createValidationCase(['business_hours_enabled' => true, 'business_hours' => [['day' => 'Monday', 'isOpen' => 'open', 'open' => '09:00', 'close' => '17:00']]], 'business_hours.0.isOpen')],
    'business hour open time must be HH:MM' => [createValidationCase(['business_hours_enabled' => true, 'business_hours' => [['day' => 'Monday', 'isOpen' => true, 'open' => '9am', 'close' => '17:00']]], 'business_hours.0.open')],
    'business hour close time must be HH:MM' => [createValidationCase(['business_hours_enabled' => true, 'business_hours' => [['day' => 'Monday', 'isOpen' => true, 'open' => '09:00', 'close' => '5pm']]], 'business_hours.0.close')],
    'galleries must be an array' => [createValidationCase(['galleries' => 'gallery'], 'galleries')],
    'galleries may not exceed plan limit' => [createValidationCase(['galleries' => [
        ['file' => UploadedFile::fake()->image('gallery-1.jpg'), 'description' => 'One'],
        ['file' => UploadedFile::fake()->image('gallery-2.jpg'), 'description' => 'Two'],
    ]], 'galleries', fn (User $user) => Plan::query()->update(['number_of_gallery' => 1]))],
    'gallery file is required' => [createValidationCase(['galleries' => [['file' => null, 'description' => 'Gallery']]], 'galleries.0.file')],
    'gallery file must be an image' => [createValidationCase(['galleries' => [['file' => UploadedFile::fake()->create('gallery.pdf', 10, 'application/pdf'), 'description' => 'Gallery']]], 'galleries.0.file')],
    'gallery file may not exceed 2MB' => [createValidationCase(['galleries' => [['file' => UploadedFile::fake()->image('gallery.jpg')->size(2049), 'description' => 'Gallery']]], 'galleries.0.file')],
    'gallery path must be text when present' => [createValidationCase(['galleries' => [['file' => UploadedFile::fake()->image('gallery.jpg'), 'path' => ['blob'], 'description' => 'Gallery']]], 'galleries.0.path')],
    'gallery description is required' => [createValidationCase(['galleries' => [['file' => UploadedFile::fake()->image('gallery.jpg'), 'description' => null]]], 'galleries.0.description')],
    'gallery description may not exceed 500 characters' => [createValidationCase(['galleries' => [['file' => UploadedFile::fake()->image('gallery.jpg'), 'description' => cardValidationLongText(501)]]], 'galleries.0.description')],
    'services must be an array' => [createValidationCase(['services' => 'service'], 'services')],
    'services may not exceed plan limit' => [createValidationCase(['services' => [
        ['file' => UploadedFile::fake()->image('service-1.jpg'), 'name' => 'One', 'description' => 'One'],
        ['file' => UploadedFile::fake()->image('service-2.jpg'), 'name' => 'Two', 'description' => 'Two'],
    ]], 'services', fn (User $user) => Plan::query()->update(['number_of_service' => 1]))],
    'service file is required' => [createValidationCase(['services' => [['file' => null, 'name' => 'Service', 'description' => 'Service']]], 'services.0.file')],
    'service file must be an image' => [createValidationCase(['services' => [['file' => UploadedFile::fake()->create('service.pdf', 10, 'application/pdf'), 'name' => 'Service', 'description' => 'Service']]], 'services.0.file')],
    'service file may not exceed 2MB' => [createValidationCase(['services' => [['file' => UploadedFile::fake()->image('service.jpg')->size(2049), 'name' => 'Service', 'description' => 'Service']]], 'services.0.file')],
    'service path must be text when present' => [createValidationCase(['services' => [['file' => UploadedFile::fake()->image('service.jpg'), 'path' => ['blob'], 'name' => 'Service', 'description' => 'Service']]], 'services.0.path')],
    'service name is required' => [createValidationCase(['services' => [['file' => UploadedFile::fake()->image('service.jpg'), 'name' => null, 'description' => 'Service']]], 'services.0.name')],
    'service name must be text' => [createValidationCase(['services' => [['file' => UploadedFile::fake()->image('service.jpg'), 'name' => ['Service'], 'description' => 'Service']]], 'services.0.name')],
    'service description is required' => [createValidationCase(['services' => [['file' => UploadedFile::fake()->image('service.jpg'), 'name' => 'Service', 'description' => null]]], 'services.0.description')],
    'service description may not exceed 500 characters' => [createValidationCase(['services' => [['file' => UploadedFile::fake()->image('service.jpg'), 'name' => 'Service', 'description' => cardValidationLongText(501)]]], 'services.0.description')],
]);
