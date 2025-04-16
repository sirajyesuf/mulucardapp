<?php

namespace App\Filament\Resources\SubscriptionResource\Widgets;

use App\Models\Subscription;
use App\Models\Plan;
use Filament\Widgets\StatsOverviewWidget as BaseWidget;
use Filament\Widgets\StatsOverviewWidget\Stat;
use App\Enums\SubscriptionStatus;
use Illuminate\Support\Collection;

class StatsOverview extends BaseWidget
{
    protected function getStats(): array
    {
        $totalSubscriptions = Subscription::count();
        $activeSubscriptions = Subscription::where('status', SubscriptionStatus::ACTIVE->value)->with('plan')->get();
        $planStats = [

        ];
        foreach(Plan::all() as $plan){
            $totalSubscribers =  $activeSubscriptions->where('plan_id', $plan->id)->count();
            $stat = Stat::make($plan->name, $totalSubscribers)
                    ->description('Active users')
                    ->descriptionIcon('heroicon-m-users')
                    ->color('info');
            $stats[] = $stat;   
        }




        return [
            Stat::make('Total Subscriptions', $totalSubscriptions)
                ->description('All time subscriptions')
                ->descriptionIcon('heroicon-m-users')
                ->color('gray'),

            Stat::make('Active Subscriptions', $activeSubscriptions->count())
                ->description(number_format(($activeSubscriptions->count() / max(1, $totalSubscriptions)) * 100, 1) . '% of total')
                ->descriptionIcon('heroicon-m-arrow-trending-up')
                ->color('success'),
            ...$stats,
        ];
    }
}
