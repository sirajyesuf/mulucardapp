<?php
namespace App\Enums;

enum CardSocialLinks:string
{
    case Website = 'website';
    case Facebook = 'facebook';
    case Instagram = 'instagram';
    case LinkedIn = 'linkedin';
    case YouTube = 'youtube';
    case TikTok = 'tiktok';
    case X = 'x';
    case snapchat = 'snapchat';


    public static function links(): array     {
        return ['website', 'facebook', 'instagram', 'linkedin', 'youtube', 'tiktok', 'x', 'snapchat'];
    }
}