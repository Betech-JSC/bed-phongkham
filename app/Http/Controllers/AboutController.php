<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use Inertia\Response;
use App\Models\SiteSetting;
use App\Models\Doctor;
use App\Models\Review;
use App\Models\Faq;

class AboutController extends Controller
{
    public function index(): Response
    {
        $settings = SiteSetting::pluck('value', 'key')->all();
        $doctors = Doctor::with('schedules')->orderBy('order')->get();
        $reviews = Review::where('is_approved', true)->latest()->get();
        $faqs = Faq::where('is_active', true)->orderBy('order')->get();

        return Inertia::render('About', [
            'settings' => $settings,
            'doctors' => $doctors,
            'reviews' => $reviews,
            'faqs' => $faqs,
        ]);
    }
}
