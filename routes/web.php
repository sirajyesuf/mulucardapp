<?php

use Illuminate\Support\Facades\Route;

use App\Http\Controllers\CardController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\HelloController;
use Inertia\Inertia;
use App\Http\Controllers\LandingPageController;


require __DIR__.'/settings.php';
require __DIR__.'/auth.php';


Route::get('/',[LandingPageController::class,"index"])->name("home");




Route::middleware(['auth'])->group(function(){

    Route::get('dashboard',[DashboardController::class,"index"])->name("dashboard");

    Route::get('card/create',[CardController::class,"create"])->name("card.create");
    Route::post('card/create',[CardController::class,"store"])->name("card.store");
    Route::get('card/{url}',[CardController::class,"show"])->name("card.show");
    Route::get('card/{id}/edit',[CardController::class,"edit"])->name("card.edit");
    Route::post('card/{id}/update',[CardController::class,"update"])->name("card.update");
    Route::get('card/{id}/delete',[CardController::class,"delete"])->name("card.delete");
    Route::post('card/{id}/settings',[CardController::class,"settings"])->name("card.settings");

});


Route::get("/hello/{url}",[HelloController::class,"index"])->name("card.hello");
Route::get('/card/{id}/vcard', [CardController::class, 'downloadVCard'])->name('card.vcard');
