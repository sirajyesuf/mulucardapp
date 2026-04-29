<?php

namespace App\Filament\Resources;

use App\Filament\Resources\BankResource\Pages;
use App\Models\BankInformation;
use App\Support\EthiopianPhone;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Forms\Get;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;

class BankResource extends Resource
{
    protected static ?string $model = BankInformation::class;

    protected static ?string $navigationIcon = 'heroicon-s-credit-card';

    protected static ?string $modelLabel = 'payment method';

    protected static ?string $pluralModelLabel = 'payment methods';

    protected static ?string $navigationGroup = 'Settings';

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                Forms\Components\Select::make('type')
                    ->options([
                        'bank' => 'Bank',
                        'wallet' => 'Wallet',
                    ])
                    ->required()
                    ->default('bank')
                    ->live(),
                Forms\Components\TextInput::make('name')
                    ->label('Display name')
                    ->required()
                    ->columnSpanFull(),
                Forms\Components\FileUpload::make('logo')
                    ->disk('public')
                    ->directory('payment-method-logos')
                    ->image()
                    ->required(fn (?BankInformation $record): bool => $record === null || blank($record->logo))
                    ->maxSize(2048),
                Forms\Components\TextInput::make('account_number')
                    ->label('Account number')
                    ->visible(fn (Get $get): bool => $get('type') === 'bank')
                    ->required(fn (Get $get): bool => $get('type') === 'bank'),
                Forms\Components\TextInput::make('phone_number')
                    ->label('Phone number')
                    ->tel()
                    ->visible(fn (Get $get): bool => $get('type') === 'wallet')
                    ->required(fn (Get $get): bool => $get('type') === 'wallet')
                    ->rules([
                        fn (): \Closure => function (string $attribute, mixed $value, \Closure $fail): void {
                            if ($value === null || $value === '') {
                                return;
                            }
                            if (! EthiopianPhone::isValidInput((string) $value)) {
                                $fail(__('Enter a valid Ethiopian mobile number.'));
                            }
                        },
                    ]),
                Forms\Components\TextInput::make('account_holder')
                    ->label(fn (Get $get): string => $get('type') === 'wallet' ? 'Recipient name' : 'Account holder')
                    ->required(),
                Forms\Components\Toggle::make('is_active')
                    ->label('Active on checkout')
                    ->default(true),
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                Tables\Columns\ImageColumn::make('logo')
                    ->disk('public')
                    ->circular()
                    ->defaultImageUrl(url('/favicon.ico')),
                Tables\Columns\TextColumn::make('name')
                    ->searchable()
                    ->sortable(),
                Tables\Columns\BadgeColumn::make('type')
                    ->colors([
                        'primary' => 'bank',
                        'success' => 'wallet',
                    ]),
                Tables\Columns\TextColumn::make('account_number')
                    ->searchable(),
                Tables\Columns\TextColumn::make('phone_number')
                    ->searchable(),
                Tables\Columns\TextColumn::make('account_holder')
                    ->searchable(),
                Tables\Columns\IconColumn::make('is_active')
                    ->boolean(),
            ])
            ->defaultSort('name')
            ->filters([
                //
            ])
            ->actions([
                Tables\Actions\EditAction::make(),
                Tables\Actions\DeleteAction::make(),
            ])
            ->bulkActions([
                Tables\Actions\BulkActionGroup::make([
                    Tables\Actions\DeleteBulkAction::make(),
                ]),
            ]);
    }

    public static function getPages(): array
    {
        return [
            'index' => Pages\ManageBanks::route('/'),
        ];
    }
}
