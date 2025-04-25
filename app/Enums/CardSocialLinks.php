<?php
namespace App\Enums;

enum CardSocialLinks:string
{
    case Website = 'website';
    case Facebook = 'facebook';
    case Twitter = 'twitter';
    case Instagram = 'instagram';
    case LinkedIn = 'linkedin';
    case YouTube = 'youtube';
    case TikTok = 'tiktok';
    case X = 'x';
    case snapchat = 'snapchat';


    public static function links(): array     {
        // return [self::Website->value, self::Facebook->value, self::Twitter->value, self::Instagram->value, self::LinkedIn->value, self::YouTube->value, self::TikTok->value, self::X->value];
        return ['website', 'facebook', 'twitter', 'instagram', 'linkedin', 'youtube', 'tiktok', 'x', 'snapchat'];
    }
}