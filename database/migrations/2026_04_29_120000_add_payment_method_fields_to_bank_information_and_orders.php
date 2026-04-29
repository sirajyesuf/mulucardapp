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
        Schema::table('bank_information', function (Blueprint $table) {
            $table->string('type')->default('bank');
            $table->string('logo')->nullable();
            $table->string('phone_number')->nullable();
            $table->boolean('is_active')->default(true);
        });

        Schema::table('bank_information', function (Blueprint $table) {
            $table->string('account_number')->nullable()->change();
        });

        Schema::table('orders', function (Blueprint $table) {
            $table->foreignId('payment_method_id')
                ->nullable()
                ->constrained('bank_information')
                ->nullOnDelete();
            $table->json('payment_snapshot')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('orders', function (Blueprint $table) {
            $table->dropForeign(['payment_method_id']);
            $table->dropColumn(['payment_method_id', 'payment_snapshot']);
        });

        Schema::table('bank_information', function (Blueprint $table) {
            $table->dropColumn(['type', 'logo', 'phone_number', 'is_active']);
        });

        Schema::table('bank_information', function (Blueprint $table) {
            $table->string('account_number')->nullable(false)->change();
        });
    }
};
