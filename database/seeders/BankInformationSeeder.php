<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;

class BankInformationSeeder extends Seeder
{
    public function run(): void
    {
        $banks = [
            [
                'name' => 'Commercial Bank of Ethiopia',
                'account_number' => '10002345678990',
                'account_holder' => 'John Doe',
            ],
            [
                'name' => 'Dashen Bank',
                'account_number' => '10007890123456',
                'account_holder' => 'Samuel John',
            ],
            [
                'name' => 'Awash Bank',
                'account_number' => '10001234567890',
                'account_holder' => 'Sarah Smith',
            ],
        ];

        foreach ($banks as $bank) {
      
            DB::table('bank_information')->insert([
                'name' => $bank['name'],
                'account_number' => $bank['account_number'],
                'account_holder' => $bank['account_holder'],
            ]);
        }
    }


}

