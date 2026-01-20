<?php

namespace App\Http\Controllers;

use App\Exports\AppointmentsExport;
use App\Http\Resources\AppointmentCollection;
use App\Models\Appointment;
use App\Models\Client;
use App\Services\ClientService;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Facades\Request;
use Inertia\Inertia;
use Inertia\Response;
use Maatwebsite\Excel\Facades\Excel;
use Symfony\Component\HttpFoundation\BinaryFileResponse;

class AppointmentsController extends Controller
{
    public function __construct(
        protected ClientService $clientService
    ) {
    }
    public function index(): Response
    {
        return Inertia::render('Appointments/Index', [
            'filters' => Request::all('search', 'estado'),
            'appointments' => new AppointmentCollection(
                Appointment::query()
                    ->with('client:id,razon_social')
                    ->orderBy('fecha', 'desc')
                    ->orderBy('hora_inicio', 'desc')
                    ->when(Request::input('search'), function ($query, $search) {
                        $query->whereHas('client', function ($q) use ($search) {
                            $q->where('razon_social', 'like', "%{$search}%")
                              ->orWhere('codigo', 'like', "%{$search}%");
                        });
                    })
                    ->when(Request::input('estado'), function ($query, $estado) {
                        $query->where('estado', $estado);
                    })
                    ->paginate(10)
                    ->appends(Request::all())
            ),
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('Appointments/Create', [
            'clients' => Client::orderBy('razon_social')
                ->get()
                ->map(function ($client) {
                    return [
                        'id' => $client->id,
                        'razon_social' => $client->razon_social,
                        'codigo' => $client->codigo,
                        'reconocimientos_stats' => $this->clientService->getEstadisticasReconocimientos($client),
                    ];
                }),
        ]);
    }

    public function store(): RedirectResponse
    {
        $validated = Request::validate([
            'client_id' => ['required', 'exists:clients,id'],
            'fecha' => ['required', 'date'],
            'reconocimientos_reservados' => ['required', 'integer', 'min:1'],
            'reconocimientos_realizados' => ['required', 'integer', 'min:0'],
            'hora_inicio' => ['required', 'date_format:H:i'],
            'estado' => ['required', 'in:pendiente,confirmada,realizada,cancelada'],
            'notas' => ['nullable', 'string'],
        ]);

        Appointment::create($validated);

        return Redirect::route('appointments')->with('success', 'Appointment created.');
    }

    public function edit(Appointment $appointment): Response
    {
        return Inertia::render('Appointments/Edit', [
            'appointment' => [
                'id' => $appointment->id,
                'client_id' => $appointment->client_id,
                'fecha' => $appointment->fecha->format('Y-m-d'),
                'reconocimientos_reservados' => $appointment->reconocimientos_reservados,
                'reconocimientos_realizados' => $appointment->reconocimientos_realizados,
                'hora_inicio' => $appointment->hora_inicio->format('H:i'),
                'estado' => $appointment->estado,
                'notas' => $appointment->notas,
            ],
            'clients' => Client::orderBy('razon_social')
                ->get()
                ->map(function ($client) {
                    return [
                        'id' => $client->id,
                        'razon_social' => $client->razon_social,
                        'codigo' => $client->codigo,
                        'reconocimientos_stats' => $this->clientService->getEstadisticasReconocimientos($client),
                    ];
                }),
            'clientStats' => $this->clientService->getEstadisticasReconocimientos($appointment->client),
        ]);
    }

    public function update(Appointment $appointment): RedirectResponse
    {
        $validated = Request::validate([
            'client_id' => ['required', 'exists:clients,id'],
            'fecha' => ['required', 'date'],
            'reconocimientos_reservados' => ['required', 'integer', 'min:1'],
            'reconocimientos_realizados' => ['required', 'integer', 'min:0'],
            'hora_inicio' => ['required', 'date_format:H:i'],
            'estado' => ['required', 'in:pendiente,confirmada,realizada,cancelada'],
            'notas' => ['nullable', 'string'],
        ]);

        $appointment->update($validated);

        return Redirect::back()->with('success', 'Appointment updated.');
    }

    public function destroy(Appointment $appointment): RedirectResponse
    {
        $appointment->delete();

        return Redirect::back()->with('success', 'Appointment deleted.');
    }

    public function export(): BinaryFileResponse
    {
        ini_set('memory_limit', '512M');

        $search = Request::input('search');
        $estado = Request::input('estado');
        $filename = 'appointments_' . now()->format('Y-m-d_His') . '.xlsx';

        return Excel::download(new AppointmentsExport($search, $estado), $filename);
    }
}
