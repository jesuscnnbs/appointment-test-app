<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Client>
 */
class ClientFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $fechaInicio = fake()->dateTimeBetween('-2 years', '-6 months');

        return [
            'codigo' => fake()->unique()->regexify('[A-Z]{3}[0-9]{5}'),
            'razon_social' => fake()->company(),
            'cif' => fake()->unique()->regexify('[A-Z][0-9]{8}'),
            'direccion' => fake()->streetAddress(),
            'municipio' => fake()->city(),
            'provincia' => fake()->randomElement([
                'Madrid', 'Barcelona', 'Valencia', 'Sevilla', 'Zaragoza',
                'Málaga', 'Murcia', 'Palma', 'Las Palmas', 'Bilbao'
            ]),
            'fecha_inicio_contrato' => $fechaInicio,
            'fecha_expiracion_contrato' => fake()->dateTimeBetween($fechaInicio, '+2 years'),
            'reconocimientos_incluidos' => fake()->numberBetween(10, 100),
        ];
    }
}
