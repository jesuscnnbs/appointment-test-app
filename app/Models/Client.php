<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Client extends Model
{
    protected $fillable = [
        'codigo',
        'razon_social',
        'cif',
        'direccion',
        'municipio',
        'provincia',
        'fecha_inicio_contrato',
        'fecha_expiracion_contrato',
        'reconocimientos_incluidos',
        'role',
    ];

    protected $casts = [
        'fecha_inicio_contrato' => 'date',
        'fecha_expiracion_contrato' => 'date',
        'reconocimientos_incluidos' => 'integer',
    ];

    /**
     * Get the appointments for the client.
     */
    public function appointments(): HasMany
    {
        return $this->hasMany(Appointment::class);
    }
}
