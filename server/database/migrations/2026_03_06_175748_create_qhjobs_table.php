<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('qhjobs', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->string('company');
            $table->string('location');
            $table->string('category');
            $table->string('employment_type')->default('Full Time');
            $table->string('salary')->nullable();
            $table->text('description');
            $table->json('responsibilities')->nullable();
            $table->json('requirements')->nullable();
            $table->json('benefits')->nullable();
            $table->string('logo')->nullable();
            $table->boolean('is_active')->default(true);
            $table->timestamps();

            // Indexes for better query performance
            $table->index('category');
            $table->index('location');
            $table->index('employment_type');
            $table->index('is_active');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('qhjobs');
    }
};
