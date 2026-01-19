import MainMenuItem from '@/Components/Menu/MainMenuItem';
import { usePage } from '@inertiajs/react';
import { Building, CalendarCheck, CircleGauge } from 'lucide-react';
import { canViewClients, canViewAppointments } from '@/utils/permissions';
import { User } from '@/types';
interface MainMenuProps {
  className?: string;
}

export default function MainMenu({ className }: MainMenuProps) {
  const { auth } = usePage().props as unknown as { auth: { user?: User } };
  return (
    <div className={className}>
      <MainMenuItem
        text="Dashboard"
        link="dashboard"
        icon={<CircleGauge size={20} />}
      />
      {canViewClients(auth.user!) && (
        <MainMenuItem
          text="Clients"
          link="clients"
          icon={<Building size={20} />}
        />
      )}
      {canViewAppointments(auth.user!) && (
        <MainMenuItem
          text="Appointments"
          link="appointments"
          icon={<CalendarCheck size={20} />}
        />
      )}
    </div>
  );
}
