<?php

namespace App\Filament\Resources\OrderResource\Pages;

use App\Filament\Resources\OrderResource;
use Filament\Actions;
use Filament\Resources\Pages\ViewRecord;
use Illuminate\Console\View\Components\Info;
use Filament\Infolists\Components\ImageEntry;
use Filament\Infolists\Components\TextEntry;
use Filament\Infolists\Infolist;
use Filament\Actions\Action;
use Filament\Forms\Components\Select;
use App\Enums\OrderStatus;
use App\Models\Order;
use App\Notifications\OrderCreatedNotification;
use Filament\Infolists\Components\Section;
use Filament\Infolists\Components\Grid;
use Filament\Support\Enums\FontWeight;
use Filament\Notifications\Notification;

class ViewOrder extends ViewRecord
{
    protected static string $resource = OrderResource::class;

    public function infolist(Infolist $infolist): Infolist
    {
        return $infolist
            ->schema([
                Section::make('Order Information')
                    ->icon('heroicon-o-shopping-cart')
                    ->schema([
                        Grid::make(3)
                            ->schema([
                                TextEntry::make('order_number')
                                    ->label('Order Number')
                                    ->weight(FontWeight::Bold)
                                    ->copyable(),
                                TextEntry::make('status')
                                    ->badge()
                                    ->color(fn (OrderStatus $state): string => match ($state) {
                                        OrderStatus::PENDING => 'warning',
                                        OrderStatus::PAID => 'success',
                                        OrderStatus::FAILED => 'danger',
                                        OrderStatus::REFUNDED => 'info',
                                        OrderStatus::CANCELLED => 'gray',
                                        default => 'gray',
                                    }),
                                TextEntry::make('created_at')
                                    ->label('Order Date')
                                    ->dateTime()
                            ]),
                    ]),

                Section::make('Customer Details')
                    ->icon('heroicon-o-user')
                    ->schema([
                        Grid::make(2)
                            ->schema([
                                TextEntry::make('user.name')
                                    ->label('Customer Name'),
                                TextEntry::make('user.email')
                                    ->label('Email')
                                    ->copyable(),
                    
                            ]),
                    ]),

                Section::make('Plan Details')
                    ->icon('heroicon-o-rectangle-stack')
                    ->schema([
                        Grid::make(2)
                            ->schema([
                                TextEntry::make('plan.name')
                                    ->label('Plan Name'),
                                TextEntry::make('plan.price')
                                    ->label('Price')
                                    ->money('ETB'),
                                TextEntry::make('plan.duration')
                                    ->label('Duration')
                                    ->suffix(' days'),
                                TextEntry::make('plan.description')
                                    ->label('Description')
                                    ->columnSpanFull(),
                            ]),
                    ]),

                Section::make('Payment Information')
                    ->icon('heroicon-o-credit-card')
                    ->schema([
                        Grid::make(2)
                            ->schema([
                                TextEntry::make('payment_ref')
                                    ->label('Payment Reference')
                                    ->copyable(),
                                TextEntry::make('updated_at')
                                    ->label('Last Updated')
                                    ->dateTime(),
                            ]),
                    ]),
            ]);
    }

    protected function getHeaderActions(): array
    {
        return [
            Action::make('update_status')
                ->label('Update Status')
                ->icon('heroicon-o-arrow-path')
                ->color('success')
                ->form([
                    Select::make('status')
                        ->label('Status')
                        ->options(OrderStatus::class)
                        ->required(),
                ])
                ->action(function (array $data, Order $record): void {
                    $record->status = $data['status'];
                    $record->save();
                    $record->user->notify(new OrderCreatedNotification($record));
                    Notification::make()
                        ->title('Saved successfully')
                        ->success()
                        ->send();
                })
        ];
    }
}