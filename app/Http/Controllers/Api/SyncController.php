<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Appointment;
use App\Models\Service;
use App\Models\Article;

class SyncController extends Controller
{
    /**
     * External API endpoint to sync new appointment bookings (e.g. Zalo Mini App / External Form)
     */
    public function syncAppointment(Request $request)
    {
        $validated = $request->validate([
            'patient_name' => 'required|string|max:255',
            'phone' => 'required|string|max:50',
            'notes' => 'nullable|string',
            'service_slug' => 'nullable|string',
        ]);

        $appointment = Appointment::create($validated);

        return response()->json([
            'success' => true,
            'message' => 'Đã đồng bộ đơn đặt lịch thành công!',
            'data' => $appointment,
        ], 201);
    }

    /**
     * API endpoint returning clinic services list for mobile app / integrations
     */
    public function getServices()
    {
        return response()->json([
            'success' => true,
            'data' => Service::all(),
        ]);
    }

    /**
     * API endpoint returning medical articles list
     */
    public function getArticles()
    {
        return response()->json([
            'success' => true,
            'data' => Article::where('is_published', true)->latest()->get(),
        ]);
    }
}
