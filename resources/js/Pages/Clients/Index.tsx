import { Link, usePage } from '@inertiajs/react';
import MainLayout from '@/Layouts/MainLayout';
import FilterBar from '@/Components/FilterBar/FilterBar';
import Pagination from '@/Components/Pagination/Pagination';
import { Client, PaginatedData } from '@/types';
import Table from '@/Components/Table/Table';
import Loader from '@/Components/Loader/Cardio';

function Index() {
  const { clients } = usePage<{
    clients: PaginatedData<Client>;
  }>().props;

  if (!clients) {
    return <Loader />;
  }

  const {
    data,
    meta: { links }
  } = clients;

  return (
    <div>
      <h1 className="mb-8 text-3xl font-bold">Clients</h1>
      <div className="flex items-center justify-between mb-6">
        <FilterBar />
        <Link
          className="btn-indigo focus:outline-none"
          href={route('clients.create')}
        >
          <span>Create</span>
          <span className="hidden md:inline"> Client</span>
        </Link>
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
  <MainLayout title="Clients" children={page} />
);

export default Index;
