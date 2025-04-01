<?php
namespace App\Enums;

enum CardStatus: string
{
    case Active = 'active';
    case InActive  = 'inactive';


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
            self::Active->value => 'Active',
            self::InActive->value => 'InActive',
        ];
    }
}