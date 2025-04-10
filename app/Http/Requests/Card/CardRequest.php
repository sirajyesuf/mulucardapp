<?php

namespace App\Http\Requests\Card;

use Illuminate\Foundation\Http\FormRequest;


class CardRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {

        return [
                'banner.file' => 'required|image|max:2048|dimensions:max_width=1200,max_height=313',
                'avatar.file' => 'required|image|max:2048',
                'logo.file' => 'required|image|max:2048',
                'first_name' => 'required|string|max:255',
                'last_name' => 'required|string|max:255',
                'organization' => 'required|string|max:255',
                'job_title' => 'required|string|max:255',
                'banner_color' => 'required|string|regex:/^#[0-9A-F]{6}$/i',
                'links' => 'required|array|max:6',
                'links.*.name' => 'required|string|max:255',
                'links.*.url' => "required|url:https",
                'phone' => 'required|string|max:255',
                'email' => 'required|string|email|max:255',
                'headline' => 'required|string|max:255',
                'address' => 'required|string|max:255',
                'location' => 'required|string|max:255',
                'business_hours' => 'required|array|max:7',
                'business_hours.*.day' => 'required|string',
                'business_hours.*.isOpen' => 'required|boolean',
                'business_hours.*.open' => 'required|date_format:H:i',
                'business_hours.*.close' => 'required|date_format:H:i',
                'galleries' => 'required|array',
                'galleries.*.file' => 'required|image|max:2048',
                'galleries.*.description' => 'required|string|max:500',
                'services' => 'required|array',
                'services.*.file' => 'required|image|max:2048',
                'services.*.name' => 'required|string',
                'services.*.description' => 'required|string|max:500'

        ];

    }



    public function messages(): array
    {
            $dayNames = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
            $links = ['Website','Facebook', 'Twitter', 'Instagram', 'LinkedIn', 'YouTube'];
            $business_messages = [];
            $gallery_messages = [];
            $services_messages = [];
            $links_messages = [];



            foreach ($dayNames as $index => $dayName) {
                $business_messages["business_hours.{$index}.open.required"] = "Please select an opening time for {$dayName}.";
                $business_messages["business_hours.{$index}.close.required"] = "Please select a closing time for {$dayName}.";
                $business_messages["business_hours.{$index}.open.date_format"] = "The opening time for {$dayName} must be in HH:MM format (e.g., 09:00).";
                $business_messages["business_hours.{$index}.close.date_format"] = "The closing time for {$dayName} must be in HH:MM format (e.g., 17:00).";
            }


            foreach(request()->galleries as $index => $gallery) {
                $gallery_messages["galleries.{$index}.file.required"] = "the image file is required.";
                $gallery_messages["galleries.{$index}.description.required"] = "Please enter a description.";
            }

            foreach(request()->services as $index => $service) {
                $services_messages["services.{$index}.file.required"] = "the image file is required";
                $services_messages["services.{$index}.name.required"] = "the name field is required";
                $services_messages["services.{$index}.description.required"] =  "the description field is required";

            }

            foreach($links as $index => $link) {
                $links_messages["links.{$index}.url.required"] = "The {$link} field is required.";
            }




            return [
            'banner.file.required' => 'The banner field is required.',
            'banner.file.image' => 'The banner field must be a valid image file.',
            'banner.file.max' => 'The banner file size must not exceed 2MB.',
            'banner.file.dimensions' => 'The banner image dimensions must be 1200x313.',
            'avatar.file.required' => 'The avatar field is required.',
            'avatar.file.image' => 'The avatar field must be a valid image file.',
            'avatar.file.max' => 'The avatar file size must not exceed 2MB.',

            'logo.file.required' => 'The logo field is required.',
            'logo.file.image' => 'The logo field must be a valid image file.',
            'logo.file.max' => 'The logo field size must not exceed 2MB.',
            ... $business_messages,
            ...$gallery_messages,
            ...$services_messages,
            ...$links_messages




            ];
        }
}
