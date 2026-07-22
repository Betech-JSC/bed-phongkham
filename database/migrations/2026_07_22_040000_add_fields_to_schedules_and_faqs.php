<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('doctor_schedules', function (Blueprint $table) {
            if (!Schema::hasColumn('doctor_schedules', 'start_time')) {
                $table->string('start_time')->default('08:00')->after('day_of_week');
            }
            if (!Schema::hasColumn('doctor_schedules', 'end_time')) {
                $table->string('end_time')->default('17:00')->after('start_time');
            }
            if (!Schema::hasColumn('doctor_schedules', 'branch')) {
                $table->string('branch')->default('Cơ sở Chính: 123 Nguyễn Đức Cảnh, Hải Phòng')->after('end_time');
            }
        });

        Schema::table('faqs', function (Blueprint $table) {
            if (!Schema::hasColumn('faqs', 'is_active')) {
                $table->boolean('is_active')->default(true)->after('order');
            }
        });
    }

    public function down(): void
    {
        Schema::table('doctor_schedules', function (Blueprint $table) {
            $table->dropColumn(['start_time', 'end_time', 'branch']);
        });

        Schema::table('faqs', function (Blueprint $table) {
            $table->dropColumn('is_active');
        });
    }
};
