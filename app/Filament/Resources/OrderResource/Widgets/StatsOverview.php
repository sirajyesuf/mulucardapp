<?php

namespace App\Filament\Resources\OrderResource\Widgets;

use App\Enums\OrderStatus;
use App\Models\Order;
use Filament\Widgets\StatsOverviewWidget as BaseWidget;
use Filament\Widgets\StatsOverviewWidget\Stat;

class StatsOverview extends BaseWidget
{
    protected function getStats(): array
    {
        return [
            Stat::make('Total Order', Order::count()),
            Stat::make('Paid Order', Order::where('status', OrderStatus::PAID->value)->count()),
            Stat::make('Pending Order', Order::where('status', OrderStatus::PENDING->value)->count()),
            Stat::make('Cancelled Order', Order::where('status', OrderStatus::CANCELLED->value)->count()),
        ];
    }


}
