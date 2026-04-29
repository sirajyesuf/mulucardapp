<?php

namespace App\Support;

/**
 * Ethiopian mobile numbers only: normalize to 251 + 9 subscriber digits (12 digits total).
 */
final class EthiopianMobile
{
    /**
     * Normalize user input to canonical stored form, or null if not parseable.
     */
    public static function normalize(?string $input): ?string
    {
        if ($input === null || $input === '') {
            return null;
        }

        $digits = preg_replace('/\D+/', '', $input) ?? '';

        if (preg_match('/^251[79]\d{8}$/', $digits)) {
            return $digits;
        }

        // Domestic e.g. 09xxxxxxxx / 07xxxxxxxx
        if (preg_match('/^0[79]\d{8}$/', $digits)) {
            return '251'.substr($digits, 1);
        }

        // NSN without country / trunk prefix e.g. 9xxxxxxxx
        if (preg_match('/^[79]\d{8}$/', $digits)) {
            return '251'.$digits;
        }

        return null;
    }

    public static function isValidNormalized(?string $normalized): bool
    {
        return $normalized !== null && preg_match('/^251[79]\d{8}$/', $normalized) === 1;
    }
}
