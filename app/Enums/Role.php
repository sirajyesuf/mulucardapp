<?php

namespace App\Enums;

enum Role:string
{
    case Admin = 'admin';
    case Customer = 'customer';

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
            self::Admin->value => 'Administrator',
            self::Customer->value => 'Customer',
        ];
    }

    /**
     * Check if the role is admin
     */
    public static function isAdmin(string $role): bool
    {
        return $role === self::Admin->value;
    }

    /**
     * Check if the role is customer
     */
    public static function isCustomer(string $role): bool
    {
        return $role === self::Customer->value;
    }
}
