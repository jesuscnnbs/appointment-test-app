<?php

namespace App\Exports;

use App\Models\Client;
use Maatwebsite\Excel\Concerns\FromQuery;
use Maatwebsite\Excel\Concerns\WithHeadings;
use Maatwebsite\Excel\Concerns\WithMapping;
use Maatwebsite\Excel\Concerns\ShouldAutoSize;
use Maatwebsite\Excel\Concerns\WithChunkReading;

class ClientsExport implements FromQuery, WithHeadings, WithMapping, ShouldAutoSize, WithChunkReading
{
    protected $search;
    protected $municipio;

    public function __construct($search = null, $municipio = null)
    {
        $this->search = $search;
        $this->municipio = $municipio;
    }

    /**
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function query()
    {
        return Client::query()
            ->when($this->search, function ($query, $search) {
                $query->where(function ($q) use ($search) {
                    $q->where('razon_social', 'like', "%{$search}%")
                      ->orWhere('codigo', 'like', "%{$search}%")
                      ->orWhere('cif', 'like', "%{$search}%");
                });
            })
            ->when($this->municipio, function ($query, $municipio) {
                $query->where('municipio', 'like', "%{$municipio}%");
            })
            ->orderBy('razon_social');
    }

    /**
     * @return int
     */
    public function chunkSize(): int
    {
        return 1000; // Process 1000 rows at a time
    }

    /**
     * @return array
     */
    public function headings(): array
    {
        return [
            'Código',
            'Razón Social',
            'CIF',
            'Dirección',
            'Municipio',
            'Provincia',
            'Fecha Inicio Contrato',
            'Fecha Expiración Contrato',
            'Reconocimientos Incluidos',
        ];
    }

    /**
     * @param Client $client
     * @return array
     */
    public function map($client): array
    {
        return [
            $client->codigo,
            $client->razon_social,
            $client->cif,
            $client->direccion,
            $client->municipio,
            $client->provincia,
            $client->fecha_inicio_contrato?->format('Y-m-d'),
            $client->fecha_expiracion_contrato?->format('Y-m-d'),
            $client->reconocimientos_incluidos,
        ];
    }
}
