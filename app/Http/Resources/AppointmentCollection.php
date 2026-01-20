<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\ResourceCollection;

class AppointmentCollection extends ResourceCollection
{
    /**
     * Transform the resource collection into an array.
     *
     * @return array<int|string, mixed>
     */
    public function toArray(Request $request): array
    {
        return $this->collection->map(fn ($appointment) => [
            'id' => $appointment->id,
            'client_id' => $appointment->client_id,
            'client' => $appointment->client ? [
                'id' => $appointment->client->id,
                'razon_social' => $appointment->client->razon_social,
            ] : null,
            'fecha' => $appointment->fecha,
            'reconocimientos_reservados' => $appointment->reconocimientos_reservados,
            'reconocimientos_realizados' => $appointment->reconocimientos_realizados,
            'hora_inicio' => $appointment->hora_inicio->format('H:i'),
            'estado' => $appointment->estado,
            'notas' => $appointment->notas,
        ])->toArray();
    }
}
