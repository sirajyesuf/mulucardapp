<?php

namespace App\Filament\Resources\SubscriptionResource\Widgets;

use App\Models\Subscription;
use Filament\Widgets\StatsOverviewWidget as BaseWidget;
use Filament\Widgets\StatsOverviewWidget\Stat;

class StatsOverview extends BaseWidget
{
    protected function getStats(): array
    {
        $totalSubscriptions = Subscription::count();
        $activeSubscriptions = Subscription::where('is_active', true)->count();
        $inactiveSubscriptions = Subscription::where('is_active', false)->count();
        $expiringThisMonth = Subscription::whereMonth('end_date', now()->month)
            ->whereYear('end_date', now()->year)
            ->count();

        return [
            Stat::make('Total Subscriptions', $totalSubscriptions)
                ->description('All time subscriptions')
                ->descriptionIcon('heroicon-m-chart-bar')
                ->color('gray'),

            Stat::make('Active Subscriptions', $activeSubscriptions)
                ->description(number_format(($activeSubscriptions / max(1, $totalSubscriptions)) * 100, 1) . '% of total')
                ->descriptionIcon('heroicon-m-arrow-trending-up')
                ->color('success'),

            Stat::make('Inactive Subscriptions', $inactiveSubscriptions)
                ->description(number_format(($inactiveSubscriptions / max(1, $totalSubscriptions)) * 100, 1) . '% of total')
                ->descriptionIcon('heroicon-m-arrow-trending-down')
                ->color('danger'),

            Stat::make('Expiring This Month', $expiringThisMonth)
                ->description('Subscriptions ending soon')
                ->descriptionIcon('heroicon-m-clock')
                ->color('warning'),
        ];
    }
}
