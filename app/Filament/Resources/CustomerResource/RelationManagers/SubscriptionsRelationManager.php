<?php

namespace App\Filament\Resources\CustomerResource\RelationManagers;

use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\RelationManagers\RelationManager;
use Filament\Tables;
use Filament\Tables\Table;
use App\Enums\SubscriptionStatus;
use Filament\Tables\Columns\BadgeColumn;

class SubscriptionsRelationManager extends RelationManager
{
    protected static string $relationship = 'subscriptions';

    protected static ?string $recordTitleAttribute = 'id';

    public function form(Form $form): Form
    {
        return $form
            ->schema([]);
    }

    public function table(Table $table): Table
    {
        return $table
            ->recordTitleAttribute('id')
            ->columns([
        
                Tables\Columns\TextColumn::make('plan.name')
                    ->searchable()
                    ->sortable(),
                Tables\Columns\TextColumn::make('start_date')
                    ->label('Start Date')
                    ->formatStateUsing(fn ($state) => $state ? date('Y-m-d', strtotime($state)) : null)
                    ->sortable(),
                Tables\Columns\TextColumn::make('renewal_date')
                    ->label('Renewal Date')
                    ->formatStateUsing(fn ($state) => $state ? date('Y-m-d', strtotime($state)) : null)
                    ->sortable(),
                
                Tables\Columns\BadgeColumn::make('status')
                    ->colors([
                        'success' => SubscriptionStatus::ACTIVE->value,
                        'danger' => SubscriptionStatus::EXPIRED->value,
                    ]),
            ])
            ->filters([
                Tables\Filters\SelectFilter::make('status')
                    ->options(SubscriptionStatus::class)
                    ->multiple()
            ])
            ->headerActions([])
            ->actions([
                Tables\Actions\ViewAction::make(),
            ])
            ->bulkActions([]);
    }
}
