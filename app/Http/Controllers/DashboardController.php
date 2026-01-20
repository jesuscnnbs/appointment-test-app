<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Support\Facades\Request;
use App\Http\Resources\AppointmentCollection;
use App\Models\Appointment;
use Illuminate\Support\Facades\Auth;
class DashboardController extends Controller
{
    public function index(): Response
    {
        $user = Auth::user();
        $todaysAppointments = [];

        // If user is admin or doctor, get today's appointments
        if (in_array($user->role, ['admin', 'doctor','reservation'])) {
            $todaysAppointments = new AppointmentCollection(
                Appointment::query()
                    ->with('client:id,razon_social')
                    ->whereDate('fecha', today())
                    ->orderBy('hora_inicio', 'asc')
                    ->get()
            );
        }

        return Inertia::render('Dashboard/Index', [
            'appointments' => $todaysAppointments,
        ]);
    }
}
