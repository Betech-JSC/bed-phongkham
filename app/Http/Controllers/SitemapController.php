<?php

namespace App\Http\Controllers;

use App\Models\Article;
use App\Models\Service;
use Illuminate\Http\Response;

class SitemapController extends Controller
{
    /**
     * Generate dynamic XML Sitemap for Search Engines.
     */
    public function index(): Response
    {
        $baseUrl = config('app.url', url('/'));

        $staticPages = [
            ['url' => $baseUrl, 'changefreq' => 'daily', 'priority' => '1.0'],
            ['url' => $baseUrl . '/gioi-thieu', 'changefreq' => 'weekly', 'priority' => '0.9'],
            ['url' => $baseUrl . '/dich-vu', 'changefreq' => 'daily', 'priority' => '0.9'],
            ['url' => $baseUrl . '/tin-tuc', 'changefreq' => 'daily', 'priority' => '0.8'],
            ['url' => $baseUrl . '/lien-he', 'changefreq' => 'monthly', 'priority' => '0.8'],
        ];

        $services = Service::all(['slug', 'updated_at']);
        $articles = Article::where('is_published', true)->get(['slug', 'updated_at']);

        $xml = '<?xml version="1.0" encoding="UTF-8"?>';
        $xml .= '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">';

        foreach ($staticPages as $page) {
            $xml .= '<url>';
            $xml .= '<loc>' . htmlspecialchars($page['url']) . '</loc>';
            $xml .= '<changefreq>' . $page['changefreq'] . '</changefreq>';
            $xml .= '<priority>' . $page['priority'] . '</priority>';
            $xml .= '</url>';
        }

        foreach ($services as $service) {
            $xml .= '<url>';
            $xml .= '<loc>' . htmlspecialchars($baseUrl . '/dich-vu/' . $service->slug) . '</loc>';
            $xml .= '<lastmod>' . ($service->updated_at ? $service->updated_at->toAtomString() : now()->toAtomString()) . '</lastmod>';
            $xml .= '<changefreq>weekly</changefreq>';
            $xml .= '<priority>0.85</priority>';
            $xml .= '</url>';
        }

        foreach ($articles as $article) {
            $xml .= '<url>';
            $xml .= '<loc>' . htmlspecialchars($baseUrl . '/tin-tuc/' . $article->slug) . '</loc>';
            $xml .= '<lastmod>' . ($article->updated_at ? $article->updated_at->toAtomString() : now()->toAtomString()) . '</lastmod>';
            $xml .= '<changefreq>weekly</changefreq>';
            $xml .= '<priority>0.75</priority>';
            $xml .= '</url>';
        }

        $xml .= '</urlset>';

        return response($xml, 200, [
            'Content-Type' => 'application/xml; charset=utf-8',
        ]);
    }

    /**
     * Generate dynamic robots.txt file.
     */
    public function robots(): Response
    {
        $baseUrl = config('app.url', url('/'));

        $content = "User-agent: *\n";
        $content .= "Allow: /\n";
        $content .= "Disallow: /admin/\n";
        $content .= "Disallow: /dashboard\n";
        $content .= "Disallow: /login\n";
        $content .= "Disallow: /register\n\n";
        $content .= "Sitemap: " . $baseUrl . "/sitemap.xml\n";

        return response($content, 200, [
            'Content-Type' => 'text/plain; charset=utf-8',
        ]);
    }
}
