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
use Illuminate\Support\HtmlString;


class PlanResource extends Resource
{
    protected static ?string $model = Plan::class;

    protected static ?string $navigationIcon = 'heroicon-o-rectangle-stack';
    protected static ?string $navigationGroup = 'Settings';


    public static function form(Form $form): Form
    {
        return $form
        ->schema([
            Forms\Components\Group::make()
                ->schema([
                    Forms\Components\Section::make()
                        ->schema([
                            Forms\Components\TextInput::make('name')
                                ->required(),
                            Forms\Components\TextInput::make('description')
                                ->required(),
                        ])
                        ->columns(2),

                  Forms\Components\Section::make([
                    Repeater::make('features')
                    ->simple(
                        TextInput::make('feature')->required()
                    )
                    ->addActionLabel('Add Feature')
                    ]),
                ])
                ->columnSpan(['lg' => 2]),

            Forms\Components\Group::make()
                ->schema([
                    Forms\Components\Section::make('Price (ETB)')
                    ->description('enter any negative numbere for custom pricing.')
                        ->schema([
                            Forms\Components\TextInput::make('price')
                                ->numeric()
                                ->default(0)
                                ->required()
                                ->live()
                                ->helperText(function ($state) {
                                    if ($state < 0) return new HtmlString('<strong>custom pricing</strong>');
                                    if($state == 0) return new HtmlString('<strong>Free forever</strong>');
                                    return new HtmlString('ETB ' . $state);
                                }),
                        ]),
                    Forms\Components\Section::make('Limit')
                    ->description('use any negative number for unlimited')
                        ->schema([
                        //hind for all the 4 fiels and display up to  and the input tag value 
                            Forms\Components\TextInput::make('number_of_digital_business_card')
                                ->numeric()
                                ->required()
                                ->live()
                                ->helperText(function ($state) {
                                    if ($state === null) return '';
                                    if ($state < 0) return new HtmlString('<strong>Unlimited</strong> digital business cards');
                                    if ($state === 0) return new HtmlString('<strong>No</strong> digital business cards allowed');
                                    return new HtmlString('Up to <strong>' . $state . '</strong> digital business ' . ($state === 1 ? 'card' : 'cards'));
                                }),
                            
                            Forms\Components\TextInput::make('number_of_gallery')
                                ->numeric()
                                ->required()
                                ->live()
                                ->helperText(function ($state) {
                                    if ($state === null) return '';
                                    if ($state < 0) return new HtmlString('<strong>Unlimited</strong> galleries');
                                    if ($state === 0) return new HtmlString('<strong>No</strong> galleries allowed');
                                    return new HtmlString('Up to <strong>' . $state . '</strong> ' . ($state === 1 ? 'gallery' : 'galleries'));
                                }),
                            Forms\Components\TextInput::make('number_of_service')
                                ->numeric()
                                ->required()
                                ->live()
                                ->helperText(function ($state) {
                                    if ($state === null) return '';
                                    if ($state < 0) return new HtmlString('<strong>Unlimited</strong> services');
                                    if ($state === 0) return new HtmlString('<strong>No</strong> services allowed');
                                    return new HtmlString('Up to <strong>' . $state . '</strong> ' . ($state === 1 ? 'service' : 'services'));
                                }),
                            Forms\Components\TextInput::make('number_of_nfc_business_card')
                                ->numeric()
                                ->required()
                                ->live()
                                ->helperText(function ($state) {
                                    if ($state === null) return '';
                                    if ($state < 0) return new HtmlString('<strong>Unlimited</strong> NFC business cards');
                                    if ($state === 0) return new HtmlString('<strong>No</strong> NFC business cards allowed');
                                    return new HtmlString('Up to <strong>' . $state . '</strong> NFC business ' . ($state === 1 ? 'card' : 'cards'));
                                }),
                        ]),

                    Forms\Components\Section::make('Most Popular')
                        ->schema([

                            Forms\Components\Checkbox::make('most_popular')
                                ->label('Most Popular')
                                ->helperText('Mark this plan as the most popular option')
                                ->default(false),
                                
                            Forms\Components\Checkbox::make('custom_url')
                                ->label('Custom URL')
                                ->helperText(new HtmlString('Allow customers to use custom URLs like mulucard.com/hello/<strong>tamrat</strong>'))
                                ->default(false)
                        ]),
                ])
                ->columnSpan(['lg' => 1]),
        ])
        ->columns(3);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                Tables\Columns\TextColumn::make('name')
                    ->searchable()
                    ->sortable()
                    ->weight('bold'),
                Tables\Columns\TextColumn::make('description')
                    ->searchable()
                    ->limit(50)
                    ->tooltip(function (Tables\Columns\TextColumn $column): ?string {
                        $state = $column->getState();
                        if (strlen($state) <= 50) {
                            return null;
                        }
                        return $state;
                    }),
                Tables\Columns\TextColumn::make('price')
                    ->sortable()
                    ->formatStateUsing(fn (int $state): string => match(true) {
                        $state === 0 => 'Free',
                        $state < 0 => 'Custom Price',
                        default => 'ETB ' . number_format($state)
                    })
                    ->alignment('center'),
                Tables\Columns\IconColumn::make('most_popular')
                    ->boolean()
                    ->label('Popular')
                    ->alignCenter(),
                Tables\Columns\IconColumn::make('custom_url')
                    ->boolean()
                    ->label('Custom URL')
                    ->alignCenter(),
                Tables\Columns\TextColumn::make('features')
                    ->badge()
                    ->separator(',')
                    ->color('success'),
                Tables\Columns\IconColumn::make('deleted_at')
                    ->label('Visibility')
                    ->boolean()
                    ->trueColor('danger')
                    ->falseColor('success')
                    ->trueIcon('heroicon-o-eye-slash')
                    ->falseIcon('heroicon-o-eye')
                    ->getStateUsing(fn ($record): bool => $record->deleted_at !== null)
                    ->alignCenter(),
                Tables\Columns\TextColumn::make('created_at')
                    ->label('Created At')
                    ->dateTime()
                    ->sortable()
                    ->alignCenter(),
                Tables\Columns\TextColumn::make('updated_at')
                    ->label('Updated At')
                    ->dateTime()
                    ->sortable()
                    ->alignCenter(),
                Tables\Columns\TextColumn::make('number_of_nfc_business_card')
                    ->label('NFC Business Cards')
                    ->sortable()
                    ->alignCenter()
                    ->formatStateUsing(fn (int $state): string => match(true) {
                        $state === 0 => 'No',
                        $state < 0 => 'Unlimited',
                        default => $state   
                    }),
                Tables\Columns\TextColumn::make('number_of_digital_business_card')
                    ->label('Digital Business Cards')
                    ->sortable()
                    ->alignCenter()
                    ->formatStateUsing(fn (int $state): string => match(true) {
                        $state === 0 => 'No',
                        $state < 0 => 'Unlimited',
                        default => $state
                    }),
                Tables\Columns\TextColumn::make('number_of_gallery')
                    ->label('Galleries')
                    ->sortable()
                    ->alignCenter()
                    ->formatStateUsing(fn (int $state): string => match(true) {
                        $state === 0 => 'No',
                        $state < 0 => 'Unlimited',
                        default => $state
                    }),
                Tables\Columns\TextColumn::make('number_of_service')
                    ->label('Services')
                    ->sortable()
                    ->alignCenter()
                    ->formatStateUsing(fn (int $state): string => match(true) {
                        $state === 0 => 'No',
                        $state < 0 => 'Unlimited',
                        default => $state
                    }),
            ])
            ->filters([
                Tables\Filters\TernaryFilter::make('deleted_at')
                    ->label('Visibility')
                    ->placeholder('All Plans')
                    ->trueLabel('Hidden Plans')
                    ->falseLabel('Visible Plans')
                    ->queries(
                        true: fn (Builder $query) => $query->onlyTrashed(),
                        false: fn (Builder $query) => $query->withoutTrashed(),
                        // null: fn (Builder $query) => $query->withTrashed()
                    )
            ])
            ->actions([
                Tables\Actions\ViewAction::make(),
                Tables\Actions\EditAction::make(),
                Tables\Actions\RestoreAction::make(),
                Tables\Actions\DeleteAction::make()
                    ->successNotificationTitle('Plan hidden successfully')
            ])
            ->bulkActions([
                Tables\Actions\BulkActionGroup::make([
                    Tables\Actions\DeleteBulkAction::make(),
                    Tables\Actions\RestoreBulkAction::make(),
                ])
            ])
            ->defaultSort('created_at', 'desc');
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
