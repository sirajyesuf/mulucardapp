<?php

namespace App\Enums;

enum Role:string
{
    case ADMIN = 'admin';
    case CUSTOMER = 'customer';

    /**
     * Get all enum values as an array for Filament Select
     */
    public static function values(): array
    {
        return array_column(self::cases(), 'value');
    }

    /**
     * Get human-readable labels for Filament Select
     */
    public static function options(): array
    {
        return [
            self::ADMIN->value => 'Admin',
            self::CUSTOMER->value => 'Customer',
        ];
    }
}
