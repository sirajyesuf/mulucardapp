<?php

use Illuminate\Support\Facades\Route;

use App\Http\Controllers\CardController;
use App\Http\Controllers\CheckoutController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\HelloController;
use Inertia\Inertia;
use App\Http\Controllers\LandingPageController;
use App\Http\Middleware\RestrictAdminFromCustomerPortal;

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';


Route::get('/',[LandingPageController::class,"index"])->name("home");




Route::middleware(['auth',RestrictAdminFromCustomerPortal::class])->group(function(){

    Route::get('dashboard',[DashboardController::class,"index"])->name("dashboard");

    //notification
    Route::post('/dashboard/mark-notification-as-read/{id}', [DashboardController::class, "markNotificationAsRead"])->name("dashboard.marknotificationasread");
    Route::post('/dashboard/mark-all-as-read', [DashboardController::class, "markAllNotificationAsRead"])->name("dashboard.markallasread");

    Route::get('card/create',[CardController::class,"create"])->name("card.create");
    Route::post('card/create',[CardController::class,"store"])->name("card.store");
    Route::get('card/{id}',[CardController::class,"show"])->name("card.show");
    Route::get('card/{id}/edit',[CardController::class,"edit"])->name("card.edit");
    Route::post('card/{id}/update',[CardController::class,"update"])->name("card.update");
    Route::get('card/{id}/delete',[CardController::class,"delete"])->name("card.delete");
    Route::post('card/{id}/settings',[CardController::class,"settings"])->name("card.settings");

    Route::get('/checkout/{plan}',[CheckoutController::class,"index"])->name("checkout");
    Route::post('/checkout/{plan}/order',[CheckoutController::class,"store"])->name("checkout.order");
});


Route::post('card/{id}/updatetotalsaves',[CardController::class,"updateTotalSaves"])->name("card.updatetotalsaves");
Route::get("/hello/{url}",[HelloController::class,"index"])->name("card.hello");
Route::get("/privacy-policy",function(){
    return Inertia::render('privacypolicy');
})->name("privacy-policy");

Route::get("/terms",function(){
    return Inertia::render('terms');
})->name("terms");
