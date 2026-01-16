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
        Schema::create('appointments', function (Blueprint $table) {
            $table->id();
            $table->foreignId('client_id')->constrained('clients')->onDelete('cascade');
            $table->date('fecha');
            $table->integer('reconocimientos_reservados')->default(0);
            $table->integer('reconocimientos_realizados')->default(0);
            $table->time('hora_inicio');
            $table->enum('estado', ['pendiente', 'confirmada', 'realizada', 'cancelada'])->default('pendiente');
            $table->text('notas')->nullable();
            $table->timestamps();

            // Índices para búsquedas frecuentes
            $table->index(['fecha', 'estado']);
            $table->index(['client_id', 'fecha']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('appointments');
    }
};
