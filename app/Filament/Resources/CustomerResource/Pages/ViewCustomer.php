<?php

namespace App\Filament\Resources\CustomerResource\Pages;

use App\Filament\Resources\CustomerResource;
use Filament\Actions;
use Filament\Resources\Pages\ViewRecord;
use Filament\Infolists\Infolist;
use Filament\Infolists\Components\Section;
use Filament\Infolists\Components\TextEntry;
use Filament\Infolists\Components\Grid;

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
                                TextEntry::make('phone')
                                    ->label('Phone Number')
                                    ->copyable(),
                                TextEntry::make('email_verified_at')
                                    ->label('Email Verified')
                                    ->date()
                                    ->placeholder('Not verified'),
                            ]),
                    ]),

                Section::make('Subscription Information')
                    ->schema([
                        Grid::make(2)
                            ->schema([
                                TextEntry::make('subscriptions_count')
                                    ->label('Total Subscriptions')
                                    ->counts('subscriptions'),
                                TextEntry::make('subscriptions.plan.name')
                                    ->label('Current Plan'),
                                TextEntry::make('subscriptions.start_date')
                                    ->label('Start Date')
                                    ->date(),
                                TextEntry::make('subscriptions.end_date')
                                    ->label('End Date')
                                    ->date(),
                            ]),
                    ]),

                Section::make('System Information')
                    ->schema([
                        Grid::make(2)
                            ->schema([
                                TextEntry::make('created_at')
                                    ->label('Registered At')
                                    ->dateTime(),
                                TextEntry::make('updated_at')
                                    ->label('Last Updated')
                                    ->dateTime(),
                            ]),
                    ])->collapsed(),
            ]);
    }

    protected function getHeaderActions(): array
    {
        return [
            Actions\EditAction::make()
                ->icon('heroicon-m-pencil-square'),
        ];
    }
}
