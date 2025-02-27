<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

use App\Http\Controllers\CardController;


Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {

    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');
});


Route::middleware(['auth'])->group(function(){

    Route::get('card/create',[CardController::class,"create"])->name("card.create");
    Route::post('card/create',[CardController::class,"store"])->name("card.store");

});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
