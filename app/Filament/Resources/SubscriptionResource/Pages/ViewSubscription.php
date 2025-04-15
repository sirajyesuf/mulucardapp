<?php

namespace App\Filament\Resources\SubscriptionResource\Pages;

use App\Filament\Resources\SubscriptionResource;
use Filament\Actions;
use Filament\Resources\Pages\ViewRecord;
use Filament\Infolists\Components\Section;
use Filament\Infolists\Components\TextEntry;
use Filament\Infolists\Components\Grid;
use Filament\Infolists\Infolist;
use Filament\Support\Enums\FontWeight;

class ViewSubscription extends ViewRecord
{
    protected static string $resource = SubscriptionResource::class;

    public function infolist(Infolist $infolist): Infolist
    {
        return $infolist
            ->schema([
                Section::make('Customer Information')
                    ->icon('heroicon-o-user')
                    ->schema([
                        Grid::make(2)
                            ->schema([
                                TextEntry::make('user.name')
                                    ->label('Customer Name')
                                    ->weight(FontWeight::Bold),
                                TextEntry::make('user.email')
                                    ->label('Email')
                                    ->copyable(),
                            ]),
                    ]),

                Section::make('Subscription Details')
                    ->icon('heroicon-o-credit-card')
                    ->schema([
                        Grid::make(2)
                            ->schema([
                                TextEntry::make('plan.name')
                                    ->label('Plan Name'),
                                TextEntry::make('plan.price')
                                    ->label('Price')
                                    ->money('ETB'),
                                TextEntry::make('start_date')
                                    ->label('Start Date')
                                    ->date(),
                                TextEntry::make('end_date')
                                    ->label('End Date')
                                    ->date(),
                                TextEntry::make('is_active')
                                    ->label('Status')
                                    ->badge()
                                    ->color(fn (bool $state): string => $state ? 'success' : 'danger')
                                    ->formatStateUsing(fn (bool $state): string => $state ? 'Active' : 'Inactive'),
                            ]),
                    ]),

                Section::make('Additional Information')
                    ->icon('heroicon-o-information-circle')
                    ->schema([
                        Grid::make(2)
                            ->schema([
                                TextEntry::make('created_at')
                                    ->label('Created At')
                                    ->dateTime(),
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
            Actions\EditAction::make()
                ->icon('heroicon-o-pencil'),
        ];
    }
}
