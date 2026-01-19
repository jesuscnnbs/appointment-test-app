<?php

use App\Http\Controllers\Auth\LoginController;
use App\Http\Controllers\ClientsController;
use App\Http\Controllers\AppointmentsController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\ImagesController;
use App\Http\Controllers\UsersController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

// Auth

Route::get('login', [LoginController::class, 'create'])
    ->name('login')
    ->middleware('guest');

Route::post('login', [LoginController::class, 'store'])
    ->name('login.store')
    ->middleware('guest');

Route::delete('logout', [LoginController::class, 'destroy'])
    ->name('logout');

// Dashboard

Route::get('/', [DashboardController::class, 'index'])
    ->name('dashboard')
    ->middleware('auth');

// Users

Route::get('users', [UsersController::class, 'index'])
    ->name('users')
    ->middleware('auth', 'role:admin');

Route::get('users/create', [UsersController::class, 'create'])
    ->name('users.create')
    ->middleware('auth', 'role:admin');

Route::post('users', [UsersController::class, 'store'])
    ->name('users.store')
    ->middleware('auth', 'role:admin');

Route::get('users/{user}/edit', [UsersController::class, 'edit'])
    ->name('users.edit')
    ->middleware('auth', 'role:admin');

Route::put('users/{user}', [UsersController::class, 'update'])
    ->name('users.update')
    ->middleware('auth', 'role:admin');

Route::delete('users/{user}', [UsersController::class, 'destroy'])
    ->name('users.destroy')
    ->middleware('auth', 'role:admin');

Route::put('users/{user}/restore', [UsersController::class, 'restore'])
    ->name('users.restore')
    ->middleware('auth', 'role:admin');

// Clients

Route::get('clients', [ClientsController::class, 'index'])
    ->name('clients')
    ->middleware('auth');

Route::get('clients/create', [ClientsController::class, 'create'])
    ->name('clients.create')
    ->middleware('auth', 'role:admin,reservation');

Route::post('clients', [ClientsController::class, 'store'])
    ->name('clients.store')
    ->middleware('auth', 'role:admin,reservation');

Route::get('clients/{client}/edit', [ClientsController::class, 'edit'])
    ->name('clients.edit')
    ->middleware('auth', 'role:admin,reservation');

Route::put('clients/{client}', [ClientsController::class, 'update'])
    ->name('clients.update')
    ->middleware('auth', 'role:admin,reservation');

Route::delete('clients/{client}', [ClientsController::class, 'destroy'])
    ->name('clients.destroy')
    ->middleware('auth', 'role:admin,reservation');

// Appointments

Route::get('appointments', [AppointmentsController::class, 'index'])
    ->name('appointments')
    ->middleware('auth', 'role:admin,reservation,doctor');

Route::get('appointments/create', [AppointmentsController::class, 'create'])
    ->name('appointments.create')
    ->middleware('auth', 'role:admin,reservation,doctor');
Route::post('appointments', [AppointmentsController::class, 'store'])
    ->name('appointments.store')
    ->middleware('auth', 'role:admin,reservation,doctor');

Route::get('appointments/{appointment}/edit', [AppointmentsController::class, 'edit'])
    ->name('appointments.edit')
    ->middleware('auth', 'role:admin,reservation,doctor');

Route::put('appointments/{appointment}', [AppointmentsController::class, 'update'])
    ->name('appointments.update')
    ->middleware('auth', 'role:admin,reservation,doctor');

Route::delete('appointments/{appointment}', [AppointmentsController::class, 'destroy'])
    ->name('appointments.destroy')
    ->middleware('auth', 'role:admin,reservation,doctor');

// Images

Route::get('/img/{path}', [ImagesController::class, 'show'])
    ->where('path', '.*')
    ->name('image');
