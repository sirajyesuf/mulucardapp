<?php

namespace App\Support;

final class EthiopianPhone
{
    /** Normalized mobile: country code 251 + national mobile (starts with 7 or 9). */
    private const NORMALIZED_PATTERN = '/^251[79]\d{8}$/';

    /**
     * Normalize user input to digits-only form `251XXXXXXXXX` (12 digits), or null if invalid.
     */
    public static function normalize(?string $input): ?string
    {
        if ($input === null || trim($input) === '') {
            return null;
        }

        $digits = preg_replace('/\D+/', '', $input);
        if ($digits === '') {
            return null;
        }

        if (strlen($digits) === 12 && str_starts_with($digits, '251')) {
            return self::matchesNormalized($digits) ? $digits : null;
        }

        if (strlen($digits) === 10 && str_starts_with($digits, '0') && ($digits[1] === '7' || $digits[1] === '9')) {
            $candidate = '251'.substr($digits, 1);

            return self::matchesNormalized($candidate) ? $candidate : null;
        }

        if (strlen($digits) === 9 && ($digits[0] === '7' || $digits[0] === '9')) {
            $candidate = '251'.$digits;

            return self::matchesNormalized($candidate) ? $candidate : null;
        }

        return null;
    }

    public static function isValidInput(?string $input): bool
    {
        return self::normalize($input) !== null;
    }

    private static function matchesNormalized(string $twelveDigits): bool
    {
        return (bool) preg_match(self::NORMALIZED_PATTERN, $twelveDigits);
    }
}
