<?php

namespace App\Filament\Resources;

use App\Filament\Resources\SubscriptionResource\Pages;
use App\Filament\Resources\SubscriptionResource\RelationManagers;
use App\Models\Subscription;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\SoftDeletingScope;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Filters\SelectFilter;
use Filament\Support\Enums\FontWeight;
use Filament\Tables\Columns\BadgeColumn;
use App\Enums\SubscriptionStatus;

class SubscriptionResource extends Resource
{
    protected static ?string $model = Subscription::class;

    protected static ?string $navigationIcon = 'heroicon-o-credit-card';
    protected static ?string $navigationGroup = 'Subscription Management';
    protected static ?int $navigationSort = 2;
    

    public static function form(Form $form): Form
    {    

        return $form
            ->schema([

            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                TextColumn::make('user.name')
                    ->label('Customer')
                    ->searchable()
                    ->sortable()
                    ->alignCenter(),
                TextColumn::make('plan.name')
                    ->label('Plan')
                    ->searchable()
                    ->sortable()
                    ->alignCenter(),
                TextColumn::make('start_date')
                    ->label('Started')
                    ->date()
                    ->sortable()
                    ->formatStateUsing(fn (string $state): string => \Carbon\Carbon::parse($state)->diffForHumans())
                    ->description(fn (string $state): string => \Carbon\Carbon::parse($state)->format('M d, Y'))
                    ->alignCenter(),
                TextColumn::make('renewal_date')
                    
                    ->date()
                    ->sortable()
                    ->formatStateUsing(fn (string $state): string => \Carbon\Carbon::parse($state)->diffForHumans())
                    ->description(fn (string $state): string => \Carbon\Carbon::parse($state)->format('M d, Y'))
                    ->alignCenter(),
                TextColumn::make('status')
                    ->label('Status')
                    ->sortable()
                    ->badge()
                    ->color(fn (?string $state): string => match($state) {
                        SubscriptionStatus::ACTIVE->value => 'success',
                        SubscriptionStatus::EXPIRED->value => 'danger',
                        SubscriptionStatus::CANCELLED->value => 'gray',
                        null => 'gray',
                        default => 'warning',
                    })
                    ->alignCenter(),
                TextColumn::make('created_at')
                    ->label('Created At')
                    ->dateTime()
                    ->sortable()
                    ->toggleable(isToggledHiddenByDefault: true),
                TextColumn::make('updated_at')
                    ->label('Updated At')
                    ->dateTime()
                    ->sortable()
                    ->toggleable(isToggledHiddenByDefault: true),
            ])
            ->defaultSort('created_at', 'desc')
            ->filters([
                SelectFilter::make('status')
                    ->options([
                        SubscriptionStatus::ACTIVE->value => 'Active',
                        SubscriptionStatus::EXPIRED->value => 'Expired',
                        SubscriptionStatus::CANCELLED->value => 'Cancelled',
                    ])
                    ->label('Subscription Status')
                    ->placeholder('All Statuses')
                    ->indicator('Status'),
            ])
            ->actions([
                Tables\Actions\ViewAction::make(),
                Tables\Actions\EditAction::make(),
            ])
            ->bulkActions([
                Tables\Actions\BulkActionGroup::make([
                    Tables\Actions\DeleteBulkAction::make(),
                ]),
            ]);
    }

    public static function getRelations(): array
    {
        return [
            //
        ];
    }

    public static function getPages(): array
    {
        return [
            'index' => Pages\ListSubscriptions::route('/'),
            'view' => Pages\ViewSubscription::route('/{record}'),
            'edit' => Pages\EditSubscription::route('/{record}/edit'),
        ];
    }
}
