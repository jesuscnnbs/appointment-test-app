<?php

namespace Database\Seeders;

use App\Models\Client;
use App\Models\Appointment;
use App\Models\User;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // Create admin user
        User::factory()->create([
            'first_name' => 'Admin',
            'last_name' => 'User',
            'email' => 'admin@example.com',
            'password' => 'secret',
            'role' => 'admin',
            'owner' => true,
        ]);

        // Create reservation users
        User::factory(3)->create([
            'role' => 'reservation',
        ]);

        // Create doctor users
        User::factory(2)->create([
            'role' => 'doctor',
        ]);

        // Create clients with appointments (reduced for demo)
        Client::factory(50)
            ->create()
            ->each(function ($client) {
                // Each client has 3-5 appointments (random)
                Appointment::factory(rand(3, 5))->create([
                    'client_id' => $client->id,
                ]);
            });
    }
}
