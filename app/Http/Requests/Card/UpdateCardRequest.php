<?php

namespace App\Http\Requests\Card;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

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
        return [
        'avatar.file' => 'nullable|image|max:2048', // Optional, but must be an image if provided
                'logo.file' => 'nullable|image|max:2048',   // Optional, but must be an image if provided
                'first_name' => 'nullable|string|max:255',
                'last_name' => 'nullable|string|max:255',
                'organization' => 'nullable|string|max:255',
                'job_title' => 'nullable|string|max:255',
                'banner_color' => 'nullable|string|regex:/^#[0-9A-F]{6}$/i', // Must match hex color format if provided
                'links' => 'nullable|array|max:8',
                'links.*.name' => [
                    'nullable',
                    'string',
                    Rule::in(['email', 'phone', 'website', 'facebook', 'twitter', 'instagram', 'linkedin', 'youtube']),
                ],
                'links.*.url' => [
                    'nullable',
                    'string',
                    $this->validateLinkValue(), // Assuming this is a custom method for URL validation
                ],
                'phone' => 'nullable|string|max:255',
                'email' => 'nullable|string|email|max:255',
                'headline' => 'nullable|string|max:255',
                'address' => 'nullable|string|max:255',
                'location' => 'nullable|string|max:255',
                // 'business_hours' => 'nullable|array|max:7', // Uncomment if you still want to validate this
                'galleries' => 'nullable|array',
                'galleries.*.file' => 'nullable|file|mimes:jpeg,png,jpg|max:2048', // Optional file upload
                'galleries.*.description' => 'nullable|string|max:500',
                'services' => 'nullable|array',
                'services.*.file' => 'nullable|file|mimes:jpeg,png|max:2048', // Optional file upload
                'services.*.name' => 'nullable|string',
                'services.*.description' => 'nullable|string|max:500',
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
}
