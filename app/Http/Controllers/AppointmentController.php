<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use App\Models\Appointment;
use App\Models\Service;
use App\Models\SiteSetting;

class AppointmentController extends Controller
{
    public function create(Request $request): Response
    {
        $allServices = Service::all();
        $settings = SiteSetting::pluck('value', 'key')->all();

        return Inertia::render('Contact', [
            'allServices' => $allServices,
            'settings' => $settings,
            'prefillService' => $request->query('service'),
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'patient_name' => 'required|string|max:255',
            'phone' => 'required|string|max:50',
            'notes' => 'nullable|string',
            'service_slug' => 'nullable|string',
        ]);

        $appointment = Appointment::create($validated);

        return back()->with('success', [
            'message' => 'Đặt lịch hẹn thành công!',
            'patient_name' => $appointment->patient_name,
            'phone' => $appointment->phone,
        ]);
    }
}
