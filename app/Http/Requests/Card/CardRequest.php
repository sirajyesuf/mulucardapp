<?php

namespace App\Http\Requests\Card;

use Illuminate\Foundation\Http\FormRequest;
use App\Enums\CardSocialLinks;

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

        $serviceLimit = request()->user()->activeSubscription()->with('plan')->first()->plan->number_of_service;
        $galleryLimit = request()->user()->activeSubscription()->with('plan')->first()->plan->number_of_gallery;

        return [
                'banner.file' => 'required|image|max:2048|dimensions:max_width=1200,max_height=313',
                'avatar.file' => 'required|image|max:2048',
                'logo.file' => 'required|image|max:2048',
                'first_name' => 'required|string|max:255',
                'last_name' => 'required|string|max:255',
                'organization' => 'required|string|max:255',
                'job_title' => 'required|string|max:255',
                'banner_color' => 'required|string|regex:/^#[0-9A-F]{6}$/i',
                'links' => 'array|max:100',
                'links.*.name' => 'required|string|max:255',
                'links.*.url' => "nullable|url:https",
                'phone' => 'required|string|max:255',
                'email' => 'required|string|email|max:255',
                'headline' => 'required|string|max:255',
                'address' => 'nullable|string|max:255',
                'location' => 'nullable|string|max:255',
                'business_hours_enabled' => 'required|boolean',
                'business_hours' => 'required_if:business_hours_enabled,true|array|max:7',
                'business_hours.*.day' => 'required|string',
                'business_hours.*.isOpen' => 'required|boolean',
                'business_hours.*.open' => 'required|date_format:H:i',
                'business_hours.*.close' => 'required|date_format:H:i',

                //validation for galleries
                'galleries' => [
                    'nullable',
                    'array',
                    function($attribute, $value, $fail)  use ($galleryLimit){
                        if ($galleryLimit >= 0 && count($value) > $galleryLimit) {
                            $fail("Your plan allows up to {$galleryLimit} galleries.");
                        }
                    }
                ],
                'galleries.*.file' => 'required|image|max:2048',
                'galleries.*.path' => 'required|string|max:255',
                'galleries.*.description' => 'required|string|max:500',

                // //validation for services
                'services' => [
                    'nullable',
                    'array',
                    function($attribute, $value, $fail) use($serviceLimit) {
                        if ($serviceLimit >= 0 && count($value) > $serviceLimit) {
                            $fail("Your plan allows up to {$serviceLimit} services.");
                        }
                    }
                ],
                'services.*.file' => 'required|image|max:2048',
                'services.*.path' => 'required|string',
                'services.*.name' => 'required|string',
                'services.*.description' => 'required|string|max:500'

        ];

    }



    public function messages(): array
    {
            $dayNames = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
            $links = CardSocialLinks::links();
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


            if(isset(request()->galleries)) {
                foreach(request()->galleries as $index => $gallery) {
                    $gallery_messages["galleries.{$index}.file.required"] = "the image file is required.";
                    $gallery_messages["galleries.{$index}.description.required"] = "Please enter a description.";
                }
            }

            if(isset(request()->services)) {
                foreach(request()->services as $index => $service) {
                    $services_messages["services.{$index}.file.required"] = "the image file is required";
                    $services_messages["services.{$index}.name.required"] = "the name field is required";
                    $services_messages["services.{$index}.description.required"] =  "the description field is required";
                }
            }

        // --- Generate Link Messages Dynamically ---
        // Iterate over the actual submitted links data
        foreach ($this->input('links', []) as $index => $linkData) {
            // Use the 'name' from the submitted data, default to generic if 'name' is missing
            $linkName = $linkData['name'] ?? "Link #{$index}";
            // Capitalize first letter for display
            $linkNameDisplay = ucfirst($linkName);

            // Key format: links.index.field.rule
            $requiredKey = "links.{$index}.url.required";
            $urlKey = "links.{$index}.url.url";

            $links_messages[$requiredKey] = "The {$linkNameDisplay} URL is required.";
            $links_messages[$urlKey] = "The {$linkNameDisplay} URL must be a valid URL starting with https://.";
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
