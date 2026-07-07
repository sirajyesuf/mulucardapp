<?php

namespace App\Filament\Resources\CustomerResource\Pages;

use App\Enums\OrderStatus;
use App\Enums\SubscriptionStatus;
use App\Filament\Resources\CustomerResource;
use App\Models\Plan;
use App\Models\User;
use App\Notifications\OrderStatusUpdatedNotification;
use Filament\Actions;
use Filament\Forms\Components\DatePicker;
use Filament\Forms\Components\Placeholder;
use Filament\Forms\Components\Select;
use Filament\Notifications\Notification;
use Filament\Resources\Pages\ViewRecord;
use Filament\Infolists\Infolist;
use Filament\Infolists\Components\Section;
use Filament\Infolists\Components\TextEntry;
use Filament\Infolists\Components\Grid;
use App\Filament\Resources\CustomerResource\Widgets\StatsOverview;

class ViewCustomer extends ViewRecord
{
    protected static string $resource = CustomerResource::class;

    public function infolist(Infolist $infolist): Infolist
    {
        return $infolist
            ->schema([
                Section::make('Customer Details')
                    ->schema([
                        Grid::make(2)
                            ->schema([
                                TextEntry::make('name')
                                    ->label('Full Name'),
                                TextEntry::make('email')
                                    ->copyable()
                                    ->copyMessage('Email copied')
                                    ->copyMessageDuration(1500),
                            ]),
                    ]),

                // Section::make('Active Subscription')
                //     ->schema([
                //         Grid::make(2)
                //             ->schema([
                //                 TextEntry::make('subscriptions.plan.name')
                //                     ->label('Plan'),
                //                 TextEntry::make('subscriptions.start_date')
                //                     ->label('Start Date')
                //                     ->formatStateUsing(fn ($state) => $state ? date('Y-m-d', strtotime($state)) : null),
                //                 TextEntry::make('subscriptions.renewal_date')
                //                     ->label('Renewal Date')
                //                     ->formatStateUsing(fn ($state) => $state ? date('Y-m-d', strtotime($state)) : null),
                //             ]),
                //     ]),
            ]);
    }

    protected function getHeaderActions(): array
    {
        return [
            Actions\EditAction::make()
                ->icon('heroicon-m-pencil-square'),
            Actions\Action::make('change_subscription')
                ->label('Change Subscription')
                ->icon('heroicon-o-arrow-path')
                ->color('warning')
                ->modalHeading('Change Subscription')
                ->modalDescription(function (User $record): string {
                    $sub = $record->activeSubscription()->first();
                    return $sub
                        ? "Current plan: {$sub->plan->name} (renews {$sub->renewal_date})"
                        : 'Customer has no active subscription.';
                })
                ->form(function (User $record): array {
                    $sub = $record->activeSubscription()->first();
                    return [
                        Placeholder::make('current_plan')
                            ->label('Current Plan')
                            ->content($sub?->plan?->name ?? 'No active plan'),
                        Select::make('plan_id')
                            ->label('New Plan')
                            ->options(Plan::all()->pluck('name', 'id'))
                            ->required()
                            ->searchable(),
                        DatePicker::make('renewal_date')
                            ->label('Renewal Date')
                            ->default(now()->addYear())
                            ->required(),
                    ];
                })
                ->action(function (array $data, User $record): void {
                    $order = $record->orders()->create([
                        'order_number' => uniqid(),
                        'plan_id' => $data['plan_id'],
                        'status' => OrderStatus::PAID->value,
                        'payment_ref' => 'admin_change',
                    ]);

                    $record->subscriptions()
                        ->where('status', SubscriptionStatus::ACTIVE)
                        ->update(['status' => SubscriptionStatus::EXPIRED]);

                    $record->subscriptions()->create([
                        'plan_id' => $data['plan_id'],
                        'order_id' => $order->id,
                        'start_date' => now(),
                        'renewal_date' => $data['renewal_date'],
                        'status' => SubscriptionStatus::ACTIVE->value,
                    ]);

                    $planName = Plan::find($data['plan_id'])?->name ?? 'New';
                    $record->notify(new OrderStatusUpdatedNotification(
                        $order,
                        'Subscription Changed',
                        "Your subscription has been changed to the {$planName} plan."
                    ));

                    Notification::make()
                        ->success()
                        ->title('Subscription changed successfully')
                        ->send();
                }),
        ];
    }


    protected function getHeaderWidgets(): array
    {
        return [
            StatsOverview::class
        ];
    }

}
