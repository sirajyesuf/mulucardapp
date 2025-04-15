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
        Schema::create('plans', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('description');
            $table->json('features');
            $table->string('price');
            $table->integer("number_of_digital_business_card");
            $table->integer('number_of_nfc_business_card');
            $table->integer('number_of_gallery');
            $table->integer('number_of_service');
            $table->boolean('most_popular')->default(false);
            $table->boolean('custom_url')->default(false);
            $table->softDeletes('deleted_at');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('plans');
    }
};
