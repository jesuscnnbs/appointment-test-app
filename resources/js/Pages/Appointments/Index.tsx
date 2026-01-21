import { Link, usePage } from '@inertiajs/react';
import MainLayout from '@/Layouts/MainLayout';
import FilterBar from '@/Components/FilterBar/FilterBar';
import Pagination from '@/Components/Pagination/Pagination';
import { Appointment, PaginatedData } from '@/types';
import Table from '@/Components/Table/Table';
import Loader from '@/Components/Loader/Cardio';

function Index() {
  const { appointments, filters } = usePage<{
    appointments: PaginatedData<Appointment>;
    filters: { search?: string; estado?: string; fecha_desde?: string; fecha_hasta?: string };
  }>().props;

  if (!appointments) {
    return <Loader />;
  }

  const {
    data,
    meta: { links }
  } = appointments;

  const getEstadoBadge = (estado: string) => {
    const colors = {
      pendiente: 'bg-yellow-100 text-yellow-800',
      confirmada: 'bg-blue-100 text-blue-800',
      realizada: 'bg-green-100 text-green-800',
      cancelada: 'bg-red-100 text-red-800'
    };

    return (
      <span className={`px-2 py-1 text-xs font-semibold rounded-full ${colors[estado as keyof typeof colors]}`}>
        {estado.charAt(0).toUpperCase() + estado.slice(1)}
      </span>
    );
  };

  const exportUrl = route('appointments.export', filters);

  return (
    <div>
      <h1 className="mb-8 text-3xl font-bold">Appointments</h1>
      <div className="flex items-center justify-between mb-6">
        <FilterBar />
        <div className="flex gap-2">
          <a
            className="btn-indigo focus:outline-none"
            href={exportUrl}
            download
          >
            <span>Exportar</span>
            <span className="hidden md:inline">{" "}Excel</span>
          </a>
          <Link
            className="btn-indigo focus:outline-none"
            href={route('appointments.create')}
          >
            <span>Crear</span>
            <span className="hidden md:inline">{" "}Appointments</span>
          </Link>
        </div>
      </div>
      <Table
        columns={[
          {
            label: 'Fecha',
            name: 'fecha',
            renderCell: row => new Date(row.fecha).toLocaleDateString('es-ES')
          },
          { label: 'Hora', name: 'hora_inicio' },
          { label: 'Cliente', name: 'client', renderCell: row => row.client?.razon_social || '-' },
          {
            label: 'Estado',
            name: 'estado',
            renderCell: row => getEstadoBadge(row.estado)
          },
          {
            label: 'Reconocimientos',
            name: 'reconocimientos',
            renderCell: row => `${row.reconocimientos_realizados}/${row.reconocimientos_reservados}`,
            colSpan: 2
          }
        ]}
        rows={data}
        getRowDetailsUrl={row => route('appointments.edit', row.id)}
      />
      <Pagination links={links} />
    </div>
  );
}

/**
 * Persistent Layout (Inertia.js)
 *
 * [Learn more](https://inertiajs.com/pages#persistent-layouts)
 */
Index.layout = (page: React.ReactNode) => (
  <MainLayout title="Appointments" children={page} />
);

export default Index;
