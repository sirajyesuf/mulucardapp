<?php

namespace App\Filament\Resources\PlanResource\Pages;

use App\Filament\Resources\PlanResource;
use Filament\Actions;
use Filament\Resources\Pages\CreateRecord;

class CreatePlan extends CreateRecord
{
    protected static string $resource = PlanResource::class;

    // protected function mutateFormDataBeforeCreate(array $data): array
    // {
    //     $data['number_of_vcard'] = $data['unlimited_vcard'] ? null : $data['number_of_vcard'];
    //     $data['number_of_gallery'] = $data['unlimited_gallery'] ? null : $data['number_of_gallery'];
    //     $data['number_of_service'] = $data['unlimited_service'] ? null : $data['number_of_service'];
    //     $data['number_of_nfc_business_card'] = $data['unlimited_nfc_business_card'] ? null : $data['number_of_nfc_business_card'];

    //     //remove the unlimited fields from the data array
    //     unset($data['unlimited_vcard']);
    //     unset($data['unlimited_gallery']);
    //     unset($data['unlimited_service']);
    //     unset($data['unlimited_nfc_business_card']);

    //     // dd($data);
    //     return $data;

    // }
}
