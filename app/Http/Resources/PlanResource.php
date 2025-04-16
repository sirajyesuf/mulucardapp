<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class PlanResource extends JsonResource
{
  
    public function toArray(Request $request): array
    {
        return [
            'id' =>  $this->id,
            'name' => $this->name,
            'description' => $this->description,
            'features' => $this->features,
            'price' => $this->price,
            'number_of_digital_business_card' =>  $this->number_of_digital_business_card,
            'number_of_gallery' => $this->number_of_gallery,
            'number_of_service' =>  $this->number_of_service,
            'number_of_nfc_business_card' =>  $this->number_of_nfc_business_card,
            'most_popular' => $this->most_popular,
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
            'deleted_at' => $this->deleted_at,
        ];
    }
}
