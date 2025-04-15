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
        // return $form
        //     ->schema([
        //         Forms\Components\TextInput::make('name'),
        //         Forms\Components\TextInput::make('description'),
        //         Forms\Components\Section::make([
        //             Forms\Components\Select::make('type')
        //             ->options([
        //                 'free' => 'Free',
        //                 'professional' => 'Professional',
        //                 'enterprise' => 'Enterprise'
        //             ])
        //             ->live(),
        //             Forms\Components\TextInput::make('price')
        //             ->visible(fn (Get $get): bool =>  $get('type') != 'free'),

        //         ]),

        //         Forms\Components\Section::make("limit")
        //         ->description('Prevent abuse by limiting the number of requests per period')
        //         ->schema([

        //         // Number of VCards
        //         Forms\Components\Section::make('VCard Limit')
        //             ->schema([
        //                 Checkbox::make('unlimited_vcard')
        //                     ->label('Unlimited VCard')
        //                     ->live()
        //                     ->afterStateUpdated(function ($state, callable $set) {
        //                         if ($state) {
        //                             $set('number_of_vcard', null); // Set to NULL for unlimited
        //                         }
        //                     }),
        //                 TextInput::make('number_of_vcard')
        //                     ->numeric()
        //                     ->minValue(0)
        //                     ->default(0)
        //                     ->disabled(fn ($get) => $get('unlimited_vcard'))
        //                     ->dehydrated(fn ($get) => !$get('unlimited_vcard')), // Only save if not unlimited
        //             ]),
        //         // Number of Galleries
        //         Forms\Components\Section::make('Gallery Limit')
        //             ->schema([
        //                 Checkbox::make('unlimited_gallery')
        //                     ->label('Unlimited Galleries')
        //                     ->live()
        //                     ->afterStateUpdated(function ($state, callable $set) {
        //                         if ($state) {
        //                             $set('number_of_gallery', null); // Set to NULL for unlimited
        //                         }
        //                     }),
        //                 TextInput::make('number_of_gallery')
        //                     ->numeric()
        //                     ->minValue(0)
        //                     ->default(0)
        //                     ->disabled(fn ($get) => $get('unlimited_gallery'))
        //                     ->dehydrated(fn ($get) => !$get('unlimited_gallery')), // Only save if not unlimited
        //             ]),

        //         // number of services
        //         Forms\Components\Section::make('Service Limit')
        //             ->schema([
        //                 Checkbox::make('unlimited_service')
        //                     ->label('Unlimited Services')
        //                     ->live()
        //                     ->afterStateUpdated(function ($state, callable $set) {
        //                         if ($state) {
        //                             $set('number_of_service', null); // Set to NULL for unlimited
        //                         }
        //                     }),
        //                 TextInput::make('number_of_service')
        //                     ->numeric()
        //                     ->minValue(0)
        //                     ->default(0)
        //                     ->disabled(fn ($get) => $get('unlimited_service'))
        //                     ->dehydrated(fn ($get) => !$get('unlimited_service')), // Only save if not unlimited
        //             ]),
        //         // number of nfc business cards
        //         Forms\Components\Section::make('NFC Business Card Limit')
        //             ->schema([
        //                 Checkbox::make('unlimited_nfc_business_card')
        //                     ->label('Unlimited NFC Business Cards')
        //                     ->live()
        //                     ->afterStateUpdated(function ($state, callable $set) {
        //                         if ($state) {
        //                             $set('number_of_nfc_business_card', null); // Set to NULL for unlimited
        //                         }
        //                     }),
        //                 TextInput::make('number_of_nfc_business_card')
        //                     ->numeric()
        //                     ->minValue(0)
        //                     ->default(0)
        //                     ->disabled(fn ($get) => $get('unlimited_nfc_business_card'))
        //                     ->dehydrated(fn ($get) => !$get('unlimited_nfc_business_card')), // Only save if not unlimited
        //             ]),
        //         ])
        //             ->collapsible()
        //             ->persistCollapsed()
        //             ->compact(),

        //         Forms\Components\Section::make([
        //             Repeater::make('features')
        //             ->simple(
        //                 TextInput::make('feature')->required()
        //             )
        //             ->addActionLabel('Add Feature')
        //         ])

        //     ]);
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

                    // Forms\Components\Section::make('Pricing')
                    //     ->schema([
                    //         Forms\Components\TextInput::make('price')
                    //             ->numeric()
                    //             ->rules(['regex:/^\d{1,6}(\.\d{0,2})?$/'])
                    //             ->required(),

                    //         Forms\Components\TextInput::make('old_price')
                    //             ->label('Compare at price')
                    //             ->numeric()
                    //             ->rules(['regex:/^\d{1,6}(\.\d{0,2})?$/'])
                    //             ->required(),

                    //         Forms\Components\TextInput::make('cost')
                    //             ->label('Cost per item')
                    //             ->helperText('Customers won\'t see this price.')
                    //             ->numeric()
                    //             ->rules(['regex:/^\d{1,6}(\.\d{0,2})?$/'])
                    //             ->required(),
                    //     ])
                    //     ->columns(2),
                    // Forms\Components\Section::make('Inventory')
                    //     ->schema([
                    //         Forms\Components\TextInput::make('sku')
                    //             ->label('SKU (Stock Keeping Unit)')
                    //             ->unique(Product::class, 'sku', ignoreRecord: true)
                    //             ->maxLength(255)
                    //             ->required(),

                    //         Forms\Components\TextInput::make('barcode')
                    //             ->label('Barcode (ISBN, UPC, GTIN, etc.)')
                    //             ->unique(Product::class, 'barcode', ignoreRecord: true)
                    //             ->maxLength(255)
                    //             ->required(),

                    //         Forms\Components\TextInput::make('qty')
                    //             ->label('Quantity')
                    //             ->numeric()
                    //             ->rules(['integer', 'min:0'])
                    //             ->required(),

                    //         Forms\Components\TextInput::make('security_stock')
                    //             ->helperText('The safety stock is the limit stock for your products which alerts you if the product stock will soon be out of stock.')
                    //             ->numeric()
                    //             ->rules(['integer', 'min:0'])
                    //             ->required(),
                    //     ])
                    //     ->columns(2),

                    // Forms\Components\Section::make('Shipping')
                    //     ->schema([
                    //         Forms\Components\Checkbox::make('backorder')
                    //             ->label('This product can be returned'),

                    //         Forms\Components\Checkbox::make('requires_shipping')
                    //             ->label('This product will be shipped'),
                    //     ])
                    //     ->columns(2),
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
                    ->money('ETB')
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
                ]),
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
