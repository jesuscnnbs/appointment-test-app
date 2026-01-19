import LoadingButton from '@/Components/Button/LoadingButton';
import TextInput from '@/Components/Form/TextInput';
import SelectInput from '@/Components/Form/SelectInput';
import FieldGroup from '@/Components/Form/FieldGroup';

interface FormProps {
  data: {
    client_id: number | string;
    fecha: string;
    reconocimientos_reservados: number;
    reconocimientos_realizados: number;
    hora_inicio: string;
    estado: 'pendiente' | 'confirmada' | 'realizada' | 'cancelada';
    notas: string;
  };
  clients: Array<{
    id: number;
    razon_social: string;
    codigo: string;
  }>;
  errors: Partial<Record<keyof FormProps['data'], string>>;
  processing: boolean;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  onChange: (field: keyof FormProps['data'], value: string | number) => void;
  submitLabel?: string;
}

export default function Form({
  data,
  clients,
  errors,
  processing,
  onSubmit,
  onChange,
  submitLabel = 'Save Appointment'
}: FormProps) {
  return (
    <form onSubmit={onSubmit}>
      <div className="grid gap-8 p-8 lg:grid-cols-2">
        <FieldGroup
          label="Cliente"
          name="client_id"
          error={errors.client_id}
        >
          <SelectInput
            name="client_id"
            error={errors.client_id}
            value={data.client_id.toString()}
            onChange={e => onChange('client_id', parseInt(e.target.value))}
            options={[
              { value: '', label: 'Seleccionar cliente' },
              ...clients.map(client => ({
                value: client.id.toString(),
                label: `${client.codigo} - ${client.razon_social}`
              }))
            ]}
          />
        </FieldGroup>

        <FieldGroup
          label="Fecha"
          name="fecha"
          error={errors.fecha}
        >
          <TextInput
            name="fecha"
            type="date"
            error={errors.fecha}
            value={data.fecha}
            onChange={e => onChange('fecha', e.target.value)}
          />
        </FieldGroup>

        <FieldGroup
          label="Hora de Inicio"
          name="hora_inicio"
          error={errors.hora_inicio}
        >
          <TextInput
            name="hora_inicio"
            type="time"
            error={errors.hora_inicio}
            value={data.hora_inicio}
            onChange={e => onChange('hora_inicio', e.target.value)}
          />
        </FieldGroup>

        <FieldGroup
          label="Estado"
          name="estado"
          error={errors.estado}
        >
          <SelectInput
            name="estado"
            error={errors.estado}
            value={data.estado}
            onChange={e => onChange('estado', e.target.value)}
            options={[
              { value: 'pendiente', label: 'Pendiente' },
              { value: 'confirmada', label: 'Confirmada' },
              { value: 'realizada', label: 'Realizada' },
              { value: 'cancelada', label: 'Cancelada' }
            ]}
          />
        </FieldGroup>

        <FieldGroup
          label="Reconocimientos Reservados"
          name="reconocimientos_reservados"
          error={errors.reconocimientos_reservados}
        >
          <TextInput
            name="reconocimientos_reservados"
            type="number"
            error={errors.reconocimientos_reservados}
            value={data.reconocimientos_reservados.toString()}
            onChange={e => onChange('reconocimientos_reservados', parseInt(e.target.value) || 0)}
          />
        </FieldGroup>

        <FieldGroup
          label="Reconocimientos Realizados"
          name="reconocimientos_realizados"
          error={errors.reconocimientos_realizados}
        >
          <TextInput
            name="reconocimientos_realizados"
            type="number"
            error={errors.reconocimientos_realizados}
            value={data.reconocimientos_realizados.toString()}
            onChange={e => onChange('reconocimientos_realizados', parseInt(e.target.value) || 0)}
          />
        </FieldGroup>

        <FieldGroup
          label="Notas"
          name="notas"
          error={errors.notas}
          className="lg:col-span-2"
        >
          <textarea
            name="notas"
            className="w-full px-4 py-2 border border-gray-300 rounded focus:border-indigo-500 focus:outline-none"
            rows={4}
            value={data.notas || ''}
            onChange={e => onChange('notas', e.target.value)}
          />
        </FieldGroup>
      </div>
      <div className="flex items-center justify-end px-8 py-4 bg-gray-100 border-t border-gray-200">
        <LoadingButton
          loading={processing}
          type="submit"
          className="btn-indigo"
        >
          {submitLabel}
        </LoadingButton>
      </div>
    </form>
  );
}
