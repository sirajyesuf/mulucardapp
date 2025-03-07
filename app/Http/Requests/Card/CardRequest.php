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
                    'links' => 'required|array|max:8',
                    'links.*.name' => [
                    'required',
                    'string',
                    Rule::in(['email', 'phone', 'website', 'facebook', 'twitter', 'instagram', 'linkedin', 'youtube']),
                    ],
                    'links.*.url' => [
                    'nullable',
                    'string',
                    $this->validateLinkValue(),
                    ],
                    'phone' => 'required|string|max:255',
                    'email' => 'required|string|email|max:255',
                    'headline' => 'required|string|max:255',
                    'address' => 'required|string|max:255',
                    'location' => 'required|string|max:255',
                    // 'business_hours' => 'required|array|max:7',
                    'galleries' => 'required|array',
                    'galleries.*.file' => 'file|mimes:jpeg,png,jpg|max:2048',
                    'galleries.*.description' => 'required|string|max:500',
                    'services' => 'required|array',
                    'services.*.file' => 'file|mimes:jpeg,png|max:2048',
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
                return [
                    'links.required' => 'The links field is required.',
                    'links.*.name.required' => 'Each link must have a name.',
                    'links.*.name.in' => 'The link name is invalid.',
                ];
            }
}
