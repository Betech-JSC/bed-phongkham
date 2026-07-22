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
        Schema::table('banners', function (Blueprint $table) {
            if (!Schema::hasColumn('banners', 'eyebrow')) {
                $table->string('eyebrow')->nullable()->after('title');
            }
            if (!Schema::hasColumn('banners', 'subheading')) {
                $table->text('subheading')->nullable()->after('subtitle');
            }
            if (!Schema::hasColumn('banners', 'desktop_image')) {
                $table->string('desktop_image')->nullable()->after('subheading');
            }
            if (!Schema::hasColumn('banners', 'mobile_image')) {
                $table->string('mobile_image')->nullable()->after('desktop_image');
            }
            if (!Schema::hasColumn('banners', 'primary_button_text')) {
                $table->string('primary_button_text')->nullable()->after('mobile_image');
            }
            if (!Schema::hasColumn('banners', 'primary_button_link')) {
                $table->string('primary_button_link')->nullable()->after('primary_button_text');
            }
            if (!Schema::hasColumn('banners', 'secondary_button_text')) {
                $table->string('secondary_button_text')->nullable()->after('primary_button_link');
            }
            if (!Schema::hasColumn('banners', 'secondary_button_link')) {
                $table->string('secondary_button_link')->nullable()->after('secondary_button_text');
            }
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('banners', function (Blueprint $table) {
            $table->dropColumn([
                'eyebrow',
                'subheading',
                'desktop_image',
                'mobile_image',
                'primary_button_text',
                'primary_button_link',
                'secondary_button_text',
                'secondary_button_link',
            ]);
        });
    }
};
