<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\ResourceCollection;

class ClientCollection extends ResourceCollection
{
    /**
     * Transform the resource collection into an array.
     *
     * @return array<int|string, mixed>
     */
    public function toArray(Request $request): array
    {
        return $this->collection->map(function ($client) {
            $incluidos = $client->reconocimientos_incluidos;
            $realizados = $client->reconocimientos_realizados_sum ?? 0;
            $reservados = $client->reconocimientos_reservados_sum ?? 0;
            $comprometidos = $realizados + $reservados;
            $disponibles = max(0, $incluidos - $comprometidos);

            return [
                'id' => $client->id,
                'codigo' => $client->codigo,
                'razon_social' => $client->razon_social,
                'cif' => $client->cif,
                'direccion' => $client->direccion,
                'municipio' => $client->municipio,
                'provincia' => $client->provincia,
                'fecha_inicio_contrato' => $client->fecha_inicio_contrato,
                'fecha_expiracion_contrato' => $client->fecha_expiracion_contrato,
                'reconocimientos_incluidos' => $incluidos,
                'reconocimientos_realizados' => $realizados,
                'reconocimientos_reservados' => $reservados,
                'reconocimientos_comprometidos' => $comprometidos,
                'reconocimientos_disponibles' => $disponibles,
            ];
        })->toArray();
    }
}
