<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

use App\Http\Controllers\CardController;
use App\Http\Controllers\DashboardController;


Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {

    Route::get('dashboard',[DashboardController::class,"index"])->name("dashboard");

});


Route::middleware(['auth'])->group(function(){

    Route::get('card/create',[CardController::class,"create"])->name("card.create");
    Route::post('card/create',[CardController::class,"store"])->name("card.store");
    Route::get('card/{url}',[CardController::class,"show"])->name("card.show");

});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
