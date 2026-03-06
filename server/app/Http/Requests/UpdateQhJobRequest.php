<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateQhJobRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return $this->user()?->isAdmin() ?? false;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'title' => ['sometimes', 'required', 'string', 'max:255'],
            'company' => ['sometimes', 'required', 'string', 'max:255'],
            'location' => ['sometimes', 'required', 'string', 'max:255'],
            'category' => ['sometimes', 'required', 'string', 'max:255'],
            'employment_type' => ['sometimes', 'required', 'string', 'in:Full Time,Part Time,Remote,Contract,Internship'],
            'salary' => ['nullable', 'string', 'max:255'],
            'description' => ['sometimes', 'required', 'string'],
            'responsibilities' => ['nullable', 'array'],
            'responsibilities.*' => ['string'],
            'requirements' => ['nullable', 'array'],
            'requirements.*' => ['string'],
            'benefits' => ['nullable', 'array'],
            'benefits.*' => ['string'],
            'logo' => ['nullable', 'string', 'max:255'],
            'is_active' => ['boolean'],
        ];
    }
}
