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
                Forms\Components\TextInput::make('number_of_vcard')
                ->required()
                ->integer()
                ->columnSpanFull(),
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
