<?php

namespace App\Policies;

use App\Models\Card;
use App\Models\User;
use App\Models\Subscription;
use Illuminate\Auth\Access\Response;
use Illuminate\Support\Facades\DB;

class CardPolicy
{
    /**
     * Determine whether the user can view any models.
     */
    public function viewAny(User $user): bool
    {
        return true;
    }

    /**
     * Determine whether the user can view the model.
     */
    public function view(User $user, Card $card): bool
    {
        return $user->id === $card->user_id;
    }

    /**
     * Determine whether the user can create models.
     */
    public function create(User $user): Response
    {
        // Get user's active subscription
        $subscription = Subscription::where('user_id', $user->id)
            ->where('status', 'active')
            ->first();

        if (!$subscription) {
            return Response::deny('You need an active subscription to create digital business cards.');
        }

        // Get the number of cards already created
        $existingCardsCount = Card::where('user_id', $user->id)->count();

        // Get the plan limit
        $planLimit = $subscription->plan->number_of_digital_business_card;

        // If planLimit is negative, it means unlimited
        if ($planLimit < 0) {
            return Response::allow();
        }

        // Check if user has reached their plan limit
        if ($existingCardsCount >= $planLimit) {
            return Response::deny(
                "You've reached your plan's limit of {$planLimit} digital business cards. "
                . "Please upgrade your plan to create more cards."
            );
        }

        return Response::allow();
    }

    /**
     * Determine whether the user can update the model.
     */
    public function update(User $user, Card $card): bool
    {
        return $user->id === $card->user_id;
    }

    /**
     * Determine whether the user can delete the model.
     */
    public function delete(User $user, Card $card): bool
    {
        return $user->id === $card->user_id;
    }

    /**
     * Determine whether the user can restore the model.
     */
    public function restore(User $user, Card $card): bool
    {
        return false;
    }

    /**
     * Determine whether the user can permanently delete the model.
     */
    public function forceDelete(User $user, Card $card): bool
    {
        return false;
    }
}
