<?php
namespace App\Enums;

enum OrderStatus: string
{
    case PENDING = 'pending';
    case PAID = 'paid';
    case CANCELLED = 'cancelled';

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
            self::PENDING->value => 'Pending',
            self::PAID->value => 'Paid',
            self::CANCELLED->value => 'Cancelled',
            
        ];
    }
}