<?php

namespace App\Exports;

use App\Models\Appointment;
use Maatwebsite\Excel\Concerns\FromQuery;
use Maatwebsite\Excel\Concerns\WithHeadings;
use Maatwebsite\Excel\Concerns\WithMapping;
use Maatwebsite\Excel\Concerns\ShouldAutoSize;
use Maatwebsite\Excel\Concerns\WithChunkReading;

class AppointmentsExport implements FromQuery, WithHeadings, WithMapping, ShouldAutoSize, WithChunkReading
{
    protected $search;
    protected $estado;

    public function __construct($search = null, $estado = null)
    {
        $this->search = $search;
        $this->estado = $estado;
    }

    /**
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function query()
    {
        return Appointment::query()
            ->with('client:id,razon_social,codigo')
            ->when($this->search, function ($query, $search) {
                $query->whereHas('client', function ($q) use ($search) {
                    $q->where('razon_social', 'like', "%{$search}%")
                      ->orWhere('codigo', 'like', "%{$search}%");
                });
            })
            ->when($this->estado, function ($query, $estado) {
                $query->where('estado', $estado);
            })
            ->orderBy('fecha', 'desc')
            ->orderBy('hora_inicio', 'desc');
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
            'Fecha',
            'Hora Inicio',
            'Cliente',
            'Código Cliente',
            'Estado',
            'Reconocimientos Reservados',
            'Reconocimientos Realizados',
            'Notas',
        ];
    }

    /**
     * @param Appointment $appointment
     * @return array
     */
    public function map($appointment): array
    {
        return [
            $appointment->fecha->format('Y-m-d'),
            $appointment->hora_inicio->format('H:i'),
            $appointment->client?->razon_social ?? '-',
            $appointment->client?->codigo ?? '-',
            ucfirst($appointment->estado),
            $appointment->reconocimientos_reservados,
            $appointment->reconocimientos_realizados,
            $appointment->notas ?? '',
        ];
    }
}
