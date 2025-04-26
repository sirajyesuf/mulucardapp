<?php
namespace App\Enums;

enum SubscriptionStatus: string
{
    case ACTIVE = 'active';
    case EXPIRED = 'expired';

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
            self::ACTIVE => 'Active',
            self::EXPIRED => 'Expired',
        ];
    }
}