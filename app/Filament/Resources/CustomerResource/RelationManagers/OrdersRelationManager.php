<?php

namespace App\Filament\Resources\CustomerResource\RelationManagers;

use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\RelationManagers\RelationManager;
use Filament\Tables;
use Filament\Tables\Table;
use App\Enums\OrderStatus;
use Filament\Tables\Columns\BadgeColumn;

class OrdersRelationManager extends RelationManager
{
    protected static string $relationship = 'orders';

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
                Tables\Columns\TextColumn::make('order_number')
                    ->label('Order ID')
                    ->searchable()
                    ->sortable(),
                Tables\Columns\TextColumn::make('plan.name')
                    ->searchable()
                    ->sortable(),
                Tables\Columns\TextColumn::make('payment_ref')
                    ->label('Payment Reference')
                    ->searchable()
                    ->copyable()
                    ->copyMessage('Payment reference copied')
                    ->copyMessageDuration(1500),
                Tables\Columns\BadgeColumn::make('status')
                    ->colors([
                        'warning' => OrderStatus::PENDING->value,
                        'success' => OrderStatus::PAID->value,
                        'gray' => OrderStatus::CANCELLED->value,
                    ]),
           
            ])
            ->filters([
                Tables\Filters\SelectFilter::make('status')
                    ->options(OrderStatus::class)
                    ->multiple()
            ])
            ->headerActions([])
            ->actions([
            ])
            ->bulkActions([]);
    }
}
