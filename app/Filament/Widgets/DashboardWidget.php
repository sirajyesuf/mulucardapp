<?php

namespace App\Filament\Widgets;

use Filament\Widgets\StatsOverviewWidget as BaseWidget;
use Filament\Widgets\StatsOverviewWidget\Stat;
use App\Models\User;
use App\Models\Card;
use App\Enums\Role;
class DashboardWidget extends BaseWidget
{
    protected function getStats(): array
    {
        $total_customers = User::where('role', Role::CUSTOMER->value)->count();
        $total_admins = User::where('role', Role::ADMIN->value)->count();
        $total_cards = Card::count();

        return [
            Stat::make('Total Customers', $total_customers),
            Stat::make('Total Admins', $total_admins),
            Stat::make('Total Cards', $total_cards),
        ];
    }
}
