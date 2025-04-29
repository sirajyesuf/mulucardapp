<?php

namespace App\Filament\Resources;

use App\Filament\Resources\OrderResource\Pages;
use App\Filament\Resources\OrderResource\RelationManagers;
use App\Models\Order;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\SoftDeletingScope;
use App\Enums\OrderStatus;
use App\Filament\Resources\OrderResource\Widgets\StatsOverview;
use Filament\Tables\Filters\SelectFilter;
use App\Models\Plan;

class OrderResource extends Resource
{
    protected static ?string $model = Order::class;

    protected static ?string $navigationIcon = 'heroicon-s-document-arrow-down';

    public static function form(Form $form): Form
    {
        // Safely fetch the enterprise plan ID
        $enterprisePlan = Plan::where('price','<',0)->first();
        $enterprisePlanId = $enterprisePlan ? $enterprisePlan->id : null; // Use null if not found

        // Safely fetch the free plan ID (assuming price is 0)
        $freePlan = Plan::where('price', '=', 0)->first();
        $freePlanId = $freePlan ? $freePlan->id : null; // Use null if not found

        return $form
            ->schema([
                Forms\Components\Select::make('user_id')
                    ->relationship('user', 'name')
                    ->searchable()
                    ->preload()
                    ->required()
                    ->label('Customer'),
                Forms\Components\Select::make('plan_id')
                    ->relationship('plan', 'name')
                    ->required()
                    ->live()
                    // Update payment_ref when plan changes
                    ->afterStateUpdated(function (callable $set, ?string $state) use ($freePlanId) {
                        if ($freePlanId !== null && $state == $freePlanId) {
                            $set('payment_ref', 'Automatically Generated Reference Number');
                        } else {
                            // Clear payment_ref if a non-free plan is selected
                            // (or if it was previously the auto-generated value)
                            $set('payment_ref', null);
                        }
                    })
                    ->label('Subscription Plan'),
                Forms\Components\TextInput::make('price')
                    ->label('Price')
                    ->numeric()
                    // Use loose comparison (==) and check if enterprisePlanId is not null
                    ->required(fn (callable $get): bool => $enterprisePlanId !== null && $get('plan_id') == $enterprisePlanId)
                    ->visible(fn (callable $get): bool => $enterprisePlanId !== null && $get('plan_id') == $enterprisePlanId)
                    ->placeholder('Enter price for enterprise plan'),

                Forms\Components\TextInput::make('payment_ref')
                    ->label('Payment Reference')
                    // Required UNLESS the free plan is selected
                    ->required(fn (callable $get): bool => !($freePlanId !== null && $get('plan_id') == $freePlanId))
                    // Disabled IF the free plan is selected
                    ->disabled(fn (callable $get): bool => $freePlanId !== null && $get('plan_id') == $freePlanId)
                    ->placeholder('Enter payment reference or select Free plan'),
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                Tables\Columns\TextColumn::make('order_number'),
                Tables\Columns\TextColumn::make('user.name')
                ->label('Customer Name')
                ->searchable(),
                Tables\Columns\TextColumn::make('plan.name')
                ->label('Subscription Plan')
                ->searchable(),
                Tables\Columns\TextColumn::make('status'),
                Tables\Columns\TextColumn::make('payment_ref')
                ->label('Payment Reference')
                ->searchable(),
                Tables\Columns\TextColumn::make('created_at')
                    ->sortable()
            ])
            ->filters([
                SelectFilter::make('status')
                    ->options(OrderStatus::options())
                    ->label('Order Status')
                    ->placeholder('All Statuses')
                    ->indicator('Status'),
            ])
            ->actions([
                // Tables\Actions\EditAction::make(),
                Tables\Actions\ViewAction::make(),

            ])
            ->bulkActions([
                Tables\Actions\BulkActionGroup::make([
                    // Tables\Actions\DeleteBulkAction::make(),
                ]),
            ]);
    }

    public static function getRelations(): array
    {
        return [
            //
        ];
    }

    public static function getWidgets(): array
    {
        return [
            StatsOverview::class
        ];
    }


    public static function getNavigationBadge(): ?string
    {
        return static::getModel()::where('status',OrderStatus::PENDING)->count();
    }

    public static function getPages(): array
    {
        return [
            'index' => Pages\ListOrders::route('/'),
            'create' => Pages\CreateOrder::route('/create'),
            'edit' => Pages\EditOrder::route('/{record}/edit'),
            'view' => Pages\ViewOrder::route('/{record}'),
        ];
    }
}
