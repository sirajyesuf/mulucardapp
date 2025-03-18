<?php

namespace App\Http\Requests\Card;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;
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
                    'avatar.file' => 'required|image|max:2048',
                    'logo.file' => 'required|image|max:2048',
                    'first_name' => 'required|string|max:255',
                    'last_name' => 'required|string|max:255',
                    'organization' => 'required|string|max:255',
                    'job_title' => 'required|string|max:255',
                    'banner_color' => 'required|string|regex:/^#[0-9A-F]{6}$/i',
                    'links' => 'required|array|max:6',
                    'links.*.name' => [
                    'required',
                    'string',
                    Rule::in(['website', 'facebook', 'twitter', 'instagram', 'linkedin', 'youtube']),
                    ],
                    'links.*.url' => "nullable|url:https",
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
                    'galleries.*.file' => 'required|file|image|max:2048',
                    'galleries.*.description' => 'required|string|max:500',
                    'services' => 'required|array',
                    'services.*.file' => 'required|images|max:2048',
                    'services.*.name' => 'required|string',
                    'services.*.description' => 'required|string|max:500'

            ];

    }

    protected function validateLinkValue(): callable
    {
            return function ($attribute, $value, $fail) {
                $index = explode('.', $attribute)[1];
                $name = $this->input("links.{$index}.name");

                if ($value) {
                    switch ($name) {
                        default:
                            if (!filter_var($value, FILTER_VALIDATE_URL)) {
                                $fail("The {$name} must be a valid URL.");
                            }
                            break;
                    }
                }
            };
        }

        public function messages(): array
        {
                $dayNames = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
                $business_messages = [];
                $gallery_messages = [];
                $services_messages = [];

                // Generate custom messages for each day in business_hours
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

                foreach(request()->services as $index => $gallery) {
                    $services_messages["services.{$index}.file.required"] = "the image file is required";
                    $services_messages["services.{$index}.name.required"] = "the name field is required";
                    $services_messages["services.{$index}.description.required"] =  "the description field is required";

                }



                
                return [
                'avatar.file.required' => 'The avatar file is required.',
                'avatar.file.image' => 'The avatar file must be a valid image file.',
                'avatar.file.max' => 'The avatar file size must not exceed 2MB.',

                'logo.file.required' => 'The logo file is required.',
                'logo.file.image' => 'The logo file must be a valid image file.',
                'logo.file.max' => 'The logo file size must not exceed 2MB.',
                ... $business_messages,
                ...$gallery_messages,
                ...$services_messages




                ];
            }
}
