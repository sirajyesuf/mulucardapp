<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Illuminate\Support\Facades\URL;
use App\Models\Card;
use App\Enums\SubscriptionStatus;
use Filament\Models\Contracts\FilamentUser;
use App\Enums\Role;
use Filament\Panel;


class User extends Authenticatable implements FilamentUser
{
    use HasFactory, Notifiable;

    protected $guarded = [];



    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
        ];
    }


    public function canAccessPanel(Panel $panel): bool
    {
        return $this->role == Role::ADMIN->value;
    }

    public function generateLoginUrl():string {

        return URL::temporarySignedRoute(
                    'magic.verify',
                    now()->addMinutes(5),
                    ['user' => $this->id]
                );

    }


    public function cards(){
        return $this->hasMany(Card::class);
    }

    public function orders(){
        return $this->hasMany(Order::class);
    }

    public function subscriptions(){
        return $this->hasMany(Subscription::class);
    }

    public function activeSubscription(){

        return $this->subscriptions()->where('status',SubscriptionStatus::ACTIVE)->with('plan');

    }
}
