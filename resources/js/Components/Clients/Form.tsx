import LoadingButton from '@/Components/Button/LoadingButton';
import TextInput from '@/Components/Form/TextInput';
import FieldGroup from '@/Components/Form/FieldGroup';
import { Client } from '@/types';

interface FormProps {
  data: {
    codigo: string;
    razon_social: string;
    cif: string;
    direccion: string;
    municipio: string;
    provincia: string;
    fecha_inicio_contrato: string;
    fecha_expiracion_contrato: string;
    reconocimientos_incluidos: number;
  };
  errors: Partial<Record<keyof FormProps['data'], string>>;
  processing: boolean;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  onChange: (field: keyof FormProps['data'], value: string | number) => void;
  submitLabel?: string;
}

export default function Form({
  data,
  errors,
  processing,
  onSubmit,
  onChange,
  submitLabel = 'Save Client'
}: FormProps) {
  return (
    <form onSubmit={onSubmit}>
      <div className="grid gap-8 p-8 lg:grid-cols-2">
        <FieldGroup
          label="Código (CNAE)"
          name="codigo"
          error={errors.codigo}
        >
          <TextInput
            name="codigo"
            error={errors.codigo}
            value={data.codigo}
            onChange={e => onChange('codigo', e.target.value)}
          />
        </FieldGroup>

        <FieldGroup
          label="Razón Social"
          name="razon_social"
          error={errors.razon_social}
        >
          <TextInput
            name="razon_social"
            error={errors.razon_social}
            value={data.razon_social}
            onChange={e => onChange('razon_social', e.target.value)}
          />
        </FieldGroup>

        <FieldGroup label="CIF" name="cif" error={errors.cif}>
          <TextInput
            name="cif"
            error={errors.cif}
            value={data.cif}
            onChange={e => onChange('cif', e.target.value)}
          />
        </FieldGroup>

        <FieldGroup
          label="Dirección"
          name="direccion"
          error={errors.direccion}
        >
          <TextInput
            name="direccion"
            error={errors.direccion}
            value={data.direccion}
            onChange={e => onChange('direccion', e.target.value)}
          />
        </FieldGroup>

        <FieldGroup
          label="Municipio"
          name="municipio"
          error={errors.municipio}
        >
          <TextInput
            name="municipio"
            error={errors.municipio}
            value={data.municipio}
            onChange={e => onChange('municipio', e.target.value)}
          />
        </FieldGroup>

        <FieldGroup
          label="Provincia"
          name="provincia"
          error={errors.provincia}
        >
          <TextInput
            name="provincia"
            error={errors.provincia}
            value={data.provincia}
            onChange={e => onChange('provincia', e.target.value)}
          />
        </FieldGroup>

        <FieldGroup
          label="Fecha Inicio Contrato"
          name="fecha_inicio_contrato"
          error={errors.fecha_inicio_contrato}
        >
          <TextInput
            name="fecha_inicio_contrato"
            type="date"
            error={errors.fecha_inicio_contrato}
            value={data.fecha_inicio_contrato}
            onChange={e => onChange('fecha_inicio_contrato', e.target.value)}
          />
        </FieldGroup>

        <FieldGroup
          label="Fecha Expiración Contrato"
          name="fecha_expiracion_contrato"
          error={errors.fecha_expiracion_contrato}
        >
          <TextInput
            name="fecha_expiracion_contrato"
            type="date"
            error={errors.fecha_expiracion_contrato}
            value={data.fecha_expiracion_contrato}
            onChange={e => onChange('fecha_expiracion_contrato', e.target.value)}
          />
        </FieldGroup>

        <FieldGroup
          label="Reconocimientos Incluidos"
          name="reconocimientos_incluidos"
          error={errors.reconocimientos_incluidos}
        >
          <TextInput
            name="reconocimientos_incluidos"
            type="number"
            error={errors.reconocimientos_incluidos}
            value={data.reconocimientos_incluidos.toString()}
            onChange={e => onChange('reconocimientos_incluidos', parseInt(e.target.value) || 0)}
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
