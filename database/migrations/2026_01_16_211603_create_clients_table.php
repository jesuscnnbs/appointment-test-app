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
        Schema::create('clients', function (Blueprint $table) {
            $table->id();
            $table->string('codigo')->unique();
            $table->string('razon_social');
            $table->string('cif')->unique();
            $table->string('direccion');
            $table->string('municipio');
            $table->string('provincia');
            $table->date('fecha_inicio_contrato');
            $table->date('fecha_expiracion_contrato');
            $table->integer('reconocimientos_incluidos')->default(0);
            $table->enum('role', ['admin', 'cliente', 'medico'])->default('cliente');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('clients');
    }
};
