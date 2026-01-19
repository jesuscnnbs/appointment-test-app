import React from 'react';
import { Head, Link, usePage, useForm, router } from '@inertiajs/react';
import MainLayout from '@/Layouts/MainLayout';
import DeleteButton from '@/Components/Button/DeleteButton';
import Form from '@/Components/Clients/Form';
import { Client } from '@/types';

const Edit = () => {
  const { client } = usePage<{
    client: Client;
  }>().props;

  const { data, setData, errors, post, processing } = useForm({
    codigo: client.codigo || '',
    razon_social: client.razon_social || '',
    cif: client.cif || '',
    direccion: client.direccion || '',
    municipio: client.municipio || '',
    provincia: client.provincia || '',
    fecha_inicio_contrato: client.fecha_inicio_contrato || '',
    fecha_expiracion_contrato: client.fecha_expiracion_contrato || '',
    reconocimientos_incluidos: client.reconocimientos_incluidos || 0,

    // NOTE: When working with Laravel PUT/PATCH requests and FormData
    // you SHOULD send POST request and fake the PUT request like this.
    _method: 'put'
  });

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    // NOTE: We are using POST method here, not PUT/PATCH. See comment above.
    post(route('clients.update', client.id));
  }

  function destroy() {
    if (confirm('Are you sure you want to delete this client?')) {
      router.delete(route('clients.destroy', client.id));
    }
  }

  return (
    <div>
      <Head title={client.razon_social} />
      <div className="flex justify-start max-w-lg mb-8">
        <h1 className="text-3xl font-bold">
          <Link
            href={route('clients')}
            className="text-indigo-600 hover:text-indigo-700"
          >
            Clients
          </Link>
          <span className="mx-2 font-medium text-indigo-600">/</span>
          {client.razon_social}
        </h1>
      </div>
      <div className="max-w-3xl overflow-hidden bg-white rounded shadow">
        <Form
          data={data}
          errors={errors}
          processing={processing}
          onSubmit={handleSubmit}
          onChange={(field, value) => setData(field, value)}
          submitLabel="Update Client"
        />
        <div className="flex items-center px-8 py-4 bg-gray-100 border-t border-gray-200">
          <DeleteButton onDelete={destroy}>
            Delete Client
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
  <MainLayout title="Edit Client" children={page} />
);

export default Edit;
