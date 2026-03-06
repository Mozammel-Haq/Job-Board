<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Application extends Model
{
    use HasFactory;
    protected $fillable = [
        'job_id',
        'name',
        'email',
        'resume_url',
        'cover_note',
        'status',
    ];
    protected $casts = [
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];
    public function job(): BelongsTo
    {
        return $this->belongsTo(QhJob::class, 'job_id');
    }
     /**
     * Scope a query to only include pending applications.
     */
    public function scopePending($query)
    {
        return $query->where('status', 'pending');
    }

    /**
     * Scope a query to only include reviewed applications.
     */
    public function scopeReviewed($query)
    {
        return $query->where('status', 'reviewed');
    }

    /**
     * Scope a query to filter by job.
     */
    public function scopeForJob($query, $jobId)
    {
        return $query->where('job_id', $jobId);
    }
}
