<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use Inertia\Response;
use App\Models\ServicePillar;
use App\Models\Service;

class ServiceController extends Controller
{
    public function index(): Response
    {
        $pillars = ServicePillar::with('services')->orderBy('order')->get();
        $allServices = Service::all();

        return Inertia::render('Services/Index', [
            'pillars' => $pillars,
            'allServices' => $allServices,
        ]);
    }

    public function show(string $slug): Response
    {
        $service = Service::where('slug', $slug)->firstOrFail();

        return Inertia::render('Services/Show', [
            'service' => $service,
        ]);
    }
}
