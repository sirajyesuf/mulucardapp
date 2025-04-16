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
            'cardname' => $this->cardname,
            'url' => url(route('card.hello', $this->url)),
            'status' => $this->status,
            'banner' => [
                'file' => null,
                'path' => $this->banner ? url($this->banner) : null
            ],
            'avatar' => [
                'file' => null,
                'path' => $this->avatar ? url($this->avatar) : null
            ],
            'logo' => [
                'file' => null,
                'path' => $this->logo ? url($this->logo) : null
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
            'services' => $this->services->map(function ($service) {
                return [
                    'id' => $service->id,
                    'name' => $service->name,
                    'description' => $service->description,
                    'file' => null,
                    'path' => $service->path ? url($service->path) : null
                ];
            }),
            'galleries' => $this->galleries->map(function ($gallery) {
                return [
                    'id' => $gallery->id,
                    'description' => $gallery->description,
                    'file' => null,
                    'path' => $gallery->path ? url($gallery->path) : null
                ];
            }),
            'qr_code' => $this->qr_code,
            'address' => $this->address,
            'location' => $this->location,
            'business_hours' => $this->business_hours,
            'total_views' => $this->total_views,
            'total_saves' => $this->total_saves
        ];
    }
}
