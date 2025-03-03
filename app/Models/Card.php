<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\User;
use App\Models\SocialLink;
use Illuminate\Database\Eloquent\Concerns\HasUuids;

class Card extends Model
{
    protected $guarded = [];


    public function user(){
        return $this->belongsTo(User::class);
    }


    public function socialLinks(){
        return $this->hasMany(SocialLink::class);
    }
}
