import React from 'react';
import { Head, Link, usePage, useForm, router } from '@inertiajs/react';
import MainLayout from '@/Layouts/MainLayout';
import DeleteButton from '@/Components/Button/DeleteButton';
import Form from '@/Components/Appointments/Form';
import { Appointment } from '@/types';

const Edit = () => {
  const { appointment, clients } = usePage<{
    appointment: Appointment;
    clients: Array<{
      id: number;
      razon_social: string;
      codigo: string;
    }>;
  }>().props;

  const { data, setData, errors, post, processing } = useForm({
    client_id: appointment.client_id || '',
    fecha: appointment.fecha || '',
    reconocimientos_reservados: appointment.reconocimientos_reservados || 0,
    reconocimientos_realizados: appointment.reconocimientos_realizados || 0,
    hora_inicio: appointment.hora_inicio || '',
    estado: appointment.estado || 'pendiente' as 'pendiente' | 'confirmada' | 'realizada' | 'cancelada',
    notas: appointment.notas || '',

    // NOTE: When working with Laravel PUT/PATCH requests and FormData
    // you SHOULD send POST request and fake the PUT request like this.
    _method: 'put'
  });

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    // NOTE: We are using POST method here, not PUT/PATCH. See comment above.
    post(route('appointments.update', appointment.id));
  }

  function destroy() {
    if (confirm('Are you sure you want to delete this appointment?')) {
      router.delete(route('appointments.destroy', appointment.id));
    }
  }

  return (
    <div>
      <Head title={`Appointment #${appointment.id}`} />
      <div className="flex justify-start max-w-lg mb-8">
        <h1 className="text-3xl font-bold">
          <Link
            href={route('appointments')}
            className="text-indigo-600 hover:text-indigo-700"
          >
            Appointments
          </Link>
          <span className="mx-2 font-medium text-indigo-600">/</span>
          #{appointment.id} - {appointment.fecha}
        </h1>
      </div>
      <div className="max-w-3xl overflow-hidden bg-white rounded shadow">
        <Form
          data={data}
          clients={clients}
          errors={errors}
          processing={processing}
          onSubmit={handleSubmit}
          onChange={(field, value) => setData(field, value)}
          submitLabel="Update Appointment"
        />
        <div className="flex items-center px-8 py-4 bg-gray-100 border-t border-gray-200">
          <DeleteButton onDelete={destroy}>
            Delete Appointment
          </DeleteButton>
        </div>
      </div>
    </div>
  );
};

/**
 * Persistent Layout (Inertia.js)
 *
 * [Learn more](https://inertiajs.com/pages#persistent-layouts)
 */
Edit.layout = (page: React.ReactNode) => (
  <MainLayout title="Edit Appointment" children={page} />
);

export default Edit;
