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
            $utilizados = $client->appointments_reconocimientos_realizados_sum ?? 0;
            $incluidos = $client->reconocimientos_incluidos;
            $disponibles = max(0, $incluidos - $utilizados);

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
                'reconocimientos_utilizados' => $utilizados,
                'reconocimientos_disponibles' => $disponibles,
            ];
        })->toArray();
    }
}
