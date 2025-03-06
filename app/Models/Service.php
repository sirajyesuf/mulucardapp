<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\Card;

class Service extends Model
{
    protected $guarded = [];

    public function card(){
        return $this->belongsTo(Card::class);
    }
}
