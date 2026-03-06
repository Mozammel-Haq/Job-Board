<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreApplicationRequest extends FormRequest
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
            'job_id' => ['required', 'exists:qhjobs,id'],
            'name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'email', 'max:255'],
            'resume_url' => ['required', 'url', 'max:500'],
            'cover_note' => ['required', 'string', 'min:50'],
        ];
    }
    public function messages()
    {
        return [
            'job_id.required' => 'Job ID is required',
            'job_id.exists' => 'The selected job does not exist',
            'name.required' => 'Your name is required',
            'email.required' => 'Email address is required',
            'email.email' => 'Please provide a valid email address',
            'resume_url.required' => 'Resume URL is required',
            'resume_url.url' => 'Please provide a valid URL for your resume',
            'cover_note.required' => 'Cover note is required',
            'cover_note.min' => 'Cover note must be at least 50 characters',
        ];
    }
}
