import { usePage } from '@inertiajs/react';
import MainLayout from '@/Layouts/MainLayout';
import DoctorDashboard from '@/Components/Dashboard/DoctorDashboard';
import { Appointment } from '@/types';

function DashboardPage() {
  const { appointments } = usePage<{
    appointments: Appointment[];
  }>().props;

  return (
    <div>
      <h1 className="mb-8 text-3xl font-bold">Dashboard</h1>
      <DoctorDashboard appointments={appointments} />
    </div>
  );
}

/**
 * Persistent Layout (Inertia.js)
 *
 * [Learn more](https://inertiajs.com/pages#persistent-layouts)
 */
DashboardPage.layout = (page: React.ReactNode) => (
  <MainLayout title="Dashboard" children={page} />
);

export default DashboardPage;
