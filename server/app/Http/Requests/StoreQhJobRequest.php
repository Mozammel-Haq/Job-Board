<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreQhJobRequest extends FormRequest
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
             'title' => ['required', 'string', 'max:255'],
            'company' => ['required', 'string', 'max:255'],
            'location' => ['required', 'string', 'max:255'],
            'category' => ['required', 'string', 'max:255'],
            'employment_type' => ['required', 'string', 'in:Full Time,Part Time,Remote,Contract,Internship'],
            'salary' => ['nullable', 'string', 'max:255'],
            'description' => ['required', 'string'],
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

    public function messages()
    {
        return [
            'title.required' => 'Job title is required',
            'company.required' => 'Company name is required',
            'location.required' => 'Job location is required',
            'category.required' => 'Job category is required',
            'employment_type.required' => 'Employment type is required',
            'employment_type.in' => 'Invalid employment type',
            'description.required' => 'Job description is required',
        ];
    }
}
