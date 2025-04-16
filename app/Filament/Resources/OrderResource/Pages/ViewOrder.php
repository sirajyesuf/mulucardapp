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
use App\Notifications\OrderStatusUpdatedNotification;
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
                                        OrderStatus::CANCELLED => 'gray',
                                        default => 'gray',
                                    }),
                                TextEntry::make('payment_ref')
                                    ->label('Payment Reference')
                                    ->copyable()
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
                                TextEntry::make('plan.description')
                                    ->label('Description')
                                    ->columnSpanFull(),
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
                ->visible(function (Order $record): bool {
                    return $record->status->value === OrderStatus::PENDING->value;
                })
                ->action(function (array $data, Order $record): void {
                    $this->updateStatus($data, $record);
                }),
            
        ];
    }


    protected function updateStatus(array $data, Order $order): void
    {

        // dump($data['status']);
        // dump($order->status->value);
        // dump(OrderStatus::PAID->value);
        // dump(OrderStatus::CANCELLED->value);
        // dd("yes");

        //update the order status from pending to paid
        if($order->status->value === OrderStatus::PENDING->value and $data['status'] === OrderStatus::PAID->value) {
            $this->updateStatusToPaid($order);
        }

        //update the order status from pending to cancelled
        if($order->status->value === OrderStatus::PENDING->value and $data['status'] === OrderStatus::CANCELLED->value) {
            $this->updateStatusToCancelled($order);
        }
   
    } 
    
    
    protected function updateStatusToPaid(Order $order): void
    {
        $order->status = OrderStatus::PAID->value;
        $order->save();
        // create subscription

        // send notification to the database
        $order->user->notify(new OrderStatusUpdatedNotification($order,
            'Order Status Updated',
            'Your order status has been updated to PAID. and '.$order->plan->name .'Plan  has been created.'));
    }

    protected function updateStatusToCancelled(Order $order): void
    {
        $order->status = OrderStatus::CANCELLED->value;
        $order->save();
        // send notification to the database
        $order->user->notify(new OrderStatusUpdatedNotification($order,
            'Order Status Updated',
            'Your order status has been updated to CANCELLED.'));
    }
}