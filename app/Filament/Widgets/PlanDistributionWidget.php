<?php

namespace App\Filament\Widgets;

use App\Models\Plan;
use App\Models\Subscription;
use Filament\Widgets\StatsOverviewWidget as BaseWidget;
use Filament\Widgets\StatsOverviewWidget\Stat;
use Illuminate\Support\Facades\DB;

class PlanDistributionWidget extends BaseWidget
{
    protected function getStats(): array
    {
        // Get active subscriptions grouped by plan with counts
        $activeSubscriptions = Subscription::select('plan_id', DB::raw('count(*) as total'))
            ->where('is_active', true)
            ->groupBy('plan_id')
            ->pluck('total', 'plan_id')
            ->toArray();

        // Get last month's subscriptions by plan
        $lastMonthSubscriptions = Subscription::select('plan_id', DB::raw('count(*) as total'))
            ->where('is_active', true)
            ->whereMonth('created_at', now()->subMonth()->month)
            ->whereYear('created_at', now()->subMonth()->year)
            ->groupBy('plan_id')
            ->pluck('total', 'plan_id')
            ->toArray();

        // Get this month's subscriptions by plan
        $thisMonthSubscriptions = Subscription::select('plan_id', DB::raw('count(*) as total'))
            ->where('is_active', true)
            ->whereMonth('created_at', now()->month)
            ->whereYear('created_at', now()->year)
            ->groupBy('plan_id')
            ->pluck('total', 'plan_id')
            ->toArray();

        $planStats = [];
        $plans = Plan::all();

        foreach ($plans as $plan) {
            $activeCount = $activeSubscriptions[$plan->id] ?? 0;
            $lastMonthCount = $lastMonthSubscriptions[$plan->id] ?? 0;
            $thisMonthCount = $thisMonthSubscriptions[$plan->id] ?? 0;

            $planStats[] = Stat::make($plan->name, $activeCount)
                ->description($plan->price > 0 ? 'Paid Plan' : 'Free Plan')
                ->descriptionIcon($plan->price > 0 ? 'heroicon-m-currency-dollar' : 'heroicon-m-gift')
                ->color($plan->price > 0 ? 'success' : 'info')
                ->chart([$lastMonthCount, $thisMonthCount]);
        }

        // Add total active subscriptions stat at the beginning
        array_unshift($planStats, 
            Stat::make('Total Active Subscriptions', array_sum($activeSubscriptions))
                ->description('Across all plans')
                ->descriptionIcon('heroicon-m-users')
                ->color('gray')
        );

        return $planStats;
    }
}
