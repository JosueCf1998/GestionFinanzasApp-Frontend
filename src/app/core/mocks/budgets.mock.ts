import { ListBudgetsApiResponse } from 'src/app/core/models/budgets/list-budgets.model';

/** Respuesta simulada con el mismo contrato que utilizará el backend. */
export const BUDGETS_MOCK: ListBudgetsApiResponse = {
  presupuestoTotal: 3800,
  montoUtilizado: 3120,
  porcentajeUtilizado: 82,
  presupuestos: [
    {
      id: 1,
      nombre: 'Presupuesto Hogar',
      icono: 'home',
      color: '#4361ee',
      estado: 'ON_TRACK',
      porcentaje: 75,
      montoUtilizado: 900,
      montoPresupuestado: 1200
    },
    {
      id: 2,
      nombre: 'Presupuesto Personal',
      icono: 'user',
      color: '#8b5cf6',
      estado: 'WARNING',
      porcentaje: 92,
      montoUtilizado: 920,
      montoPresupuestado: 1000
    },
    {
      id: 3,
      nombre: 'Viaje a Cusco',
      icono: 'bus',
      color: '#ec4899',
      estado: 'EXCEEDED',
      porcentaje: 105,
      montoUtilizado: 630,
      montoPresupuestado: 600
    },
    {
      id: 4,
      nombre: 'EIKON Operativo',
      icono: 'account',
      color: '#3a0ca3',
      estado: 'ON_TRACK',
      porcentaje: 67,
      montoUtilizado: 670,
      montoPresupuestado: 1000
    }
  ]
};
