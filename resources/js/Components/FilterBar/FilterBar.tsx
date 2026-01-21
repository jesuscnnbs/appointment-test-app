import { useState, useEffect } from 'react';
import { usePage, router } from '@inertiajs/react';
import { usePrevious } from 'react-use';
import SelectInput from '@/Components/Form/SelectInput';
import pickBy from 'lodash/pickBy';
import { ChevronDown } from 'lucide-react';
import FieldGroup from '@/Components/Form/FieldGroup';
import TextInput from '@/Components/Form/TextInput';

export default function FilterBar() {
  const { filters } = usePage<{
    filters: { role?: string; search?: string; trashed?: string; estado?: string; fecha_desde?: string; fecha_hasta?: string; municipio?: string };
  }>().props;

  const [opened, setOpened] = useState(false);

  const [values, setValues] = useState({
    role: filters.role || '', // role is used only on users page
    search: filters.search || '',
    trashed: filters.trashed || '',
    estado: filters.estado || '', // estado is used only on appointments page
    fecha_desde: filters.fecha_desde || '', // fecha_desde is used only on appointments page
    fecha_hasta: filters.fecha_hasta || '', // fecha_hasta is used only on appointments page
    municipio: filters.municipio || '' // municipio is used only on clients page
  });

  const prevValues = usePrevious(values);

  function reset() {
    setValues({
      role: '',
      search: '',
      trashed: '',
      estado: '',
      fecha_desde: '',
      fecha_hasta: '',
      municipio: ''
    });
  }

  useEffect(() => {
    // https://reactjs.org/docs/hooks-faq.html#how-to-get-the-previous-props-or-state
    if (prevValues) {
      const query = Object.keys(pickBy(values)).length ? pickBy(values) : {};

      router.get(route(route().current() as string), query, {
        replace: true,
        preserveState: true
      });
    }
  }, [values]);

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) {
    const name = e.target.name;
    const value = e.target.value;

    setValues(values => ({
      ...values,
      [name]: value
    }));

    if (opened) setOpened(false);
  }

  return (
    <div className="flex items-center w-full max-w-md mr-4">
      <div className="relative flex bg-white rounded shadow">
        <div
          style={{ top: '100%' }}
          className={`absolute ${opened ? '' : 'hidden'}`}
        >
          <div
            onClick={() => setOpened(false)}
            className="fixed inset-0 z-20 bg-black opacity-25"
          />
          <div className="relative z-30 w-64 px-4 py-6 mt-2 bg-white rounded shadow-lg space-y-4">
            {filters.hasOwnProperty('role') && (
              <FieldGroup label="Role" name="role">
                <SelectInput
                  name="role"
                  value={values.role}
                  onChange={handleChange}
                  options={[
                    { value: '', label: '' },
                    { value: 'user', label: 'User' },
                    { value: 'owner', label: 'Owner' }
                  ]}
                />
              </FieldGroup>
            )}
            {filters.hasOwnProperty('estado') && (
              <FieldGroup label="Estado" name="estado">
                <SelectInput
                  name="estado"
                  value={values.estado}
                  onChange={handleChange}
                  options={[
                    { value: '', label: 'Todos' },
                    { value: 'pendiente', label: 'Pendiente' },
                    { value: 'confirmada', label: 'Confirmada' },
                    { value: 'realizada', label: 'Realizada' },
                    { value: 'cancelada', label: 'Cancelada' }
                  ]}
                />
              </FieldGroup>
            )}
            {filters.hasOwnProperty('fecha_desde') && (
              <FieldGroup label="Fecha Desde" name="fecha_desde">
                <TextInput
                  name="fecha_desde"
                  type="date"
                  value={values.fecha_desde}
                  onChange={handleChange}
                />
              </FieldGroup>
            )}
            {filters.hasOwnProperty('fecha_hasta') && (
              <FieldGroup label="Fecha Hasta" name="fecha_hasta">
                <TextInput
                  name="fecha_hasta"
                  type="date"
                  value={values.fecha_hasta}
                  onChange={handleChange}
                />
              </FieldGroup>
            )}
            {filters.hasOwnProperty('municipio') && (
              <FieldGroup label="Municipio" name="municipio">
                <TextInput
                  name="municipio"
                  type="text"
                  placeholder="Buscar por municipio..."
                  value={values.municipio}
                  onChange={handleChange}
                />
              </FieldGroup>
            )}
            <FieldGroup label="Trashed" name="trashed">
              <SelectInput
                name="trashed"
                value={values.trashed}
                onChange={handleChange}
                options={[
                  { value: '', label: '' },
                  { value: 'with', label: 'With Trashed' },
                  { value: 'only', label: 'Only Trashed' }
                ]}
              />
            </FieldGroup>
          </div>
        </div>
        <button
          onClick={() => setOpened(true)}
          className="px-4 border-r rounded-l md:px-6 hover:bg-gray-100 focus:outline-none focus:border-white focus:ring-2 focus:ring-indigo-400 focus:z-10"
        >
          <div className="flex items-center">
            <span className="hidden text-gray-700 md:inline">Filter</span>
            <ChevronDown size={14} strokeWidth={3} className="md:ml-2" />
          </div>
        </button>
        <TextInput
          name="search"
          placeholder="Search…"
          autoComplete="off"
          value={values.search}
          onChange={handleChange}
          className="border-0 rounded-l-none focus:ring-2"
        />
      </div>
      <button
        onClick={reset}
        className="ml-3 text-sm text-gray-600 hover:text-gray-700 focus:text-indigo-700 focus:outline-none"
        type="button"
      >
        Reset
      </button>
    </div>
  );
}
