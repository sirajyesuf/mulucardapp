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
                    // 'avatar' =>['required', 'regex:/^data:image\/(jpeg|png|gif);base64,[A-Za-z0-9+\/=]+$/'],
                    // 'logo' => ['required', 'regex:/^data:image\/(jpeg|png|gif);base64,[A-Za-z0-9+\/=]+$/'],
                    'avatar' => 'required|image|max:2048', // Max 2MB, must be an image
                    'logo' => 'required|image|max:2048',
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
                    'links.*.value' => [
                    'nullable', // Allow empty strings
                    'string',
                    $this->validateLinkValue(),
                    ],
            ];
    }

    protected function validateLinkValue(): callable
        {
            return function ($attribute, $value, $fail) {
                $index = explode('.', $attribute)[1];
                $name = $this->input("links.{$index}.name");

                if ($value) {
                    switch ($name) {
                        case 'email':
                            if (!filter_var($value, FILTER_VALIDATE_EMAIL)) {
                                $fail("The {$name} must be a valid email address.");
                            }
                            break;
                        case 'phone':
                            // if (!preg_match('/^\d{3}-\d{3}-\d{4}$/', $value)) {
                            //     $fail("The {$name} must be in the format XXX-XXX-XXXX.");
                            // }
                            break;
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
