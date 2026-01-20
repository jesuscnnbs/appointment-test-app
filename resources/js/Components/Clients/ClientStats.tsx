interface ClientStatsProps {
  stats: {
    incluidos: number;
    realizados: number;
    reservados: number;
    comprometidos: number;
    disponibles: number;
    porcentaje_uso: number;
  };
}

export default function ClientStats({ stats }: ClientStatsProps) {
  return (
    <div className="p-8 border-t border-indigo-200 bg-gradient-to-br from-blue-50 to-indigo-200">
      <h3 className="mb-4 text-lg font-semibold text-gray-900">
        Estadísticas del Cliente
      </h3>
      <div className="grid gap-4 mb-4 lg:grid-cols-3">
        <div className="p-4 bg-white border border-gray-200 rounded-lg shadow-sm">
          <div className="text-sm font-medium text-gray-600">Incluidos en Contrato</div>
          <div className="text-2xl font-bold text-indigo-600">
            {stats.incluidos}
          </div>
        </div>
        <div className="p-4 bg-white border border-gray-200 rounded-lg shadow-sm">
          <div className="text-sm font-medium text-gray-600">Realizados</div>
          <div className="text-2xl font-bold text-green-600">
            {stats.realizados}
          </div>
          <div className="mt-1 text-xs text-gray-500">Citas completadas</div>
        </div>
        <div className="p-4 bg-white border border-gray-200 rounded-lg shadow-sm">
          <div className="text-sm font-medium text-gray-600">Reservados</div>
          <div className="text-2xl font-bold text-orange-600">
            {stats.reservados}
          </div>
          <div className="mt-1 text-xs text-gray-500">Pendientes/Confirmadas</div>
        </div>
        <div className="p-4 bg-white border border-gray-200 rounded-lg shadow-sm">
          <div className="text-sm font-medium text-gray-600">Comprometidos</div>
          <div className="text-2xl font-bold text-blue-600">
            {stats.comprometidos}
          </div>
          <div className="mt-1 text-xs text-gray-500">Realizados + Reservados</div>
        </div>
        <div className="p-4 bg-white border border-gray-200 rounded-lg shadow-sm">
          <div className="text-sm font-medium text-gray-600">Disponibles</div>
          <div className="text-2xl font-bold text-emerald-600">
            {stats.disponibles}
          </div>
          <div className="mt-1 text-xs text-gray-500">Libres para reservar</div>
        </div>
        <div className="p-4 bg-white border border-gray-200 rounded-lg shadow-sm">
          <div className="text-sm font-medium text-gray-600">Uso del Contrato</div>
          <div className="text-2xl font-bold text-purple-600">
            {stats.porcentaje_uso}%
          </div>
          <div className="mt-1 text-xs text-gray-500">Comprometidos vs Incluidos</div>
        </div>
      </div>
      <div className="p-3 bg-white border border-gray-200 rounded-lg">
        <div className="flex justify-between mb-2 text-sm">
          <span className="font-medium text-gray-700">Progreso de uso del contrato</span>
          <span className="text-gray-600">
            {stats.comprometidos} / {stats.incluidos}
          </span>
        </div>
        <div className="w-full h-3 overflow-hidden bg-gray-200 rounded-full">
          <div
            className={`h-3 rounded-full transition-all duration-300 ${
              stats.porcentaje_uso >= 90
                ? 'bg-red-500'
                : stats.porcentaje_uso >= 75
                ? 'bg-yellow-500'
                : 'bg-green-500'
            }`}
            style={{ width: `${Math.min(stats.porcentaje_uso, 100)}%` }}
          />
        </div>
      </div>
    </div>
  );
}
