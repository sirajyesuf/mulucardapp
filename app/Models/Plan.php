<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use  Illuminate\Database\Eloquent\Casts\Attribute;

class Plan extends Model
{

    use HasFactory;

    protected $guarded = [];

    protected function casts(): array
    {
        return [
            'features' => 'array',
        ];
    }

    // protected $appends = [
    //         'number_of_vcard',
    //         'number_of_nfc_business_card',
    //         'number_of_gallery',
    //         'number_of_service',
    // ];


    protected  function NumberOfVcard(): Attribute
    {

        return Attribute::make(
        get: fn ($value) => is_null($value) ? 'unlimited' : $value,
        );
    }

    protected  function NumberOfNfcBusinessCard(): Attribute
    {
        return Attribute::make(
            get: fn ($value) => is_null($value) ? 'unlimited' : $value,
        );
    }

    protected  function NumberOfGallery(): Attribute
    {
        return Attribute::make(
            get: fn ($value) => is_null($value) ? 'unlimited' : $value,
        );
    }

    protected  function NumberOfService(): Attribute
    {
        return Attribute::make(
            get: fn ($value) => is_null($value) ? 'unlimited' : $value,
        );
    }


}
