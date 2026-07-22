<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use Inertia\Response;
use App\Models\Article;

class NewsController extends Controller
{
    public function index(): Response
    {
        $newsList = Article::where('is_published', true)->latest()->get();

        return Inertia::render('News/Index', [
            'newsList' => $newsList,
        ]);
    }

    public function show(string $slug): Response
    {
        $news = Article::where('slug', $slug)->where('is_published', true)->firstOrFail();
        $relatedNews = Article::where('slug', '!=', $slug)->where('is_published', true)->latest()->take(3)->get();
        $authorDetails = \App\Models\Author::where('name', $news->author)->first();

        return Inertia::render('News/Show', [
            'news' => $news,
            'relatedNews' => $relatedNews,
            'authorDetails' => $authorDetails,
        ]);
    }
}
