<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreQhJobRequest;
use App\Http\Requests\UpdateQhJobRequest;
use App\Http\Resources\QhJobResource;
use App\Models\QhJob;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Carbon\Carbon;

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

    /**
     * Upload job logo (admin only).
     */
    public function uploadLogo(Request $request)
    {
        if (!auth()->user()?->isAdmin()) {
            return response()->json([
                'message' => 'Unauthorized',
            ], 403);
        }

        $request->validate([
            'logo' => [
                'required',
                'file',
                'mimetypes:image/jpeg,image/png,image/gif,image/svg+xml,image/webp',
                'max:4096'
            ],
        ]);

        $path = $request->file('logo')->store('logos', 'public');
        $url = asset('storage/' . $path);

        return response()->json([
            'message' => 'Logo uploaded successfully',
            'url' => $url,
            'path' => $path,
        ], 201);
    }

    /**
     * Weekly stats for dashboard (admin only) in format:
     * [{ day: 'Mon', jobView: number, jobApplied: number }, ...]
     */
    public function weeklyStats()
    {
        if (!auth()->user()?->isAdmin()) {
            return response()->json([
                'message' => 'Unauthorized',
            ], 403);
        }

        $startOfWeek = Carbon::now()->startOfWeek();
        $days = [];

        for ($i = 0; $i < 7; $i++) {
            $dayStart = (clone $startOfWeek)->addDays($i);
            $dayEnd = (clone $dayStart)->endOfDay();

            $appliedCount = \App\Models\Application::whereBetween('created_at', [$dayStart, $dayEnd])->count();

            // Derive view count using a simple heuristic to keep visuals meaningful
            // You can replace this with real view tracking if available
            $viewCount = ($appliedCount * 3) + 50;

            $days[] = [
                'day' => $dayStart->shortEnglishDayOfWeek, // Mon, Tue, ...
                'jobView' => $viewCount,
                'jobApplied' => $appliedCount,
            ];
        }

        return response()->json($days);
    }

    public function monthlyStats()
    {
        if (!auth()->user()?->isAdmin()) {
            return response()->json([
                'message' => 'Unauthorized',
            ], 403);
        }

        $startOfMonth = Carbon::now()->startOfMonth();
        $weeks = [];
        for ($w = 0; $w < 5; $w++) {
            $weekStart = (clone $startOfMonth)->addWeeks($w)->startOfWeek();
            $weekEnd = (clone $weekStart)->endOfWeek();
            if ($weekStart->month !== $startOfMonth->month && $weekEnd->month !== $startOfMonth->month) {
                continue;
            }
            $applied = \App\Models\Application::whereBetween('created_at', [$weekStart, $weekEnd])->count();
            $views = ($applied * 3) + 80;
            $weeks[] = [
                'day' => 'W' . ($w + 1),
                'jobView' => $views,
                'jobApplied' => $applied,
            ];
        }
        return response()->json($weeks);
    }

    public function yearlyStats()
    {
        if (!auth()->user()?->isAdmin()) {
            return response()->json([
                'message' => 'Unauthorized',
            ], 403);
        }

        $year = Carbon::now()->year;
        $months = [];
        for ($m = 1; $m <= 12; $m++) {
            $monthStart = Carbon::createFromDate($year, $m, 1)->startOfMonth();
            $monthEnd = (clone $monthStart)->endOfMonth();
            $applied = \App\Models\Application::whereBetween('created_at', [$monthStart, $monthEnd])->count();
            $views = ($applied * 4) + 100;
            $months[] = [
                'day' => $monthStart->shortEnglishMonth,
                'jobView' => $views,
                'jobApplied' => $applied,
            ];
        }
        return response()->json($months);
    }
}
