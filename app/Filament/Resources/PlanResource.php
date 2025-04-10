<?php

namespace App\Filament\Resources;

use App\Filament\Resources\PlanResource\Pages;
use App\Filament\Resources\PlanResource\RelationManagers;
use App\Models\Plan;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\SoftDeletingScope;
use Filament\Forms\Components\Repeater;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Checkbox;
use Filament\Forms\Get;

class PlanResource extends Resource
{
    protected static ?string $model = Plan::class;

    protected static ?string $navigationIcon = 'heroicon-o-rectangle-stack';

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                Forms\Components\TextInput::make('name'),
                Forms\Components\TextInput::make('description'),
                Forms\Components\Section::make([
                    Forms\Components\Select::make('type')
                    ->options([
                        'free' => 'Free',
                        'professional' => 'Professional',
                        'enterprise' => 'Enterprise'
                    ])
                    ->live(),
                    Forms\Components\TextInput::make('price')
                    ->visible(fn (Get $get): bool =>  $get('type') != 'free'),

                ]),

                Forms\Components\Section::make("limit")
                ->description('Prevent abuse by limiting the number of requests per period')
                ->schema([

                // Number of VCards
                Forms\Components\Section::make('VCard Limit')
                    ->schema([
                        Checkbox::make('unlimited_vcard')
                            ->label('Unlimited VCard')
                            ->live()
                            ->afterStateUpdated(function ($state, callable $set) {
                                if ($state) {
                                    $set('number_of_vcard', null); // Set to NULL for unlimited
                                }
                            }),
                        TextInput::make('number_of_vcard')
                            ->numeric()
                            ->minValue(0)
                            ->default(0)
                            ->disabled(fn ($get) => $get('unlimited_vcard'))
                            ->dehydrated(fn ($get) => !$get('unlimited_vcard')), // Only save if not unlimited
                    ]),
                // Number of Galleries
                Forms\Components\Section::make('Gallery Limit')
                    ->schema([
                        Checkbox::make('unlimited_gallery')
                            ->label('Unlimited Galleries')
                            ->live()
                            ->afterStateUpdated(function ($state, callable $set) {
                                if ($state) {
                                    $set('number_of_gallery', null); // Set to NULL for unlimited
                                }
                            }),
                        TextInput::make('number_of_gallery')
                            ->numeric()
                            ->minValue(0)
                            ->default(0)
                            ->disabled(fn ($get) => $get('unlimited_gallery'))
                            ->dehydrated(fn ($get) => !$get('unlimited_gallery')), // Only save if not unlimited
                    ]),

                // number of services
                Forms\Components\Section::make('Service Limit')
                    ->schema([
                        Checkbox::make('unlimited_service')
                            ->label('Unlimited Services')
                            ->live()
                            ->afterStateUpdated(function ($state, callable $set) {
                                if ($state) {
                                    $set('number_of_service', null); // Set to NULL for unlimited
                                }
                            }),
                        TextInput::make('number_of_service')
                            ->numeric()
                            ->minValue(0)
                            ->default(0)
                            ->disabled(fn ($get) => $get('unlimited_service'))
                            ->dehydrated(fn ($get) => !$get('unlimited_service')), // Only save if not unlimited
                    ]),
                // number of nfc business cards
                Forms\Components\Section::make('NFC Business Card Limit')
                    ->schema([
                        Checkbox::make('unlimited_nfc_business_card')
                            ->label('Unlimited NFC Business Cards')
                            ->live()
                            ->afterStateUpdated(function ($state, callable $set) {
                                if ($state) {
                                    $set('number_of_nfc_business_card', null); // Set to NULL for unlimited
                                }
                            }),
                        TextInput::make('number_of_nfc_business_card')
                            ->numeric()
                            ->minValue(0)
                            ->default(0)
                            ->disabled(fn ($get) => $get('unlimited_nfc_business_card'))
                            ->dehydrated(fn ($get) => !$get('unlimited_nfc_business_card')), // Only save if not unlimited
                    ]),
                ])
                    ->collapsible()
                    ->persistCollapsed()
                    ->compact(),

                Forms\Components\Section::make([
                    Repeater::make('features')
                    ->simple(
                        TextInput::make('feature')->required()
                    )
                    ->addActionLabel('Add Feature')
                ])

            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                Tables\Columns\TextColumn::make('name'),
                Tables\Columns\TextColumn::make('description'),
                Tables\Columns\TextColumn::make('type'),
                Tables\Columns\TextColumn::make('price'),
                Tables\Columns\TextColumn::make('number_of_vcard'),
                Tables\Columns\TextColumn::make('number_of_gallery'),
                Tables\Columns\TextColumn::make('number_of_service'),
                Tables\Columns\TextColumn::make('number_of_nfc_business_card'),
                Tables\Columns\TextColumn::make('is_free')
                    ->label('Free'),
                Tables\Columns\TextColumn::make('features')->badge()


            ])
            ->filters([
                //
            ])
            ->actions([
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
            'index' => Pages\ListPlans::route('/'),
            'create' => Pages\CreatePlan::route('/create'),
            'edit' => Pages\EditPlan::route('/{record}/edit'),
        ];
    }
}
