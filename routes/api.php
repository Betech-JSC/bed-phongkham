<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\SyncController;

Route::prefix('v1')->group(function () {
    Route::post('/sync/appointment', [SyncController::class, 'syncAppointment']);
    Route::get('/services', [SyncController::class, 'getServices']);
    Route::get('/articles', [SyncController::class, 'getArticles']);
});
