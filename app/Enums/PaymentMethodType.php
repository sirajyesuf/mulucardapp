<?php

namespace App\Enums;

enum PaymentMethodType: string
{
    case BANK = 'bank';
    case WALLET = 'wallet';
}
