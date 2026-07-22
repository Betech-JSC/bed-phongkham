<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\AboutController;
use App\Http\Controllers\ServiceController;
use App\Http\Controllers\NewsController;
use App\Http\Controllers\AppointmentController;
use App\Http\Controllers\Admin\DashboardController as AdminDashboardController;

// Public Frontend Routes
Route::get('/', [HomeController::class, 'index'])->name('home');
Route::get('/gioi-thieu', [AboutController::class, 'index'])->name('about');

Route::get('/dich-vu', [ServiceController::class, 'index'])->name('services.index');
Route::get('/dich-vu/{slug}', [ServiceController::class, 'show'])->name('services.show');

Route::get('/tin-tuc', [NewsController::class, 'index'])->name('news.index');
Route::get('/tin-tuc/{slug}', [NewsController::class, 'show'])->name('news.show');

Route::get('/lien-he', [AppointmentController::class, 'create'])->name('contact');
Route::post('/lien-he', [AppointmentController::class, 'store'])->name('contact.store');

// Admin Redirects
Route::redirect('/admin', '/admin/dashboard');
Route::get('/dashboard', fn() => redirect()->route('admin.dashboard'))->name('dashboard');

// Admin CMS Routes (Protected by auth)
Route::middleware(['auth', 'verified'])->prefix('admin')->group(function () {
    Route::get('/dashboard', [AdminDashboardController::class, 'index'])->name('admin.dashboard');
    
    // Appointments CRUD & Status
    Route::post('/appointments', [AdminDashboardController::class, 'storeAppointment'])->name('admin.appointments.store');
    Route::patch('/appointments/{appointment}/status', [AdminDashboardController::class, 'updateAppointmentStatus'])->name('admin.appointments.status');
    Route::delete('/appointments/{appointment}', [AdminDashboardController::class, 'deleteAppointment'])->name('admin.appointments.delete');

    // Services CMS CRUD
    Route::post('/services', [AdminDashboardController::class, 'storeService'])->name('admin.services.store');
    Route::put('/services/{service}', [AdminDashboardController::class, 'updateService'])->name('admin.services.update');
    Route::delete('/services/{service}', [AdminDashboardController::class, 'deleteService'])->name('admin.services.delete');
    Route::post('/services/batch-action', [AdminDashboardController::class, 'batchUpdateServices'])->name('admin.services.batch');
    Route::post('/pillars', [AdminDashboardController::class, 'storePillar'])->name('admin.pillars.store');

    // Articles Blog CMS CRUD
    Route::post('/articles', [AdminDashboardController::class, 'createArticle'])->name('admin.articles.create');
    Route::put('/articles/{article}', [AdminDashboardController::class, 'updateArticle'])->name('admin.articles.update');
    Route::delete('/articles/{article}', [AdminDashboardController::class, 'deleteArticle'])->name('admin.articles.delete');
    Route::post('/articles/batch-action', [AdminDashboardController::class, 'batchUpdateArticles'])->name('admin.articles.batch');

    // Authors CMS CRUD
    Route::post('/authors', [AdminDashboardController::class, 'storeAuthor'])->name('admin.authors.store');
    Route::put('/authors/{author}', [AdminDashboardController::class, 'updateAuthor'])->name('admin.authors.update');
    Route::delete('/authors/{author}', [AdminDashboardController::class, 'deleteAuthor'])->name('admin.authors.delete');
    // Doctors CMS CRUD
    Route::post('/doctors', [AdminDashboardController::class, 'storeDoctor'])->name('admin.doctors.store');
    Route::put('/doctors/{doctor}', [AdminDashboardController::class, 'updateDoctor'])->name('admin.doctors.update');
    Route::delete('/doctors/{doctor}', [AdminDashboardController::class, 'deleteDoctor'])->name('admin.doctors.delete');
    Route::post('/doctors/batch-action', [AdminDashboardController::class, 'batchUpdateDoctors'])->name('admin.doctors.batch');

    // Treatment Results CMS CRUD
    Route::post('/treatment-results', [AdminDashboardController::class, 'storeTreatmentResult'])->name('admin.treatment_results.store');
    Route::put('/treatment-results/{treatmentResult}', [AdminDashboardController::class, 'updateTreatmentResult'])->name('admin.treatment_results.update');
    Route::delete('/treatment-results/{treatmentResult}', [AdminDashboardController::class, 'deleteTreatmentResult'])->name('admin.treatment_results.delete');
    Route::post('/treatment-results/batch-action', [AdminDashboardController::class, 'batchUpdateTreatmentResults'])->name('admin.treatment_results.batch');

    // Reviews CMS CRUD & Approval
    Route::post('/reviews', [AdminDashboardController::class, 'storeReview'])->name('admin.reviews.store');
    Route::put('/reviews/{review}', [AdminDashboardController::class, 'updateReview'])->name('admin.reviews.update');
    Route::patch('/reviews/{review}/toggle-approval', [AdminDashboardController::class, 'toggleReviewApproval'])->name('admin.reviews.toggle_approval');
    Route::delete('/reviews/{review}', [AdminDashboardController::class, 'deleteReview'])->name('admin.reviews.delete');
    Route::post('/reviews/batch-action', [AdminDashboardController::class, 'batchUpdateReviews'])->name('admin.reviews.batch');

    // Doctor Schedules CRUD
    Route::post('/schedules', [AdminDashboardController::class, 'storeSchedule'])->name('admin.schedules.store');
    Route::delete('/schedules/{schedule}', [AdminDashboardController::class, 'deleteSchedule'])->name('admin.schedules.delete');

    // FAQs CMS CRUD & Actions
    Route::post('/faqs', [AdminDashboardController::class, 'storeFaq'])->name('admin.faqs.store');
    Route::put('/faqs/{faq}', [AdminDashboardController::class, 'updateFaq'])->name('admin.faqs.update');
    Route::patch('/faqs/{faq}/status', [AdminDashboardController::class, 'toggleFaqStatus'])->name('admin.faqs.status');
    Route::delete('/faqs/{faq}', [AdminDashboardController::class, 'deleteFaq'])->name('admin.faqs.delete');
    Route::post('/faqs/batch-action', [AdminDashboardController::class, 'batchUpdateFaqs'])->name('admin.faqs.batch');
    
    // Banners CMS CRUD & Actions
    Route::post('/banners', [AdminDashboardController::class, 'storeBanner'])->name('admin.banners.store');
    Route::put('/banners/{banner}', [AdminDashboardController::class, 'updateBanner'])->name('admin.banners.update');
    Route::patch('/banners/{banner}/status', [AdminDashboardController::class, 'toggleBannerStatus'])->name('admin.banners.status');
    Route::delete('/banners/{banner}', [AdminDashboardController::class, 'deleteBanner'])->name('admin.banners.delete');
    Route::post('/banners/batch-action', [AdminDashboardController::class, 'batchUpdateBanners'])->name('admin.banners.batch');

    // Site Settings CMS
    Route::post('/settings', [AdminDashboardController::class, 'updateSettings'])->name('admin.settings.update');

    // Media Library CMS (Drag & Drop Upload + Delete)
    Route::post('/media/upload', [AdminDashboardController::class, 'uploadMedia'])->name('admin.media.upload');
    Route::delete('/media/{mediaFile}', [AdminDashboardController::class, 'deleteMedia'])->name('admin.media.delete');
    Route::post('/media/batch-delete', [AdminDashboardController::class, 'batchDeleteMedia'])->name('admin.media.batch_delete');
});

require __DIR__.'/auth.php';
