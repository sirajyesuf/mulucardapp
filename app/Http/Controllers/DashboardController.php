<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use auth;
use App\Http\Resources\CardResource;
use App\Enums\CardStatus;
use Illuminate\Http\Request;

class DashboardController extends Controller
{
    public function index()
    {

        $cards = auth()->user()->cards()->with('socialLinks','galleries','services')->get();


        $cardsCollection =  CardResource::collection($cards);
        $activeCards = $cardsCollection->where('status', CardStatus::Active);
        $inactiveCards = $cardsCollection->where('status', CardStatus::InActive);

        $reports = [
            'total_cards' => $cardsCollection->count(),
            'active_cards' => $activeCards->count(),
            'inactive_cards' => $inactiveCards->count()
        ];
        return Inertia::render('dashboard', ['cards' => $cardsCollection,'reports' => $reports]);
    }


    public function markNotificationAsRead($id) {
        $notification = auth()->user()->notifications()->where('id', $id)->first();

        if ($notification) {
            $notification->markAsRead();
        }
        return redirect()->back();


    }


    public function markAllNotificationAsRead(Request $request) {

        foreach ($request->notificationsIds as $id) {
            $notification = auth()->user()->notifications()->where('id', $id)->first();
            if ($notification) {
                $notification->markAsRead();
            }
        }
        return redirect()->back();
    }

}
