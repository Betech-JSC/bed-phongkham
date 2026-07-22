<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('doctors', function (Blueprint $table) {
            if (!Schema::hasColumn('doctors', 'detailed_bio')) {
                $table->longText('detailed_bio')->nullable()->after('bio');
            }
            if (!Schema::hasColumn('doctors', 'is_featured')) {
                $table->boolean('is_featured')->default(true)->after('detailed_bio');
            }
            if (!Schema::hasColumn('doctors', 'meta_title')) {
                $table->string('meta_title')->nullable()->after('is_featured');
            }
            if (!Schema::hasColumn('doctors', 'meta_description')) {
                $table->text('meta_description')->nullable()->after('meta_title');
            }
        });

        Schema::table('treatment_results', function (Blueprint $table) {
            if (!Schema::hasColumn('treatment_results', 'detailed_case')) {
                $table->longText('detailed_case')->nullable()->after('outcome');
            }
            if (!Schema::hasColumn('treatment_results', 'is_featured')) {
                $table->boolean('is_featured')->default(true)->after('detailed_case');
            }
            if (!Schema::hasColumn('treatment_results', 'meta_title')) {
                $table->string('meta_title')->nullable()->after('is_featured');
            }
            if (!Schema::hasColumn('treatment_results', 'meta_description')) {
                $table->text('meta_description')->nullable()->after('meta_title');
            }
        });
    }

    public function down(): void
    {
        Schema::table('doctors', function (Blueprint $table) {
            $table->dropColumn(['detailed_bio', 'is_featured', 'meta_title', 'meta_description']);
        });

        Schema::table('treatment_results', function (Blueprint $table) {
            $table->dropColumn(['detailed_case', 'is_featured', 'meta_title', 'meta_description']);
        });
    }
};
