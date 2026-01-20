import { Appointment } from '@/types';
import Table from '@/Components/Table/Table';
import { Link } from '@inertiajs/react';

interface DoctorDashboardProps {
  appointments: Appointment[];
}

export default function DoctorDashboard({ appointments }: DoctorDashboardProps) {
  const sortedAppointments = [...appointments].sort((a, b) => {
    return a.hora_inicio.localeCompare(b.hora_inicio);
  });

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

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold">Appointments de Hoy</h2>
        <Link
          className="btn-indigo focus:outline-none"
          href={route('appointments')}
        >
          Ver appointments
        </Link>
      </div>

      {sortedAppointments.length === 0 ? (
        <div className="p-8 text-center bg-white rounded shadow">
          <p className="text-gray-500">No hay "appointments" programadas para hoy</p>
        </div>
      ) : (
        <Table
          columns={[
            {
              label: 'Hora',
              name: 'hora_inicio',
              renderCell: row => row.hora_inicio
            },
            {
              label: 'Cliente',
              name: 'client',
              renderCell: row => row.client?.razon_social || '-'
            },
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
          rows={sortedAppointments}
          getRowDetailsUrl={row => route('appointments.edit', row.id)}
        />
      )}
    </div>
  );
}
