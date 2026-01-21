import { Link, usePage } from '@inertiajs/react';
import MainLayout from '@/Layouts/MainLayout';
import FilterBar from '@/Components/FilterBar/FilterBar';
import Pagination from '@/Components/Pagination/Pagination';
import { Client, PaginatedData } from '@/types';
import Table from '@/Components/Table/Table';
import Loader from '@/Components/Loader/Cardio';

function Index() {
  const { clients, filters } = usePage<{
    clients: PaginatedData<Client>;
    filters: { search?: string; municipio?: string };
  }>().props;

  if (!clients) {
    return <Loader />;
  }

  const {
    data,
    meta: { links }
  } = clients;

  const exportUrl = route('clients.export', filters);

  return (
    <div>
      <h1 className="mb-8 text-3xl font-bold">Clients</h1>
      <div className="flex items-center justify-between mb-6">
        <FilterBar />
        <div className="flex gap-2">
          <a
            className="btn-indigo focus:outline-none"
            href={exportUrl}
            download
          >
            <span>Exportar</span>
            <span className="hidden md:inline"> Excel</span>
          </a>
          <Link
            className="btn-indigo focus:outline-none"
            href={route('clients.create')}
          >
            <span>Crear</span>
            <span className="hidden md:inline"> Client</span>
          </Link>
        </div>
      </div>
      <Table
        columns={[
          { label: 'Código', name: 'codigo' },
          { label: 'Razón Social', name: 'razon_social' },
          { label: 'CIF', name: 'cif' },
          { label: 'Municipio', name: 'municipio' },
          { label: 'Provincia', name: 'provincia', colSpan: 2 }
        ]}
        rows={data}
        getRowDetailsUrl={row => route('clients.edit', row.id)}
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
  <MainLayout title="Clientes" children={page} />
);

export default Index;
