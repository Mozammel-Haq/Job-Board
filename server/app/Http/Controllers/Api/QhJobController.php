<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreQhJobRequest;
use App\Http\Requests\UpdateQhJobRequest;
use App\Http\Resources\QhJobResource;
use App\Models\QhJob;
use Illuminate\Http\Request;

class QhJobController extends Controller
{
    /**
     * Display a listing of jobs.
     */
    public function index(Request $request)
    {
        $query = QhJob::query()->active();

        // Search
        if ($request->has('search') && $request->search) {
            $query->search($request->search);
        }

        // Filter by category
        if ($request->has('category') && $request->category && $request->category !== 'All') {
            $query->byCategory($request->category);
        }

        // Filter by location
        if ($request->has('location') && $request->location && $request->location !== 'All') {
            $query->byLocation($request->location);
        }

        // Filter by employment type
        if ($request->has('employment_type') && $request->employment_type && $request->employment_type !== 'All') {
            $query->where('employment_type', $request->employment_type);
        }

        // Pagination
        $perPage = $request->get('per_page', 15);
        $jobs = $query->latest()->paginate($perPage);

        return QhJobResource::collection($jobs);
    }

    /**
     * Store a newly created job.
     */
    public function store(StoreQhJobRequest $request)
    {
        $job = QhJob::create($request->validated());

        return response()->json([
            'message' => 'Job created successfully',
            'data' => new QhJobResource($job),
        ], 201);
    }

    /**
     * Display the specified job.
     */
    public function show(QhJob $qhjob)
    {
        // Load applications count
        $qhjob->loadCount('applications');

        return new QhJobResource($qhjob);
    }

    /**
     * Update the specified job.
     */
    public function update(UpdateQhJobRequest $request, QhJob $qhjob)
    {
        $qhjob->update($request->validated());

        return response()->json([
            'message' => 'Job updated successfully',
            'data' => new QhJobResource($qhjob),
        ]);
    }

    /**
     * Remove the specified job.
     */
    public function destroy(QhJob $qhjob)
    {
        // Check if user is admin
        if (!auth()->user()?->isAdmin()) {
            return response()->json([
                'message' => 'Unauthorized',
            ], 403);
        }

        $qhjob->delete();

        return response()->json([
            'message' => 'Job deleted successfully',
        ]);
    }

    /**
     * Get jobs with application counts (admin only).
     */
    public function adminIndex(Request $request)
    {
        if (!auth()->user()?->isAdmin()) {
            return response()->json([
                'message' => 'Unauthorized',
            ], 403);
        }

        $query = QhJob::query()->withCount('applications');

        // Search
        if ($request->has('search') && $request->search) {
            $query->search($request->search);
        }

        // Include inactive jobs for admin
        if ($request->has('include_inactive') && $request->include_inactive) {
            // Don't filter by active status
        } else {
            $query->active();
        }

        $perPage = $request->get('per_page', 15);
        $jobs = $query->latest()->paginate($perPage);

        return QhJobResource::collection($jobs);
    }

    /**
     * Get featured jobs.
     */
    public function featured()
    {
        $jobs = QhJob::active()
            ->latest()
            ->limit(8)
            ->get();

        return QhJobResource::collection($jobs);
    }

    /**
     * Get latest jobs.
     */
    public function latest()
    {
        $jobs = QhJob::active()
            ->latest()
            ->limit(8)
            ->get();

        return QhJobResource::collection($jobs);
    }

    /**
     * Get job statistics (admin only).
     */
    public function statistics()
    {
        if (!auth()->user()?->isAdmin()) {
            return response()->json([
                'message' => 'Unauthorized',
            ], 403);
        }

        $totalJobs = QhJob::count();
        $activeJobs = QhJob::active()->count();
        $totalApplications = \App\Models\Application::count();
        $pendingApplications = \App\Models\Application::pending()->count();

        return response()->json([
            'total_jobs' => $totalJobs,
            'active_jobs' => $activeJobs,
            'total_applications' => $totalApplications,
            'pending_applications' => $pendingApplications,
        ]);
    }
}
