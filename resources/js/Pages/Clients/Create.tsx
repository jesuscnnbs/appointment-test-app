import { Link, useForm } from '@inertiajs/react';
import MainLayout from '@/Layouts/MainLayout';
import Form from '@/Components/Clients/Form';

const Create = () => {
  const { data, setData, errors, post, processing } = useForm({
    codigo: '',
    razon_social: '',
    cif: '',
    direccion: '',
    municipio: '',
    provincia: '',
    fecha_inicio_contrato: '',
    fecha_expiracion_contrato: '',
    reconocimientos_incluidos: 0
  });

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    post(route('clients.store'));
  }

  return (
    <div>
      <div>
        <h1 className="mb-8 text-3xl font-bold">
          <Link
            href={route('clients')}
            className="text-indigo-600 hover:text-indigo-700"
          >
            Clients
          </Link>
          <span className="font-medium text-indigo-600"> /</span> Create
        </h1>
      </div>
      <div className="max-w-3xl overflow-hidden bg-white rounded shadow">
        <Form
          data={data}
          errors={errors}
          processing={processing}
          onSubmit={handleSubmit}
          onChange={(field, value) => setData(field, value)}
          submitLabel="Create Client"
        />
      </div>
    </div>
  );
};

/**
 * Persistent Layout (Inertia.js)
 *
 * [Learn more](https://inertiajs.com/pages#persistent-layouts)
 */
Create.layout = (page: React.ReactNode) => (
  <MainLayout title="Create Client" children={page} />
);

export default Create;
