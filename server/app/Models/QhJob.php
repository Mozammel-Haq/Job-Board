<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class QhJob extends Model
{
    use HasFactory;

    protected $table = 'qhjobs';
    protected $fillable = [
        'title',
        'company',
        'location',
        'category',
        'employment_type',
        'salary',
        'description',
        'responsibilities',
        'requirements',
        'benefits',
        'logo',
        'is_active',
    ];
    protected $casts = [
        'responsibilities' => 'array',
        'requirements' => 'array',
        'benefits' => 'array',
        'is_active' => 'boolean',
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];

    // Relationships

    public function applications(): HasMany
    {
        return $this->hasMany(Application::class, 'job_id');
    }

    // Scopes For Filtering
    public function scopeActive($query)
    {
        return $query->where('is_active', true);
    }

    public function scopeByCategory($query, $category)
    {
        return $query->where('category', $category);
    }

    public function scopeByLocation($query, $location)
    {
        return $query->where('location', 'like', "%{$location}%");
    }

    public function scopeSearch($query, $search)
    {
        return $query->where(function ($q) use ($search) {
            $q->where('title', 'like', "%{$search}%")
              ->orWhere('company', 'like', "%{$search}%")
              ->orWhere('description', 'like', "%{$search}%");
        });
    }


}
