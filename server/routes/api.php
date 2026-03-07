<?php

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\QhJobController;
use App\Http\Controllers\Api\ApplicationController;
use Illuminate\Support\Facades\Route;


// Public routes
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

// Public job routes
Route::get('/jobs', [QhJobController::class, 'index']);
Route::get('/jobs/featured', [QhJobController::class, 'featured']);
Route::get('/jobs/latest', [QhJobController::class, 'latest']);
Route::get('/jobs/filters', [QhJobController::class, 'getFilters']);
Route::get('/jobs/{qhjob}', [QhJobController::class, 'show']);

// Public application route
Route::post('/applications', [ApplicationController::class, 'store']);

// Protected routes
Route::middleware('auth:sanctum')->group(function () {
    // Auth routes
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/user', [AuthController::class, 'user']);

    // Admin job routes
    Route::get('/admin/jobs', [QhJobController::class, 'adminIndex']);
    Route::post('/admin/jobs', [QhJobController::class, 'store']);
    Route::put('/admin/jobs/{qhjob}', [QhJobController::class, 'update']);
    Route::delete('/admin/jobs/{qhjob}', [QhJobController::class, 'destroy']);
    Route::get('/admin/jobs/statistics', [QhJobController::class, 'statistics']);
    Route::post('/admin/jobs/logo', [QhJobController::class, 'uploadLogo']);
    Route::get('/admin/jobs/weekly-stats', [QhJobController::class, 'weeklyStats']);
    Route::get('/admin/jobs/monthly-stats', [QhJobController::class, 'monthlyStats']);
    Route::get('/admin/jobs/yearly-stats', [QhJobController::class, 'yearlyStats']);

    // Admin application routes
    Route::get('/admin/applications', [ApplicationController::class, 'index']);
    Route::get('/admin/applications/{application}', [ApplicationController::class, 'show']);
    Route::patch('/admin/applications/{application}/status', [ApplicationController::class, 'updateStatus']);
    Route::delete('/admin/applications/{application}', [ApplicationController::class, 'destroy']);
    Route::get('/admin/jobs/{qhjob}/applications', [ApplicationController::class, 'jobApplications']);
});
