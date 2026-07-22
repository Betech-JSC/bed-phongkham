<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        // 1. Tác giả bài viết
        Schema::create('authors', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('title')->nullable(); // e.g. BSCKII, Tiến sĩ y khoa
            $table->string('avatar')->nullable();
            $table->text('bio')->nullable();
            $table->timestamps();
        });

        // 2. Quản lý đánh giá
        Schema::create('reviews', function (Blueprint $table) {
            $table->id();
            $table->string('patient_name');
            $table->string('service_name')->nullable();
            $table->integer('rating')->default(5);
            $table->text('comment');
            $table->boolean('is_approved')->default(true);
            $table->timestamps();
        });

        // 3. Quản lý Banners
        Schema::create('banners', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->string('subtitle')->nullable();
            $table->string('image_url');
            $table->string('link')->nullable();
            $table->integer('order')->default(1);
            $table->boolean('is_active')->default(true);
            $table->timestamps();
        });

        // 4. Đội ngũ bác sĩ
        Schema::create('doctors', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('specialty'); // e.g. Chuyên khoa Tim mạch
            $table->string('experience'); // e.g. 25+ năm kinh nghiệm
            $table->string('avatar')->nullable();
            $table->text('bio')->nullable();
            $table->integer('order')->default(1);
            $table->timestamps();
        });

        // 5. Lịch trực bác sĩ
        Schema::create('doctor_schedules', function (Blueprint $table) {
            $table->id();
            $table->foreignId('doctor_id')->constrained('doctors')->onDelete('cascade');
            $table->string('day_of_week'); // e.g. Thứ 2, Thứ 3, Thứ 7
            $table->string('shift'); // e.g. Sáng (07:30 - 11:30)
            $table->string('room')->default('Phòng khám số 1');
            $table->timestamps();
        });

        // 6. Hỏi đáp FAQ
        Schema::create('faqs', function (Blueprint $table) {
            $table->id();
            $table->string('question');
            $table->text('answer');
            $table->string('category')->default('Chung');
            $table->integer('order')->default(1);
            $table->timestamps();
        });

        // 7. Kết quả thực tế
        Schema::create('treatment_results', function (Blueprint $table) {
            $table->id();
            $table->string('patient_title');
            $table->string('before_image')->nullable();
            $table->string('after_image')->nullable();
            $table->text('diagnosis');
            $table->text('outcome');
            $table->timestamps();
        });

        // 8. Quản lý chính sách
        Schema::create('policies', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->string('slug');
            $table->text('content');
            $table->timestamps();
        });

        // 9. Quản lý tệp
        Schema::create('media_files', function (Blueprint $table) {
            $table->id();
            $table->string('filename');
            $table->string('url');
            $table->string('file_type')->default('image');
            $table->integer('file_size')->default(0);
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('media_files');
        Schema::dropIfExists('policies');
        Schema::dropIfExists('treatment_results');
        Schema::dropIfExists('faqs');
        Schema::dropIfExists('doctor_schedules');
        Schema::dropIfExists('doctors');
        Schema::dropIfExists('banners');
        Schema::dropIfExists('reviews');
        Schema::dropIfExists('authors');
    }
};
