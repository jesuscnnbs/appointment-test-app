import {User} from "@/types";

// Clients
export function canManageClients(user: User): boolean {
  return user.role === 'admin' || user.role === 'reservation';
}

export function canViewClients(user: User): boolean {
  return user.role === 'admin' || user.role === 'reservation';
}


// Appointments
export function canCreateAppointments(user: User): boolean {
  return user.role === 'admin' || user.role === 'doctor' || user.role === 'reservation';
}

export function canEditAppointments(user: User): boolean {
  return user.role === 'admin' || user.role === 'doctor';
}

export function canViewAppointments(user: User): boolean {
  return user.role === 'admin' || user.role === 'doctor' || user.role === 'reservation';
}

// Dashboard
export function canAccessReservationDashboard(user: User | null): boolean {
  return user?.role === 'admin' || user?.role === 'reservation';
}

export function canAccessDoctorDashboard(user: User | null): boolean {
  return user?.role === 'admin' || user?.role === 'doctor';
}

// Roles
export function isAdmin(user: User | null): boolean {
  return user?.role === 'admin';
}

export function isDoctor(user: User | null): boolean {
  return user?.role === 'doctor';
}

export function isReservation(user: User | null): boolean {
  return user?.role === 'reservation';
}
