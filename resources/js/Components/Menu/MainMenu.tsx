import MainMenuItem from '@/Components/Menu/MainMenuItem';
import { Building, CalendarCheck, CircleGauge } from 'lucide-react';

interface MainMenuProps {
  className?: string;
}

export default function MainMenu({ className }: MainMenuProps) {
  return (
    <div className={className}>
      <MainMenuItem
        text="Dashboard"
        link="dashboard"
        icon={<CircleGauge size={20} />}
      />
      <MainMenuItem
        text="Clients"
        link="clients"
        icon={<Building size={20} />}
      />
      <MainMenuItem
        text="Appointments"
        link="appointments"
        icon={<CalendarCheck size={20} />}
      />
    </div>
  );
}
