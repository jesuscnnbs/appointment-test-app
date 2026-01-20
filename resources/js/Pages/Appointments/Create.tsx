import { Link, useForm, usePage } from '@inertiajs/react';
import MainLayout from '@/Layouts/MainLayout';
import Form from '@/Components/Appointments/Form';

const Create = () => {
  const { clients } = usePage<{
    clients: Array<{
      id: number;
      razon_social: string;
      codigo: string;
      reconocimientos_stats?: {
        incluidos: number;
        realizados: number;
        reservados: number;
        comprometidos: number;
        disponibles: number;
        porcentaje_uso: number;
      };
    }>;
  }>().props;

  const { data, setData, errors, post, processing } = useForm({
    client_id: '',
    fecha: '',
    reconocimientos_reservados: 0,
    reconocimientos_realizados: 0,
    hora_inicio: '',
    estado: 'pendiente' as 'pendiente' | 'confirmada' | 'realizada' | 'cancelada',
    notas: ''
  });

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    post(route('appointments.store'));
  }

  return (
    <div>
      <div>
        <h1 className="mb-8 text-3xl font-bold">
          <Link
            href={route('appointments')}
            className="text-indigo-600 hover:text-indigo-700"
          >
            Appointments
          </Link>
          <span className="font-medium text-indigo-600"> /</span> Create
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
          submitLabel="Crear Appointment"
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
  <MainLayout title="Crear Appointment" children={page} />
);

export default Create;
