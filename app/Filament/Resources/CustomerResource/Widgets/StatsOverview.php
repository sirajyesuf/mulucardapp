<?php

namespace App\Filament\Resources\CustomerResource\Widgets;

use App\Models\Card;
use App\Models\Order;
use App\Models\Subscription;
use Filament\Widgets\StatsOverviewWidget as BaseWidget;
use Filament\Widgets\StatsOverviewWidget\Stat;
use Illuminate\Database\Eloquent\Model;
use App\Enums\SubscriptionStatus;

class StatsOverview extends BaseWidget
{
    public ?Model $record = null;

    protected function getStats(): array
    {
        $activeSubscription = Subscription::with('plan')->where('user_id', $this->record->id)->where('status', SubscriptionStatus::ACTIVE->value)->first();
        
        return [
            Stat::make('Total Cards', Card::where('user_id', $this->record->id)->count())
                ->description('Number of cards created')
                ->icon('heroicon-o-credit-card'),
            
            Stat::make('Active Subscriptions',$activeSubscription->plan->name.' Plan')
                ->description('Current active subscriptions')
                ->icon('heroicon-o-check-badge'),
            
            // Stat::make('Total Orders', Order::where('user_id', $this->record->id)->count())
            //     ->description('All time orders')
            //     ->icon('heroicon-o-shopping-cart'),
        ];
    }
}
