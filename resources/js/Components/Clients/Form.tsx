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
  reconocimientos_stats?: {
    incluidos: number;
    realizados: number;
    reservados: number;
    comprometidos: number;
    disponibles: number;
    porcentaje_uso: number;
  };
}

export default function Form({
  data,
  errors,
  processing,
  onSubmit,
  onChange,
  submitLabel = 'Save Client',
  reconocimientos_stats
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
      {reconocimientos_stats && (
        <div className="p-8 border-b border-indigo-100 bg-gradient-to-br from-blue-50 to-indigo-50">
          <h3 className="mb-4 text-lg font-semibold text-gray-900">
            Estadísticas de Reconocimientos
          </h3>
          <div className="grid gap-4 mb-4 lg:grid-cols-3">
            <div className="p-4 bg-white border border-gray-200 rounded-lg shadow-sm">
              <div className="text-sm font-medium text-gray-600">Incluidos en Contrato</div>
              <div className="text-2xl font-bold text-indigo-600">
                {reconocimientos_stats.incluidos}
              </div>
            </div>
            <div className="p-4 bg-white border border-gray-200 rounded-lg shadow-sm">
              <div className="text-sm font-medium text-gray-600">Realizados</div>
              <div className="text-2xl font-bold text-green-600">
                {reconocimientos_stats.realizados}
              </div>
              <div className="text-xs text-gray-500 mt-1">Citas completadas</div>
            </div>
            <div className="p-4 bg-white border border-gray-200 rounded-lg shadow-sm">
              <div className="text-sm font-medium text-gray-600">Reservados</div>
              <div className="text-2xl font-bold text-orange-600">
                {reconocimientos_stats.reservados}
              </div>
              <div className="text-xs text-gray-500 mt-1">Pendientes/Confirmadas</div>
            </div>
            <div className="p-4 bg-white border border-gray-200 rounded-lg shadow-sm">
              <div className="text-sm font-medium text-gray-600">Comprometidos</div>
              <div className="text-2xl font-bold text-blue-600">
                {reconocimientos_stats.comprometidos}
              </div>
              <div className="text-xs text-gray-500 mt-1">Realizados + Reservados</div>
            </div>
            <div className="p-4 bg-white border border-gray-200 rounded-lg shadow-sm">
              <div className="text-sm font-medium text-gray-600">Disponibles</div>
              <div className="text-2xl font-bold text-emerald-600">
                {reconocimientos_stats.disponibles}
              </div>
              <div className="text-xs text-gray-500 mt-1">Libres para reservar</div>
            </div>
            <div className="p-4 bg-white border border-gray-200 rounded-lg shadow-sm">
              <div className="text-sm font-medium text-gray-600">Uso del Contrato</div>
              <div className="text-2xl font-bold text-purple-600">
                {reconocimientos_stats.porcentaje_uso}%
              </div>
              <div className="text-xs text-gray-500 mt-1">Comprometidos vs Incluidos</div>
            </div>
          </div>
          <div className="p-3 bg-white border border-gray-200 rounded-lg">
            <div className="flex justify-between mb-2 text-sm">
              <span className="font-medium text-gray-700">Progreso de uso del contrato</span>
              <span className="text-gray-600">
                {reconocimientos_stats.comprometidos} / {reconocimientos_stats.incluidos}
              </span>
            </div>
            <div className="w-full h-3 overflow-hidden bg-gray-200 rounded-full">
              <div
                className={`h-3 rounded-full transition-all duration-300 ${
                  reconocimientos_stats.porcentaje_uso >= 90
                    ? 'bg-red-500'
                    : reconocimientos_stats.porcentaje_uso >= 75
                    ? 'bg-yellow-500'
                    : 'bg-green-500'
                }`}
                style={{ width: `${Math.min(reconocimientos_stats.porcentaje_uso, 100)}%` }}
              />
            </div>
          </div>
        </div>
      )}
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
