<?php

namespace Database\Factories;

use App\Models\Client;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Appointment>
 */
class AppointmentFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $reconocimientosReservados = fake()->numberBetween(1, 20);
        $estado = fake()->randomElement(['pendiente', 'confirmada', 'realizada', 'cancelada']);

        // Si está realizada, tiene reconocimientos realizados, si no, puede tener algunos o ninguno
        $reconocimientosRealizados = $estado === 'realizada'
            ? $reconocimientosReservados
            : ($estado === 'pendiente' ? 0 : fake()->numberBetween(0, $reconocimientosReservados));

        return [
            'client_id' => Client::factory(),
            'fecha' => fake()->dateTimeBetween('-3 months', '+6 months'),
            'reconocimientos_reservados' => $reconocimientosReservados,
            'reconocimientos_realizados' => $reconocimientosRealizados,
            'hora_inicio' => fake()->time('H:i:s', '18:00'),
            'estado' => $estado,
            'notas' => fake()->optional(0.3)->sentence(),
        ];
    }
}
