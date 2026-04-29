<?php

namespace Database\Seeders;

use App\Enums\OrderStatus;
use App\Enums\Role;
use App\Enums\SubscriptionStatus;
use App\Models\Plan;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class AdminSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::transaction(function () {
            $adminPlan = Plan::firstOrCreate(
                ['name' => 'Admin Unlimited'],
                [
                    'price' => -1,
                    'description' => 'Internal admin-only plan with unlimited card creation',
                    'number_of_digital_business_card' => -1,
                    'number_of_nfc_business_card' => -1,
                    'number_of_gallery' => -1,
                    'number_of_service' => -1,
                    'most_popular' => false,
                    'is_public' => false,
                    'is_active' => true,
                    'features' => [
                        'Unlimited digital business cards',
                        'Unlimited galleries',
                        'Unlimited services',
                        'Admin-only internal use',
                    ],
                ]
            );

            $admin = User::firstOrCreate(
                ['email' => 'admin@admin.com'],
                [
                    'name' => 'Admin',
                    'password' => Hash::make('password'),
                    'role' => Role::ADMIN->value,
                ]
            );

            if ($admin->role !== Role::ADMIN->value) {
                $admin->forceFill(['role' => Role::ADMIN->value])->save();
            }

            $admin->subscriptions()
                ->where('status', SubscriptionStatus::ACTIVE->value)
                ->where('plan_id', '!=', $adminPlan->id)
                ->update(['status' => SubscriptionStatus::EXPIRED->value]);

            $order = $admin->orders()->updateOrCreate(
                ['payment_ref' => 'ADMIN-SEEDER-PLAN'],
                [
                    'order_number' => 'ADMIN-'.uniqid(),
                    'plan_id' => $adminPlan->id,
                    'status' => OrderStatus::PAID->value,
                ]
            );

            $admin->subscriptions()->updateOrCreate(
                ['plan_id' => $adminPlan->id],
                [
                    'order_id' => $order->id,
                    'status' => SubscriptionStatus::ACTIVE->value,
                    'start_date' => now()->toDateString(),
                    'renewal_date' => now()->addYears(100)->toDateString(),
                ]
            );
        });

        $this->command->info('Admin Email: admin@admin.com');
        $this->command->info('Admin Password: password');
        $this->command->info('Admin connected to Admin Unlimited plan successfully');
    }
}
