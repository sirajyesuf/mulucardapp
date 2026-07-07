<?php

namespace App\Filament\Resources;

use App\Filament\Resources\CustomerResource\Pages;
use App\Models\User;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;
use Illuminate\Database\Eloquent\Builder;
use Filament\Tables\Columns\TextColumn;
use App\Enums\Role;
use App\Enums\OrderStatus;
use App\Enums\SubscriptionStatus;
use App\Models\Plan;
use App\Notifications\OrderStatusUpdatedNotification;
use Filament\Notifications\Notification;
use Filament\Tables\Filters\SelectFilter;
use Filament\Tables\Filters\TernaryFilter;
use Filament\Forms\Components\DatePicker;
use Filament\Forms\Components\Placeholder;
use Filament\Forms\Components\Select;
use Filament\Tables\Actions\Action;
use App\Filament\Resources\CustomerResource\RelationManagers;

class CustomerResource extends Resource
{
    protected static ?string $model = User::class;

    protected static ?string $navigationIcon = 'heroicon-o-users';
    protected static ?int $navigationSort = 1;
    protected static ?string $modelLabel = 'Customer';
    protected static ?string $pluralModelLabel = 'Customers';
  

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                Forms\Components\Section::make('Customer Information')
                    ->schema([
                        Forms\Components\TextInput::make('name')
                            ->required()
                            ->maxLength(255),
                        Forms\Components\TextInput::make('email')
                            ->email()
                            ->required()
                            ->maxLength(255)
                            ->unique(),
                    ])
                    ->columns(2),
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                TextColumn::make('name')
                    ->searchable(),
                    
                TextColumn::make('email')
                    ->searchable(),
                TextColumn::make('created_at')
                    ->label('Registered At')
                    ->date()
                
            ])
            ->filters([])
            ->actions([
                Tables\Actions\ViewAction::make(),
                Tables\Actions\EditAction::make(),
                Action::make('change_subscription')
                    ->label('Change Subscription')
                    ->icon('heroicon-o-arrow-path')
                    ->color('warning')
                    ->modalHeading('Change Subscription')
                    ->modalDescription(function (User $record): string {
                        $sub = $record->activeSubscription()->first();
                        return $sub
                            ? "Current plan: {$sub->plan->name} (renews {$sub->renewal_date})"
                            : 'Customer has no active subscription.';
                    })
                    ->form(function (User $record): array {
                        $sub = $record->activeSubscription()->first();
                        return [
                            Placeholder::make('current_plan')
                                ->label('Current Plan')
                                ->content($sub?->plan?->name ?? 'No active plan'),
                            Select::make('plan_id')
                                ->label('New Plan')
                                ->options(Plan::all()->pluck('name', 'id'))
                                ->required()
                                ->searchable(),
                            DatePicker::make('renewal_date')
                                ->label('Renewal Date')
                                ->default(now()->addYear())
                                ->required(),
                        ];
                    })
                    ->action(function (array $data, User $record): void {
                        $order = $record->orders()->create([
                            'order_number' => uniqid(),
                            'plan_id' => $data['plan_id'],
                            'status' => OrderStatus::PAID->value,
                            'payment_ref' => 'admin_change',
                        ]);

                        $record->subscriptions()
                            ->where('status', SubscriptionStatus::ACTIVE)
                            ->update(['status' => SubscriptionStatus::EXPIRED]);

                        $record->subscriptions()->create([
                            'plan_id' => $data['plan_id'],
                            'order_id' => $order->id,
                            'start_date' => now(),
                            'renewal_date' => $data['renewal_date'],
                            'status' => SubscriptionStatus::ACTIVE->value,
                        ]);

                        $planName = Plan::find($data['plan_id'])?->name ?? 'New';
                        $record->notify(new OrderStatusUpdatedNotification(
                            $order,
                            'Subscription Changed',
                            "Your subscription has been changed to the {$planName} plan."
                        ));

                        Notification::make()
                            ->success()
                            ->title('Subscription changed successfully')
                            ->send();
                    }),
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
            RelationManagers\CardsRelationManager::class,
            RelationManagers\OrdersRelationManager::class,
            RelationManagers\SubscriptionsRelationManager::class,
        ];
    }



    public static function getPages(): array
    {
        return [
            'index' => Pages\ListCustomers::route('/'),
            'create' => Pages\CreateCustomer::route('/create'),
            'view' => Pages\ViewCustomer::route('/{record}'),
            'edit' => Pages\EditCustomer::route('/{record}/edit'),
        ];
    }

    public static function getEloquentQuery(): Builder
    {
        return parent::getEloquentQuery()->where('role', Role::CUSTOMER);
    }
}
