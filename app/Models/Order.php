<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Enums\OrderStatus;

class Order extends Model
{

    protected $guarded = [];

    protected $casts = [
        'status' => OrderStatus::class,
    ];

    public function user(){
        return $this->belongsTo(User::class);
    }

    public function plan(){
        return $this->belongsTo(Plan::class);
    }
}
