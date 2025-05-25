<?php

namespace App\Http\Requests\Card;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;
use App\Enums\CardSocialLinks;
class UpdateCardRequest extends FormRequest
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
                'banner.file' => 'nullable|image|max:2048',
                'banner.path' => 'required_if:banner.file,null|string',
                'avatar.file' => 'nullable|image|max:2048',
                'avatar.path' => 'required_if:avatar.file,null|string',
                'logo.file' => 'nullable|image|max:2048',
                'logo.path' => 'required_if:logo.file,null|string',
                'banner_color' => 'nullable|string|regex:/^#[0-9A-F]{6}$/i', 

                'first_name' => 'required|string|max:255',
                'last_name' => 'required|string|max:255',
                'email' => 'required|string|email|max:255',
                'phone' => 'required|string|max:255',
                'organization' => 'required|string|max:255',
                'job_title' => 'required|string|max:255',
                'headline' => 'required|string|max:255',
                'address' => 'nullable|string|max:255',
                'location' => 'nullable|string|max:255',

                'links' => 'nullable|array|max:100',
                'links.*.name' => 'required_with:links.*.url|string|max:255',
                'links.*.url' => "required_with:links.*.name|url:https",
            
            
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
                'galleries.*.id' => 'required',
                'galleries.*.file' => 'nullable|image|max:2048',
                'galleries.*.path' => 'nullable|string|max:255',
                'galleries.*.description' => 'required|string|max:500',


                //validation for services
                'services' => [
                    'nullable',
                    'array',
                    function($attribute, $value, $fail) use($serviceLimit) {
                        if ($serviceLimit >= 0 && count($value) > $serviceLimit) {
                            $fail("Your plan allows up to {$serviceLimit} services.");
                        }
                    }
                ],
                'services.*.id' => 'required',
                'services.*.file' => [
                'nullable',
                'image',
                'max:2048',
                ],
                'services.*.path' => 'required|string|max:255',
                'services.*.name' => 'required|string',
                'services.*.description' => 'required|string|max:500'
            ];

    }

    public function messages(): array
    {
            // $dayNames = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
            $links = CardSocialLinks::links();
            // $business_messages = [];
            $gallery_messages = [];
            $services_messages = [];
            $links_messages = [];

            // foreach ($dayNames as $index => $dayName) {
            //     $business_messages["business_hours.{$index}.open.required"] = "Please select an opening time for {$dayName}.";
            //     $business_messages["business_hours.{$index}.close.required"] = "Please select a closing time for {$dayName}.";
            //     $business_messages["business_hours.{$index}.open.date_format"] = "The opening time for {$dayName} must be in HH:MM format (e.g., 09:00).";
            //     $business_messages["business_hours.{$index}.close.date_format"] = "The closing time for {$dayName} must be in HH:MM format (e.g., 17:00).";
            // }

            if(isset(request()->galleries) && isset(request()->galleries[0])) {
                foreach(request()->galleries as $index => $gallery) {
                    $gallery_messages["galleries.{$index}.file.required"] = "the image file is required.";
                    $gallery_messages["galleries.{$index}.file.image"] = "the image file is required";
                    $gallery_messages["galleries.{$index}.file.max"] = "the image file is too large";
                    $gallery_messages["galleries.{$index}.path.required"] = "the image file is required";
                    $gallery_messages["galleries.{$index}.description.required"] = "Please enter a description.";
                }
            }

            if(isset(request()->services) && isset(request()->services[0])) {
                foreach(request()->services as $index => $service) {
                    $services_messages["services.{$index}.file.required"] = "the image file is required";
                    $services_messages["services.{$index}.file.image"] = "the image file is required";
                    $services_messages["services.{$index}.path.required"] = "the image file is required";

                    $services_messages["services.{$index}.name.required"] = "the name field is required";
                    $services_messages["services.{$index}.description.required"] =  "the description field is required";
                }
            }

            if(isset(request()->links) && isset(request()->links[0])) {
                // --- Generate Link Messages Dynamically ---
                // Iterate over the actual submitted links data
                foreach (request()->links as $index => $linkData) {
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
            }

            return [
                ...$gallery_messages,
                ...$services_messages,
                ...$links_messages,

                'avatar.file.image' => 'The avatar field must be a valid image file.',
                'avatar.file.max' => 'The avatar file size must not exceed 2MB.',
                'avatar.path.required_if' => 'The avatar  field is required.',

                'logo.file.image' => 'The logo field must be a valid image file.',
                'logo.file.max' => 'The logo field size must not exceed 2MB.',
                'logo.path.required_if' => 'The logo  field is required.',

                'banner.file.image' => 'The banner field must be a valid image file.',
                'banner.file.max' => 'The banner file size must not exceed 2MB.',
                'banner.path.required_if' => 'The banner  field is required.',
            ];
    }
}
