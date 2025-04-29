<?php

namespace App\Filament\Resources\OrderResource\Pages;

use App\Filament\Resources\OrderResource;
use Filament\Actions;
use Filament\Resources\Pages\CreateRecord;
use Filament\Notifications\Notification;
use App\Enums\OrderStatus;
use App\Models\Plan;

class CreateOrder extends CreateRecord
{
    protected static string $resource = OrderResource::class;

    protected function mutateFormDataBeforeCreate(array $data): array
    {       
        $data['order_number'] = uniqid();
        $data['status'] = OrderStatus::PENDING;

        $freePlan = Plan::where('price', '=', 0)->first();
        $freePlanId = $freePlan ? $freePlan->id : null;

        if ($freePlanId !== null && isset($data['plan_id']) && $data['plan_id'] == $freePlanId) {
            $data['payment_ref'] = 'Automatically Generated Reference Number';
        }

        return $data;
    }

    protected function getCreatedNotification(): ?Notification
    {
        return Notification::make()
            ->success()
            ->title('Order created')
            ->body('The order has been created successfully.');
    }

    protected function getRedirectUrl(): string
    {
        return $this->getResource()::getUrl('index');
    }
}
