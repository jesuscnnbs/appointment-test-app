import { Config } from 'ziggy-js';

export interface User {
  id: number;
  name: string;
  first_name: string;
  last_name: string;
  email: string;
  role: 'admin' | 'reservation' | 'doctor';
  owner: boolean;
  photo: string;
  deleted_at: string;
}

export interface Client {
  id: number;
  codigo: string;
  razon_social: string;
  cif: string;
  direccion: string;
  municipio: string;
  provincia: string;
  fecha_inicio_contrato: string;
  fecha_expiracion_contrato: string;
  reconocimientos_incluidos: number;
  reconocimientos_realizados?: number;
  reconocimientos_reservados?: number;
  reconocimientos_comprometidos?: number;
  reconocimientos_disponibles?: number;
  reconocimientos_stats?: {
    incluidos: number;
    realizados: number;
    reservados: number;
    comprometidos: number;
    disponibles: number;
    porcentaje_uso: number;
  };
  created_at: string;
  updated_at: string;
  appointments?: Appointment[];
}

export interface Appointment {
  id: number;
  client_id: number;
  fecha: string;
  reconocimientos_reservados: number;
  reconocimientos_realizados: number;
  hora_inicio: string;
  estado: 'pendiente' | 'confirmada' | 'realizada' | 'cancelada';
  notas: string | null;
  created_at: string;
  updated_at: string;
  client?: Client;
}

export type PaginatedData<T> = {
  data: T[];
  links: {
    first: string;
    last: string;
    prev: string | null;
    next: string | null;
  };

  meta: {
    current_page: number;
    from: number;
    last_page: number;
    path: string;
    per_page: number;
    to: number;
    total: number;

    links: {
      url: null | string;
      label: string;
      active: boolean;
    }[];
  };
};

export type PageProps<
  T extends Record<string, unknown> = Record<string, unknown>
> = T & {
  auth: {
    user: User;
  };
  flash: {
    success: string | null;
    error: string | null;
  };
  ziggy: Config & { location: string };
};
