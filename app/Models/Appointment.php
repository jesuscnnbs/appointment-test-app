<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Appointment extends Model
{
    protected $fillable = [
        'client_id',
        'fecha',
        'reconocimientos_reservados',
        'reconocimientos_realizados',
        'hora_inicio',
        'estado',
        'notas',
    ];

    protected $casts = [
        'fecha' => 'date',
        'hora_inicio' => 'datetime:H:i',
        'reconocimientos_reservados' => 'integer',
        'reconocimientos_realizados' => 'integer',
    ];

    /**
     * Get the client that owns the appointment.
     */
    public function client(): BelongsTo
    {
        return $this->belongsTo(Client::class);
    }
}
