<?php

namespace App\Models;

use App\Support\EthiopianPhone;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Validation\ValidationException;

class BankInformation extends Model
{
    protected $guarded = [];

    protected function casts(): array
    {
        return [
            'is_active' => 'boolean',
        ];
    }

    protected static function booted(): void
    {
        static::saving(function (BankInformation $model): void {
            if ($model->type === 'wallet') {
                $model->account_number = null;
                if (filled($model->phone_number)) {
                    $normalized = EthiopianPhone::normalize($model->phone_number);
                    if ($normalized === null) {
                        throw ValidationException::withMessages([
                            'phone_number' => [__('Enter a valid Ethiopian mobile number.')],
                        ]);
                    }
                    $model->phone_number = $normalized;
                }
            } else {
                $model->phone_number = null;
            }
        });
    }
}
