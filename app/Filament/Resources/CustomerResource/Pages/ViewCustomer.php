<?php

namespace App\Filament\Resources\CustomerResource\Pages;

use App\Filament\Resources\CustomerResource;
use Filament\Actions;
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
        ];
    }


    protected function getHeaderWidgets(): array
    {
        return [
            StatsOverview::class
        ];
    }

}
