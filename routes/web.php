<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

use App\Http\Controllers\CardController;
use App\Http\Controllers\DashboardController;
use App\Models\Card;



require __DIR__.'/settings.php';
require __DIR__.'/auth.php';

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');



Route::middleware(['auth'])->group(function(){

    Route::get('dashboard',[DashboardController::class,"index"])->name("dashboard");

    Route::get('card/create',[CardController::class,"create"])->name("card.create");
    Route::post('card/create',[CardController::class,"store"])->name("card.store");
    Route::get('card/{url}',[CardController::class,"show"])->name("card.show");
    Route::get('card/{id}/edit',[CardController::class,"edit"])->name("card.edit");
    Route::post('card/{id}/update',[CardController::class,"update"])->name("card.update");
    Route::post('card/{id}/personalizedURL',[CardController::class,"personalizedURL"])->name("card.personalizedurl");
    Route::get('card/{id}/delete',[CardController::class,"delete"])->name("card.delete");

});


Route::get("hello/{url}",function($url){
    $card = Card::first();
    return Inertia::render('hello',["url"=>$url,"card"=>$card]);
})->name("card.hello");
