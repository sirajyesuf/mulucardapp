<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Plan;

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
                'features' => [
                    'Personal Information',
                    'Avatar, Logo and Banner Images',
                    'Essential Digital Business Card Features',
                    'Social Media Links Integration',
                    'QR Code Sharing',
                    'Basic Analytics',
                    '24/7 Email Support',
                    'Mobile-Friendly Design',
                ]

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
                'features' => [
                    'Personal Information',
                    'Avatar, Logo and Banner Images',
                    'Essential Digital Business Card Features',
                    'Social Media Links Integration',
                    'QR Code Sharing',
                    'Basic Analytics',
                    '24/7 Email Support',
                    'Mobile-Friendly Design',
                    'more nfc business card on additional payment'
                ]
            ],
            [
                'name' => 'Enterprise',
                'price' => -1, // for custome price
                'description' => 'For Large Organizations and Corporations',
                'number_of_digital_business_card' => null,
                'number_of_nfc_business_card' => null,
                'number_of_gallery' => null,
                'number_of_service' => null,
                'most_popular' => false,
                'features' => [
                    'Everything in Professional Plan',
                    'NFC Business Cards',
                    'Unlimited Service Images & Additional Videos',
                    'Custom Themes & Dynamic Colors',
                    'Priority Support',
                    'Custom Themes',
                    'Custom Branding'
                ]
            ],

        ];

        Plan::truncate();

        foreach ($plans as $plan) {
            Plan::create($plan);
        }
    }



}
