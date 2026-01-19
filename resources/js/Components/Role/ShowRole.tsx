import { usePage } from '@inertiajs/react';

export default function ShowRole() {
  const { auth } = usePage().props as unknown as { auth: { user?: { role: string } } };
  const userRole = auth.user?.role; // 'admin' | 'reservation' | 'doctor'

  return (
    <div>
      <p>Tu rol: {userRole}</p>
    </div>
  );
}
