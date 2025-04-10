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
            $table->string('price')->nullable();
            $table->string('type');
            $table->string('description');
            $table->integer("number_of_vcard")->nullable()->default(0);// Nullable for unlimited
            $table->integer('number_of_nfc_business_card')->nullable()->default(0);// Nullable for unlimited
            $table->integer('number_of_gallery')->nullable()->default(0);// Nullable for unlimited
            $table->integer('number_of_service')->nullable()->default(0);// Nullable for unlimited
            $table->json('features');
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
