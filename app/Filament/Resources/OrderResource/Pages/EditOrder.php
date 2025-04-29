<?php

namespace App\Filament\Resources\OrderResource\Pages;

use App\Filament\Resources\OrderResource;
use Filament\Actions;
use Filament\Resources\Pages\EditRecord;
use App\Models\Plan;

class EditOrder extends EditRecord
{
    protected static string $resource = OrderResource::class;

    protected function getHeaderActions(): array
    {
        return [
            Actions\DeleteAction::make(),
        ];
    }

    protected function mutateFormDataBeforeSave(array $data): array
    {
        $freePlan = Plan::where('price', '=', 0)->first();
        $freePlanId = $freePlan ? $freePlan->id : null;

        // If the selected plan is the free plan, ensure the payment_ref is set.
        if ($freePlanId !== null && isset($data['plan_id']) && $data['plan_id'] == $freePlanId) {
            $data['payment_ref'] = 'Automatically Generated Reference Number';
        }
        // Otherwise (not the free plan), we rely on the form validation ensuring
        // 'payment_ref' was submitted correctly, as the field should be enabled/required.

        return $data;
    }
}
