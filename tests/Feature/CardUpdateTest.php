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
use Illuminate\Support\Str;

function updateCardPayload(Card $card, array $overrides = []): array
{
    return array_replace_recursive([
        'template' => $card->template ?? 'classic',
        'banner' => [
            'path' => $card->banner,
        ],
        'avatar' => [
            'path' => $card->avatar,
        ],
        'logo' => [
            'path' => $card->logo,
        ],
        'first_name' => $card->first_name,
        'last_name' => $card->last_name,
        'organization' => $card->organization,
        'job_title' => $card->job_title,
        'banner_color' => $card->banner_color,
        'links' => [],
        'phone' => $card->phone,
        'email' => $card->email,
        'headline' => $card->headline,
        'address' => $card->address,
        'location' => $card->location,
        'business_hours_enabled' => false,
        'business_hours' => [],
        'galleries' => [],
        'services' => [],
    ], $overrides);
}

function cardForUpdate(User $user, array $overrides = []): Card
{
    return Card::create(array_merge([
        'user_id' => $user->id,
        'url' => 'card-'.uniqid(),
        'first_name' => 'Ada',
        'last_name' => 'Lovelace',
        'organization' => '',
        'job_title' => '',
        'email' => '',
        'phone' => '',
        'headline' => '',
        'banner_color' => '#3a59ae',
        'avatar' => '/storage/avatars/old-avatar.jpg',
        'banner' => null,
        'logo' => null,
        'template' => 'classic',
    ], $overrides));
}

function subscribeUserForCardUpdates(User $user, int $cardLimit = 2, int $galleryLimit = 2, int $serviceLimit = 2): Plan
{
    $plan = Plan::create([
        'name' => 'Update Test Plan',
        'price' => 0,
        'description' => 'Plan for card update tests',
        'features' => [],
        'number_of_digital_business_card' => $cardLimit,
        'number_of_gallery' => $galleryLimit,
        'number_of_service' => $serviceLimit,
    ]);

    $order = Order::create([
        'order_number' => 'UPDATE-'.uniqid(),
        'user_id' => $user->id,
        'plan_id' => $plan->id,
        'status' => OrderStatus::PAID->value,
        'payment_ref' => 'UPDATE-TEST',
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

test('users cannot update another users card', function () {
    $owner = User::factory()->create();
    $attacker = User::factory()->create();
    $card = cardForUpdate($owner);

    $this->actingAs($attacker)
        ->post(route('card.update', $card->id), updateCardPayload($card, [
            'first_name' => 'Mallory',
        ]))
        ->assertForbidden();

    expect($card->fresh()->first_name)->toBe('Ada');
});

test('card update does not require an active subscription when no plan-limited children are submitted', function () {
    $user = User::factory()->create();
    $card = cardForUpdate($user);

    $this->actingAs($user)
        ->from(route('card.edit', $card->id))
        ->post(route('card.update', $card->id), updateCardPayload($card, [
            'first_name' => 'Grace',
        ]))
        ->assertRedirect(route('card.edit', $card->id, absolute: false));

    expect($card->fresh()->first_name)->toBe('Grace');
});

test('replacing avatar deletes the old file after a successful update', function () {
    Storage::fake('public');
    Storage::disk('public')->put('avatars/old-avatar.jpg', 'old-avatar');

    $user = User::factory()->create();
    $card = cardForUpdate($user);

    $this->actingAs($user)
        ->from(route('card.edit', $card->id))
        ->post(route('card.update', $card->id), updateCardPayload($card, [
            'avatar' => [
                'file' => UploadedFile::fake()->image('new-avatar.jpg'),
                'path' => $card->avatar,
            ],
        ]))
        ->assertRedirect(route('card.edit', $card->id, absolute: false));

    $updatedAvatar = Str::after($card->fresh()->avatar, '/storage/');

    Storage::disk('public')->assertMissing('avatars/old-avatar.jpg');
    Storage::disk('public')->assertExists($updatedAvatar);
});

test('removing all services and galleries deletes their stored files', function () {
    Storage::fake('public');
    Storage::disk('public')->put('services/old-service.jpg', 'old-service');
    Storage::disk('public')->put('galleries/old-gallery.jpg', 'old-gallery');

    $user = User::factory()->create();
    subscribeUserForCardUpdates($user);
    $card = cardForUpdate($user);

    $card->services()->create([
        'name' => 'Old Service',
        'description' => 'Old service description',
        'path' => '/storage/services/old-service.jpg',
    ]);
    $card->galleries()->create([
        'description' => 'Old gallery description',
        'path' => '/storage/galleries/old-gallery.jpg',
    ]);

    $this->actingAs($user)
        ->from(route('card.edit', $card->id))
        ->post(route('card.update', $card->id), updateCardPayload($card))
        ->assertRedirect(route('card.edit', $card->id, absolute: false));

    expect($card->services()->count())->toBe(0)
        ->and($card->galleries()->count())->toBe(0);

    Storage::disk('public')->assertMissing('services/old-service.jpg');
    Storage::disk('public')->assertMissing('galleries/old-gallery.jpg');
});

test('card update rejects unsupported social link names', function () {
    $user = User::factory()->create();
    $card = cardForUpdate($user);

    $this->actingAs($user)
        ->from(route('card.edit', $card->id))
        ->post(route('card.update', $card->id), updateCardPayload($card, [
            'links' => [
                [
                    'name' => 'unsupported',
                    'url' => 'https://example.com/profile',
                ],
            ],
        ]))
        ->assertRedirect(route('card.edit', $card->id, absolute: false))
        ->assertSessionHasErrors('links.0.name');
});

function updateValidationCase(array $overrides, string|array $errors, ?callable $setup = null): array
{
    return compact('overrides', 'errors', 'setup');
}

function updateValidationLongText(int $length = 256): string
{
    return str_repeat('a', $length);
}

test('card update validates each update request rule', function (array $case) {
    Storage::fake('public');

    ['overrides' => $overrides, 'errors' => $errors, 'setup' => $setup] = $case;

    $user = User::factory()->create();
    $card = cardForUpdate($user);
    $plan = subscribeUserForCardUpdates($user, galleryLimit: 10, serviceLimit: 10);

    if ($setup !== null) {
        $setup($user, $card, $plan);
    }

    $this->actingAs($user)
        ->from(route('card.edit', $card->id))
        ->post(route('card.update', $card->id), updateCardPayload($card, $overrides))
        ->assertRedirect(route('card.edit', $card->id, absolute: false))
        ->assertSessionHasErrors($errors);
})->with([
    'template is required' => [updateValidationCase(['template' => null], 'template')],
    'template must be supported' => [updateValidationCase(['template' => 'minimal'], 'template')],
    'banner must be an image' => [updateValidationCase(['banner' => ['file' => UploadedFile::fake()->create('banner.pdf', 10, 'application/pdf'), 'path' => null]], 'banner.file')],
    'banner may not exceed 2MB' => [updateValidationCase(['banner' => ['file' => UploadedFile::fake()->image('banner.jpg')->size(2049), 'path' => null]], 'banner.file')],
    'banner path must be text' => [updateValidationCase(['banner' => ['path' => ['banner']]], 'banner.path')],
    'avatar must be present as a file or existing path' => [updateValidationCase(['avatar' => ['file' => null, 'path' => null]], 'avatar.path')],
    'avatar must be an image' => [updateValidationCase(['avatar' => ['file' => UploadedFile::fake()->create('avatar.pdf', 10, 'application/pdf'), 'path' => null]], 'avatar.file')],
    'avatar may not exceed 2MB' => [updateValidationCase(['avatar' => ['file' => UploadedFile::fake()->image('avatar.jpg')->size(2049), 'path' => null]], 'avatar.file')],
    'avatar path must be text' => [updateValidationCase(['avatar' => ['path' => ['avatar']]], 'avatar.path')],
    'logo must be an image' => [updateValidationCase(['logo' => ['file' => UploadedFile::fake()->create('logo.pdf', 10, 'application/pdf'), 'path' => null]], 'logo.file')],
    'logo may not exceed 2MB' => [updateValidationCase(['logo' => ['file' => UploadedFile::fake()->image('logo.jpg')->size(2049), 'path' => null]], 'logo.file')],
    'logo path must be text' => [updateValidationCase(['logo' => ['path' => ['logo']]], 'logo.path')],
    'banner color must be a hex color' => [updateValidationCase(['banner_color' => 'purple'], 'banner_color')],
    'first name is required' => [updateValidationCase(['first_name' => null], 'first_name')],
    'first name must be text' => [updateValidationCase(['first_name' => ['Ada']], 'first_name')],
    'first name may not exceed 255 characters' => [updateValidationCase(['first_name' => updateValidationLongText()], 'first_name')],
    'last name is required' => [updateValidationCase(['last_name' => null], 'last_name')],
    'last name must be text' => [updateValidationCase(['last_name' => ['Lovelace']], 'last_name')],
    'last name may not exceed 255 characters' => [updateValidationCase(['last_name' => updateValidationLongText()], 'last_name')],
    'email must be valid' => [updateValidationCase(['email' => 'not-an-email'], 'email')],
    'email may not exceed 255 characters' => [updateValidationCase(['email' => updateValidationLongText().'@example.com'], 'email')],
    'phone must be text' => [updateValidationCase(['phone' => ['123']], 'phone')],
    'phone may not exceed 255 characters' => [updateValidationCase(['phone' => updateValidationLongText()], 'phone')],
    'organization must be text' => [updateValidationCase(['organization' => ['Org']], 'organization')],
    'organization may not exceed 255 characters' => [updateValidationCase(['organization' => updateValidationLongText()], 'organization')],
    'job title must be text' => [updateValidationCase(['job_title' => ['Engineer']], 'job_title')],
    'job title may not exceed 255 characters' => [updateValidationCase(['job_title' => updateValidationLongText()], 'job_title')],
    'headline must be text' => [updateValidationCase(['headline' => ['headline']], 'headline')],
    'headline may not exceed 255 characters' => [updateValidationCase(['headline' => updateValidationLongText()], 'headline')],
    'address must be text' => [updateValidationCase(['address' => ['address']], 'address')],
    'address may not exceed 255 characters' => [updateValidationCase(['address' => updateValidationLongText()], 'address')],
    'location must be text' => [updateValidationCase(['location' => ['location']], 'location')],
    'location may not exceed 255 characters' => [updateValidationCase(['location' => updateValidationLongText()], 'location')],
    'links must be an array' => [updateValidationCase(['links' => 'https://example.com'], 'links')],
    'links may not exceed 100 items' => [updateValidationCase(['links' => array_fill(0, 101, ['name' => 'website', 'url' => 'https://example.com'])], 'links')],
    'link name is required when url is present' => [updateValidationCase(['links' => [['name' => null, 'url' => 'https://example.com']]], 'links.0.name')],
    'link name must be supported' => [updateValidationCase(['links' => [['name' => 'unsupported', 'url' => 'https://example.com']]], 'links.0.name')],
    'link url is required when name is present' => [updateValidationCase(['links' => [['name' => 'website', 'url' => null]]], 'links.0.url')],
    'link url must use https' => [updateValidationCase(['links' => [['name' => 'website', 'url' => 'http://example.com']]], 'links.0.url')],
    'business hours enabled is required' => [updateValidationCase(['business_hours_enabled' => null], 'business_hours_enabled')],
    'business hours enabled must be boolean' => [updateValidationCase(['business_hours_enabled' => 'sometimes'], 'business_hours_enabled')],
    'business hours are required when enabled' => [updateValidationCase(['business_hours_enabled' => true, 'business_hours' => null], 'business_hours')],
    'business hours must be an array' => [updateValidationCase(['business_hours_enabled' => true, 'business_hours' => 'open'], 'business_hours')],
    'business hours may not exceed 7 days' => [updateValidationCase(['business_hours_enabled' => true, 'business_hours' => array_fill(0, 8, ['day' => 'Monday', 'isOpen' => true, 'open' => '09:00', 'close' => '17:00'])], 'business_hours')],
    'business hour day is required' => [updateValidationCase(['business_hours_enabled' => true, 'business_hours' => [['isOpen' => true, 'open' => '09:00', 'close' => '17:00']]], 'business_hours.0.day')],
    'business hour isOpen must be boolean' => [updateValidationCase(['business_hours_enabled' => true, 'business_hours' => [['day' => 'Monday', 'isOpen' => 'open', 'open' => '09:00', 'close' => '17:00']]], 'business_hours.0.isOpen')],
    'business hour open time must be HH:MM' => [updateValidationCase(['business_hours_enabled' => true, 'business_hours' => [['day' => 'Monday', 'isOpen' => true, 'open' => '9am', 'close' => '17:00']]], 'business_hours.0.open')],
    'business hour close time must be HH:MM' => [updateValidationCase(['business_hours_enabled' => true, 'business_hours' => [['day' => 'Monday', 'isOpen' => true, 'open' => '09:00', 'close' => '5pm']]], 'business_hours.0.close')],
    'galleries must be an array' => [updateValidationCase(['galleries' => 'gallery'], 'galleries')],
    'galleries may not exceed plan limit' => [updateValidationCase(['galleries' => [
        ['id' => 'gallery-one', 'file' => UploadedFile::fake()->image('gallery-1.jpg'), 'description' => 'One'],
        ['id' => 'gallery-two', 'file' => UploadedFile::fake()->image('gallery-2.jpg'), 'description' => 'Two'],
    ]], 'galleries', fn (User $user, Card $card, Plan $plan) => $plan->update(['number_of_gallery' => 1]))],
    'gallery id is required' => [updateValidationCase(['galleries' => [['id' => null, 'file' => UploadedFile::fake()->image('gallery.jpg'), 'description' => 'Gallery']]], 'galleries')],
    'gallery file is required when no path exists' => [updateValidationCase(['galleries' => [['id' => 'gallery-one', 'file' => null, 'path' => null, 'description' => 'Gallery']]], 'galleries')],
    'gallery file must be an image' => [updateValidationCase(['galleries' => [['id' => 'gallery-one', 'file' => UploadedFile::fake()->create('gallery.pdf', 10, 'application/pdf'), 'description' => 'Gallery']]], 'galleries.0.file')],
    'gallery file may not exceed 2MB' => [updateValidationCase(['galleries' => [['id' => 'gallery-one', 'file' => UploadedFile::fake()->image('gallery.jpg')->size(2049), 'description' => 'Gallery']]], 'galleries.0.file')],
    'gallery path must be text when present' => [updateValidationCase(['galleries' => [['id' => 'gallery-one', 'file' => UploadedFile::fake()->image('gallery.jpg'), 'path' => ['blob'], 'description' => 'Gallery']]], 'galleries.0.path')],
    'gallery description is required' => [updateValidationCase(['galleries' => [['id' => 'gallery-one', 'file' => UploadedFile::fake()->image('gallery.jpg'), 'description' => null]]], 'galleries.0.description')],
    'gallery description may not exceed 500 characters' => [updateValidationCase(['galleries' => [['id' => 'gallery-one', 'file' => UploadedFile::fake()->image('gallery.jpg'), 'description' => updateValidationLongText(501)]]], 'galleries.0.description')],
    'services must be an array' => [updateValidationCase(['services' => 'service'], 'services')],
    'services may not exceed plan limit' => [updateValidationCase(['services' => [
        ['id' => 'service-one', 'file' => UploadedFile::fake()->image('service-1.jpg'), 'name' => 'One', 'description' => 'One'],
        ['id' => 'service-two', 'file' => UploadedFile::fake()->image('service-2.jpg'), 'name' => 'Two', 'description' => 'Two'],
    ]], 'services', fn (User $user, Card $card, Plan $plan) => $plan->update(['number_of_service' => 1]))],
    'service id is required' => [updateValidationCase(['services' => [['id' => null, 'file' => UploadedFile::fake()->image('service.jpg'), 'name' => 'Service', 'description' => 'Service']]], 'services')],
    'service file is required when no path exists' => [updateValidationCase(['services' => [['id' => 'service-one', 'file' => null, 'path' => null, 'name' => 'Service', 'description' => 'Service']]], 'services')],
    'service file must be an image' => [updateValidationCase(['services' => [['id' => 'service-one', 'file' => UploadedFile::fake()->create('service.pdf', 10, 'application/pdf'), 'name' => 'Service', 'description' => 'Service']]], 'services.0.file')],
    'service file may not exceed 2MB' => [updateValidationCase(['services' => [['id' => 'service-one', 'file' => UploadedFile::fake()->image('service.jpg')->size(2049), 'name' => 'Service', 'description' => 'Service']]], 'services.0.file')],
    'service path must be text when present' => [updateValidationCase(['services' => [['id' => 'service-one', 'file' => UploadedFile::fake()->image('service.jpg'), 'path' => ['blob'], 'name' => 'Service', 'description' => 'Service']]], 'services.0.path')],
    'service name is required' => [updateValidationCase(['services' => [['id' => 'service-one', 'file' => UploadedFile::fake()->image('service.jpg'), 'name' => null, 'description' => 'Service']]], 'services.0.name')],
    'service name must be text' => [updateValidationCase(['services' => [['id' => 'service-one', 'file' => UploadedFile::fake()->image('service.jpg'), 'name' => ['Service'], 'description' => 'Service']]], 'services.0.name')],
    'service description is required' => [updateValidationCase(['services' => [['id' => 'service-one', 'file' => UploadedFile::fake()->image('service.jpg'), 'name' => 'Service', 'description' => null]]], 'services.0.description')],
    'service description may not exceed 500 characters' => [updateValidationCase(['services' => [['id' => 'service-one', 'file' => UploadedFile::fake()->image('service.jpg'), 'name' => 'Service', 'description' => updateValidationLongText(501)]]], 'services.0.description')],
]);
