<?php

declare(strict_types=1);

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('cards', function (Blueprint $table) {
            $table->string('banner')->nullable()->change();
            $table->string('organization')->nullable()->change();
            $table->string('job_title')->nullable()->change();
            $table->string('headline')->nullable()->change();
        });
    }

    public function down(): void
    {
        Schema::table('cards', function (Blueprint $table) {
            $table->string('banner')->nullable(false)->change();
            $table->string('organization')->nullable(false)->change();
            $table->string('job_title')->nullable(false)->change();
            $table->string('headline')->nullable(false)->change();
        });
    }
};
