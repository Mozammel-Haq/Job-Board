<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreApplicationRequest;
use App\Http\Resources\ApplicationResource;
use App\Models\Application;
use App\Models\QhJob;
use Illuminate\Http\Request;

class ApplicationController extends Controller
{
    /**
     * Display a listing of applications (admin only).
     */
    public function index(Request $request)
    {
        if (!auth()->user()?->isAdmin()) {
            return response()->json([
                'message' => 'Unauthorized',
            ], 403);
        }

        $query = Application::query()->with('job');

        // Filter by job
        if ($request->has('job_id') && $request->job_id) {
            $query->forJob($request->job_id);
        }

        // Filter by status
        if ($request->has('status') && $request->status) {
            $query->where('status', $request->status);
        }

        // Search by name or email
        if ($request->has('search') && $request->search) {
            $search = $request->search;
            $query->where(function ($q) use ($search) {
                $q->where('name', 'like', "%{$search}%")
                  ->orWhere('email', 'like', "%{$search}%");
            });
        }

        $perPage = $request->get('per_page', 15);
        $applications = $query->latest()->paginate($perPage);

        return ApplicationResource::collection($applications);
    }

    /**
     * Store a newly created application.
     */
    public function store(StoreApplicationRequest $request)
    {
        // Check if job exists and is active
        $job = QhJob::active()->findOrFail($request->qhjob_id);

        // Check if user already applied to this job
        $existingApplication = Application::where('qhjob_id', $request->qhjob_id)
            ->where('email', $request->email)
            ->first();

        if ($existingApplication) {
            return response()->json([
                'message' => 'You have already applied to this job',
            ], 422);
        }

        $application = Application::create($request->validated());

        return response()->json([
            'message' => 'Application submitted successfully',
            'data' => new ApplicationResource($application),
        ], 201);
    }

    /**
     * Display the specified application (admin only).
     */
    public function show(Application $application)
    {
        if (!auth()->user()?->isAdmin()) {
            return response()->json([
                'message' => 'Unauthorized',
            ], 403);
        }

        $application->load('job');

        return new ApplicationResource($application);
    }

    /**
     * Update application status (admin only).
     */
    public function updateStatus(Request $request, Application $application)
    {
        if (!auth()->user()?->isAdmin()) {
            return response()->json([
                'message' => 'Unauthorized',
            ], 403);
        }

        $request->validate([
            'status' => ['required', 'in:pending,reviewed,accepted,rejected'],
        ]);

        $application->update([
            'status' => $request->status,
        ]);

        return response()->json([
            'message' => 'Application status updated successfully',
            'data' => new ApplicationResource($application),
        ]);
    }

    /**
     * Remove the specified application (admin only).
     */
    public function destroy(Application $application)
    {
        if (!auth()->user()?->isAdmin()) {
            return response()->json([
                'message' => 'Unauthorized',
            ], 403);
        }

        $application->delete();

        return response()->json([
            'message' => 'Application deleted successfully',
        ]);
    }

    /**
     * Get applications for a specific job (admin only).
     */
    public function jobApplications(QhJob $qhjob)
    {
        if (!auth()->user()?->isAdmin()) {
            return response()->json([
                'message' => 'Unauthorized',
            ], 403);
        }

        $applications = $qhjob->applications()
            ->with('job')
            ->latest()
            ->get();

        return ApplicationResource::collection($applications);
    }
}
