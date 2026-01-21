# RESERVEYTE CRM Laravel + React + Inertia

A fork of a demo application to illustrate how [Inertia.js](https://inertiajs.com/) works with [Laravel](https://laravel.com/) and [React](https://reactjs.org/).

![](https://raw.githubusercontent.com/liorocks/pingcrm-react/master/screenshot.png)

## Installation

Clone the repo locally:

```sh
git clone https://github.com/jesuscnnbs/appointment-test-app.git
cd appointment-test-app
```

Install PHP dependencies:

```sh
composer install
```

Install NPM dependencies:

```sh
npm install
```

Build assets:

```sh
npm run dev
```

Setup configuration:

```sh
cp .env.example .env
```

Generate application key:

```sh
php artisan key:generate
```

Create an SQLite database. You can also use another database (MySQL, Postgres), simply update your configuration accordingly.

```sh
touch database/database.sqlite
```

Run database migrations:

```sh
php artisan migrate
```

Run database seeder:

```sh
php artisan db:seed
```

Run artisan server:

```sh
php artisan serve
```

You're ready to go! [RESERVEYTE](http://127.0.0.1:8000/) in your browser, and login with:

- **Username:** admin@example.com
- **Password:** secret

## Running tests

To run the RESERVEYTE tests, run:

```
php artisan test
```

## Credits

- Original work by Jonathan Reinink (@reinink) and contributors
- Port to Ruby on Rails by Georg Ledermann (@ledermann)
- Port to React by Lio (@liorocks)
- Reservation test app (@jesuscnnbs)

### Modelos (Algunos comandos utilizados para crear modelos y controladores)
No hay que ejecutarlos en local.

Creamos el modelo Cliente con migración
```
php artisan make:model Client -m
```
Creamos el modelo Cita con migración

```
php artisan make:model Appointment -m
```

Crear controladores

```
php artisan make:controller ClientsController

php artisan make:controller AppointmentsController
```

Crear Collections
```
php artisan make:resource ClientCollection

php artisan make:resource AppointmentCollection
```


### Permisos por rol

|Funcionalidad|Admin|Reservas|Médico|
|---|---|---|---|
|Dashboard|✅|✅|✅|
|Listar Clientes|✅|✅|❌|
|Crear/editar clientes|✅|❌|❌|
|Exportar clientes|✅|✅|❌|
|Listar todas las citas|✅|✅|❌|
|Exportar citas|✅|✅|❌|
|Ver citas del día|✅|✅|✅|
|Registrar reconocimientos|✅|❌|✅|
|Crear citas|✅|✅|❌|
|Editar citas|✅|✅|✅|
