<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class CardResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'url' => $this->url,
            'avatar' => [
            'file' => null,
            'path' => $this->avatar
            ],
            'logo' => [
            'file' => null,
            'path' => $this->logo
            ],
            'user_id' => $this->user_id,
            'first_name' => $this->first_name,
            'last_name' => $this->last_name,
            'organization' => $this->organization,
            'job_title' => $this->job_title,
            'email' => $this->email,
            'phone' => $this->phone,
            'banner_color' => $this->banner_color,
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
            'links' => $this->socialLinks,
            'headline' => $this->headline,
            'services' => $this->services,
            'galleries' => $this->galleries,
            'qr_code' => $this->qr_code
        ];
    }
}
