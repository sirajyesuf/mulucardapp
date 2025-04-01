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
                'logo' => 'CommercialLogo.png',
            ],
            [
                'name' => 'Dashen Bank',
                'account_number' => '10007890123456',
                'account_holder' => 'Samuel John',
                'logo' => 'DashenBankLogo.png',
            ],
            [
                'name' => 'Awash Bank',
                'account_number' => '10001234567890',
                'account_holder' => 'Sarah Smith',
                'logo' => 'AwashLogo.png'
            ],
        ];

        foreach ($banks as $bank) {
            // For each bank, simulate the file upload
            $file = $this->fakeFile($bank['logo']);  // Fake file based on logo name
            $filePath = Storage::disk('public')->putFileAs('bankinformationlogos', $file, $file->getClientOriginalName());

            // Insert data into the database with the path to the file
            DB::table('bank_information')->insert([
                'name' => $bank['name'],
                'account_number' => $bank['account_number'],
                'account_holder' => $bank['account_holder'],
                'logo' => 'storage/' . $filePath,  // Store the path to the file in the database
            ]);
        }
    }

    /**
     * Create a fake file for seeding
     *
     * @param string $logoName
     * @return \Illuminate\Http\UploadedFile
     */
    private function fakeFile($logoName)
    {
        // The path to the logo file (from the public/logos directory in this case)
        $logoPath = public_path('bankslogo/' . $logoName);

        // Create a fake uploaded file based on the real file
        return new \Illuminate\Http\UploadedFile($logoPath, $logoName, mime_content_type($logoPath), filesize($logoPath), true);
    }
}

