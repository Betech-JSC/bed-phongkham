<!DOCTYPE html>
<html lang="vi" class="h-full antialiased">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <title inertia>Phòng Khám Chuyên Khoa Nội - BSCKII Đoàn Khôi</title>

        @php
            $favicon = \App\Models\SiteSetting::where('key', 'logo_favicon')->value('value')
                ?: (\App\Models\SiteSetting::where('key', 'logo_dark')->value('value') ?: '/assets/logo.png');
        @endphp
        <link rel="icon" type="image/png" href="{{ $favicon }}">
        <link rel="shortcut icon" type="image/png" href="{{ $favicon }}">
        <link rel="apple-touch-icon" href="{{ $favicon }}">

        <!-- Google Fonts: Inter -->
        <link rel="preconnect" href="https://fonts.googleapis.com">
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap" rel="stylesheet">

        <!-- Scripts -->
        @routes
        @viteReactRefresh
        @vite(['resources/js/app.tsx', "resources/js/Pages/{$page['component']}.tsx"])
        @inertiaHead
    </head>
    <body class="min-h-full flex flex-col font-sans bg-neutral-bg text-text-primary">
        @inertia
    </body>
</html>
