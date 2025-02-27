<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('cards', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('user_id');
            $table->string("first_name");
            $table->string("last_name");
            $table->string("organization");
            $table->string("job_title");

            $table->string("email")->nullable();
            $table->string("phone")->nullable();

            $table->string("avatar")->nullable();
            $table->string("logo")->nullable();
            $table->string("banner_color")->nullable();
            $table->string('headline');
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('cards');
    }
};
