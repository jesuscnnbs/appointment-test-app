<?php

namespace App\Services;

use App\Models\Client;

class ClientService
{
    /**
     * Calcula el número total de reconocimientos realizados (estado = 'realizada').
     *
     * @param Client $client
     * @return int
     */
    public function getReconocimientosRealizados(Client $client): int
    {
        return $client->appointments()
            ->where('estado', 'realizada')
            ->sum('reconocimientos_realizados');
    }

    /**
     * Calcula los reconocimientos reservados (pendientes + confirmadas, NO canceladas).
     *
     * @param Client $client
     * @return int
     */
    public function getReconocimientosReservados(Client $client): int
    {
        return $client->appointments()
            ->whereIn('estado', ['pendiente', 'confirmada'])
            ->sum('reconocimientos_reservados');
    }

    /**
     * Calcula el total comprometido (realizados + reservados pendientes).
     *
     * @param Client $client
     * @return int
     */
    public function getReconocimientosComprometidos(Client $client): int
    {
        return $this->getReconocimientosRealizados($client)
             + $this->getReconocimientosReservados($client);
    }

    /**
     * Calcula los reconocimientos disponibles (incluidos - comprometidos).
     *
     * @param Client $client
     * @return int
     */
    public function getReconocimientosDisponibles(Client $client): int
    {
        $comprometidos = $this->getReconocimientosComprometidos($client);
        return max(0, $client->reconocimientos_incluidos - $comprometidos);
    }

    /**
     * Verifica si el cliente tiene reconocimientos disponibles.
     *
     * @param Client $client
     * @param int $cantidad
     * @return bool
     */
    public function tieneReconocimientosDisponibles(Client $client, int $cantidad = 1): bool
    {
        return $this->getReconocimientosDisponibles($client) >= $cantidad;
    }

    /**
     * Obtiene estadísticas completas de reconocimientos para un cliente.
     *
     * @param Client $client
     * @return array
     */
    public function getEstadisticasReconocimientos(Client $client): array
    {
        $incluidos = $client->reconocimientos_incluidos;
        $realizados = $this->getReconocimientosRealizados($client);
        $reservados = $this->getReconocimientosReservados($client);
        $comprometidos = $realizados + $reservados;
        $disponibles = max(0, $incluidos - $comprometidos);

        return [
            'incluidos' => $incluidos,
            'realizados' => $realizados,
            'reservados' => $reservados,
            'comprometidos' => $comprometidos,
            'disponibles' => $disponibles,
            'porcentaje_uso' => $incluidos > 0 ? round(($comprometidos / $incluidos) * 100, 2) : 0,
        ];
    }
}
