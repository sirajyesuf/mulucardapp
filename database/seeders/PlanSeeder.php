<?php

namespace Database\Seeders;

use App\Models\Plan;
use Illuminate\Database\Seeder;

class PlanSeeder extends Seeder
{
    public function run(): void
    {
        $plans = [
            [
                'name' => 'Free',
                'price' => 0,
                'description' => 'Perfect for Individuals and Freelancers',
                'number_of_digital_business_card' => 2,
                'number_of_nfc_business_card' => 0,
                'number_of_gallery' => 1,
                'number_of_service' => 1,
                'most_popular' => false,
                'is_public' => true,
                'is_active' => true,
                'features' => [
                    'Personal Information',
                    'Avatar, Logo and Banner Images',
                    'Essential Digital Business Card Features',
                    'Social Media Links Integration',
                    'QR Code Sharing',
                    'Basic Analytics',
                    '24/7 Email Support',
                    'Mobile-Friendly Design',
                ],
            ],
            [
                'name' => 'Professional',
                'price' => 2499,
                'description' => 'Ideal for Small Businesses and Teams',
                'number_of_digital_business_card' => 4,
                'number_of_nfc_business_card' => 1,
                'number_of_gallery' => 3,
                'number_of_service' => 3,
                'most_popular' => true,
                'is_public' => true,
                'is_active' => true,
                'features' => [
                    'Personal Information',
                    'Avatar, Logo and Banner Images',
                    'Essential Digital Business Card Features',
                    'Social Media Links Integration',
                    'QR Code Sharing',
                    'Basic Analytics',
                    '24/7 Email Support',
                    'Mobile-Friendly Design',
                    'more nfc business card on additional payment',
                ],
            ],
            [
                'name' => 'Enterprise',
                'price' => -1,
                'description' => 'For Large Organizations and Corporations',
                'number_of_digital_business_card' => null,
                'number_of_nfc_business_card' => null,
                'number_of_gallery' => null,
                'number_of_service' => null,
                'most_popular' => false,
                'is_public' => true,
                'is_active' => true,
                'features' => [
                    'Everything in Professional Plan',
                    'NFC Business Cards',
                    'Unlimited Service Images & Additional Videos',
                    'Custom Themes & Dynamic Colors',
                    'Priority Support',
                    'Custom Themes',
                    'Custom Branding',
                ],
            ],
            [
                'name' => 'Admin Unlimited',
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
            ],
        ];

        foreach ($plans as $plan) {
            Plan::firstOrCreate(
                ['name' => $plan['name']],
                $plan
            );
        }
    }
}
