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
        Schema::table('services', function (Blueprint $table) {
            if (!Schema::hasColumn('services', 'image')) {
                $table->string('image')->nullable()->after('is_featured');
            }
            if (!Schema::hasColumn('services', 'meta_title')) {
                $table->string('meta_title')->nullable()->after('image');
            }
            if (!Schema::hasColumn('services', 'meta_description')) {
                $table->text('meta_description')->nullable()->after('meta_title');
            }
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('services', function (Blueprint $table) {
            $table->dropColumn(['image', 'meta_title', 'meta_description']);
        });
    }
};
