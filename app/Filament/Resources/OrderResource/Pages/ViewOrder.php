<?php

namespace App\Filament\Resources\OrderResource\Pages;

use App\Filament\Resources\OrderResource;
use Filament\Actions;
use Filament\Resources\Pages\ViewRecord;
use Illuminate\Console\View\Components\Info;
use Filament\Infolists\Components\ImageEntry;
use Filament\Infolists\Components\Section;
use Filament\Infolists\Components\TextEntry;
use Filament\Infolists\Infolist;
use Filament\Actions\Action;
use Filament\Forms\Components\Select;
use App\Enums\OrderStatus;
use App\Models\Order;
use App\Notifications\OrderCreatedNotification;

class ViewOrder extends ViewRecord
{
    protected static string $resource = OrderResource::class;

    public function infolist(Infolist $infolist): Infolist
    {
        return $infolist
                ->schema([
                    TextEntry::make('order_number'),
                    TextEntry::make('user.name'),
                    TextEntry::make('plan.name'),
                    TextEntry::make('status'),
                    TextEntry::make('payment_ref'),
                ]);

    }

    public function actions()
    {
        return [
            Actions\Action::make('Edit Order')
                ->primary()
                ->icon('heroicon-o-pencil')
                ->url('/filament/resources/orders/' . $this->record->id . '/edit'),
        ];
    }


protected function getHeaderActions(): array
{
    return [
        Action::make('edit'),
        Action::make('update the status')
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
    })

    ];
}


// protected function updateStatus(array $data,Order $record): array   {

//     $record->status = $data['status'];
//     $record->save();


// }


}
