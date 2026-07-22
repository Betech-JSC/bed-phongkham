<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use Inertia\Response;
use App\Models\ServicePillar;
use App\Models\Article;
use App\Models\Service;

class HomeController extends Controller
{
    public function index(): Response
    {
        $servicePillars = ServicePillar::with('services')->orderBy('order')->get();
        $latestNews = Article::where('is_published', true)
            ->latest()
            ->take(3)
            ->get();

        $featuredServices = Service::where('is_featured', true)->take(3)->get();
        $reviews = \App\Models\Review::where('is_approved', true)->latest()->get();
        $banners = \App\Models\Banner::where('is_active', true)->orderBy('order')->get();

        return Inertia::render('Home', [
            'servicePillars' => $servicePillars,
            'latestNews' => $latestNews,
            'featuredServices' => $featuredServices,
            'reviews' => $reviews,
            'banners' => $banners,
        ]);
    }
}
