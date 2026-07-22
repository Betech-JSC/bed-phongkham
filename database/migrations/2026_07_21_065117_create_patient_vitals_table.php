<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('patient_vitals', function (Blueprint $table) {
            $table->id();
            $table->string('patient_name');
            $table->string('phone');
            $table->integer('systolic'); // Huyết áp tâm thu (e.g. 120, 185)
            $table->integer('diastolic'); // Huyết áp tâm trương (e.g. 80, 110)
            $table->integer('heart_rate'); // Nhịp tim (bpm)
            $table->text('notes')->nullable();
            $table->boolean('is_flagged')->default(false); // Cảnh báo đỏ Red Flag
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('patient_vitals');
    }
};
