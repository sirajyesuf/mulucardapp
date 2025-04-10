<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\User;
use App\Models\SocialLink;
use App\Models\Gallery;

class Card extends Model
{
    protected $guarded = [];

    protected function casts(): array
    {
        return [
            'business_hours' => 'array'
        ];
    }


    public function user(){
        return $this->belongsTo(User::class);
    }


    public function socialLinks(){
        return $this->hasMany(SocialLink::class);
    }

    public function galleries(){
        return $this->hasMany(Gallery::class);
    }

    public function services(){
        return $this->hasMany(Service::class);
    }
}
