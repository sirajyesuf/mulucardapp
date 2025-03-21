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
        Schema::table('cards', function (Blueprint $table) {
            $table->integer('total_views')->default(0);
            $table->integer('total_saves')->default(0);
            $table->string("cardname")->nullable();
            $table->boolean("pausecard")->default(false);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('cards', function (Blueprint $table) {
            $table->dropColumn('total_views');
            $table->dropColumn('total_saves');
            $table->dropColumn('cardname');
            $table->dropColumn('pausecard');
        });
    }
};
