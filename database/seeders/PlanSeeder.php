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
                'name' => 'free',
                'price' => null,
                'type' => 'free',
                'description' => 'Perfect for Individuals and Freelancers',
                'number_of_vcard' => 2,
                'number_of_nfc_business_card' => 0,
                'number_of_gallery' => 5,
                'number_of_service' => 5,
                'features' => [
                    'Essential Digital Business Card Features',
                    'Personal Information',
                    'Social Media Links Integration',
                    'QR Code Sharing',
                    'Basic Analytics',
                    '24/7 Email Support',
                    'Mobile-Friendly Design',
                    'Custom URL'
                ]
            ],
            [
                'name' => 'professional',
                'price' => 2499,
                'type' => 'professional',
                'description' => 'Ideal for Small Businesses and Teams',
                'number_of_vcard' => 5,
                'number_of_nfc_business_card' => 1,
                'number_of_gallery' => 15,
                'number_of_service' => 10,
                'features' => [
                    'All Basic Features',
                    'Priority Support',
                    'Advanced Analytics',
                    'Custom Branding',
                    'Team Management',
                    'Multiple Payment Links',
                    'Lead Generation Tools',
                    'Premium Templates'
                ]
            ],
            [
                'name' => 'Enterprise',
                'price' => 4999,
                'type' => 'enterprise',
                'description' => 'For Large Organizations and Corporations',
                'number_of_vcard' => null,
                'number_of_nfc_business_card' => null,
                'number_of_gallery' => null,
                'number_of_service' => null,
                'features' => [
                    'Everything in Professional Plan',
                    '2 NFC Business Cards',
                    'Unlimited Service Images & Additional Videos',
                    'Custom Themes & Dynamic Colors',
                    'Priority Support',
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
