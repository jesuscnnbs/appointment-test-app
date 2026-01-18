<?php

namespace App\Http\Controllers;

use App\Http\Resources\ClientCollection;
use App\Models\Client;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Facades\Request;
use Inertia\Inertia;
use Inertia\Response;

class ClientsController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('Clients/Index', [
            'filters' => Request::all('search'),
            'clients' => new ClientCollection(
                Client::query()
                    ->orderBy('razon_social')
                    ->when(Request::input('search'), function ($query, $search) {
                        $query->where('razon_social', 'like', "%{$search}%")
                            ->orWhere('codigo', 'like', "%{$search}%")
                            ->orWhere('cif', 'like', "%{$search}%");
                    })
                    ->paginate(10)
                    ->appends(Request::all())
            ),
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('Clients/Create');
    }

    public function store(Request $request): RedirectResponse
    {
        $validated = Request::validate([
            'codigo' => ['required', 'string', 'max:255', 'unique:clients'],
            'razon_social' => ['required', 'string', 'max:255'],
            'cif' => ['required', 'string', 'max:255', 'unique:clients'],
            'direccion' => ['required', 'string', 'max:255'],
            'municipio' => ['required', 'string', 'max:255'],
            'provincia' => ['required', 'string', 'max:255'],
            'fecha_inicio_contrato' => ['required', 'date'],
            'fecha_expiracion_contrato' => ['required', 'date'],
            'reconocimientos_incluidos' => ['required', 'integer', 'min:0'],
        ]);

        Client::create($validated);

        return Redirect::route('clients')->with('success', 'Client created.');
    }

    public function edit(Client $client): Response
    {
        return Inertia::render('Clients/Edit', [
            'client' => [
                'id' => $client->id,
                'codigo' => $client->codigo,
                'razon_social' => $client->razon_social,
                'cif' => $client->cif,
                'direccion' => $client->direccion,
                'municipio' => $client->municipio,
                'provincia' => $client->provincia,
                'fecha_inicio_contrato' => $client->fecha_inicio_contrato->format('Y-m-d'),
                'fecha_expiracion_contrato' => $client->fecha_expiracion_contrato->format('Y-m-d'),
                'reconocimientos_incluidos' => $client->reconocimientos_incluidos,
            ],
        ]);
    }

    public function update(Client $client): RedirectResponse
    {
        $validated = Request::validate([
            'codigo' => ['required', 'string', 'max:255', 'unique:clients,codigo,' . $client->id],
            'razon_social' => ['required', 'string', 'max:255'],
            'cif' => ['required', 'string', 'max:255', 'unique:clients,cif,' . $client->id],
            'direccion' => ['required', 'string', 'max:255'],
            'municipio' => ['required', 'string', 'max:255'],
            'provincia' => ['required', 'string', 'max:255'],
            'fecha_inicio_contrato' => ['required', 'date'],
            'fecha_expiracion_contrato' => ['required', 'date'],
            'reconocimientos_incluidos' => ['required', 'integer', 'min:0'],
        ]);

        $client->update($validated);

        return Redirect::back()->with('success', 'Client updated.');
    }

    public function destroy(Client $client): RedirectResponse
    {
        $client->delete();

        return Redirect::back()->with('success', 'Client deleted.');
    }
}
