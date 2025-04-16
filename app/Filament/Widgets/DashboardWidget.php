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
        return [
            Stat::make('Total Customers', $total_customers)
            ->descriptionIcon('heroicon-m-users')
            ->color('gray'),
            Stat::make('Total Admins', $total_admins),
            Stat::make('Total Users', User::count()),
            Stat::make('Total Cards', Card::count()),
        ];
    }
}
