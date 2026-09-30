import { parseSpanishNumber as parseNumericValue } from '@/lib/spanishNumber';

export type FieldName =
  | 'targetMonthlyNet'
  | 'monthlyFixedCosts'
  | 'billableHoursPerMonth'
  | 'includedHoursPerClient'
  | 'incidentBufferPercent'
  | 'directMonthlyClientCosts'
  | 'taxReservePercent'
  | 'profitMarginPercent';

type FormErrors = Partial<Record<FieldName, string>>;

export const DEFAULT_FORM_VALUES = {
  targetMonthlyNet: '1800',
  monthlyFixedCosts: '300',
  billableHoursPerMonth: '80',
  includedHoursPerClient: '2',
  incidentBufferPercent: '25',
  directMonthlyClientCosts: '15',
  taxReservePercent: '20',
  profitMarginPercent: '15',
  hasIVA: true,
};

function formatNormalizedNumber(value: number, maximumFractionDigits = 2) {
  return value.toLocaleString('en-US', {
    useGrouping: false,
    maximumFractionDigits,
  });
}

export function normalizeFieldValue(field: FieldName, value: string) {
  const parsedValue = parseNumericValue(value);

  if (!Number.isFinite(parsedValue) || getFieldError(field, value)) {
    return value.trim() === '' ? '' : value;
  }

  switch (field) {
    case 'targetMonthlyNet':
    case 'monthlyFixedCosts':
    case 'includedHoursPerClient':
    case 'directMonthlyClientCosts':
      return formatNormalizedNumber(Math.max(0, parsedValue));
    case 'billableHoursPerMonth':
      return formatNormalizedNumber(Math.max(0, Math.round(parsedValue)), 0);
    case 'incidentBufferPercent':
    case 'profitMarginPercent':
      return formatNormalizedNumber(Math.min(100, Math.max(0, parsedValue)), 1);
    case 'taxReservePercent':
      return formatNormalizedNumber(parsedValue, 1);
  }
}

function getFieldError(field: FieldName, value: string) {
  const parsedValue = parseNumericValue(value);

  if (value.trim() === '') {
    switch (field) {
      case 'targetMonthlyNet':
        return 'Indica tu objetivo mensual.';
      case 'monthlyFixedCosts':
        return 'Indica tus costes fijos mensuales.';
      case 'billableHoursPerMonth':
        return 'Indica tus horas facturables al mes.';
      case 'includedHoursPerClient':
        return 'Indica las horas incluidas por cliente.';
      case 'incidentBufferPercent':
        return 'Indica un buffer de incidencias.';
      case 'directMonthlyClientCosts':
        return 'Indica los costes mensuales directos del cliente.';
      case 'taxReservePercent':
        return 'Indica una reserva fiscal orientativa.';
      case 'profitMarginPercent':
        return 'Indica el margen extra del servicio.';
    }
  }

  if (!Number.isFinite(parsedValue)) {
    switch (field) {
      case 'billableHoursPerMonth':
        return 'Introduce un número válido de horas.';
      case 'incidentBufferPercent':
      case 'taxReservePercent':
      case 'profitMarginPercent':
        return 'Introduce un porcentaje válido.';
      default:
        return 'Introduce un importe válido.';
    }
  }

  if (field === 'targetMonthlyNet' && parsedValue <= 0) {
    return 'El objetivo mensual debe ser mayor que 0.';
  }

  if (field === 'billableHoursPerMonth' && parsedValue <= 0) {
    return 'Las horas facturables deben ser mayores que 0.';
  }

  if (field === 'billableHoursPerMonth' && !Number.isInteger(parsedValue)) {
    return 'Las horas facturables deben ser un número entero.';
  }

  if (field === 'includedHoursPerClient' && parsedValue <= 0) {
    return 'Las horas incluidas deben ser mayores que 0.';
  }

  if (
    (field === 'incidentBufferPercent' ||
      field === 'profitMarginPercent') &&
    parsedValue > 100
  ) {
    return 'El porcentaje debe ser como máximo 100.';
  }

  if (field === 'taxReservePercent' && parsedValue > 99) {
    return 'La reserva fiscal debe ser como máximo 99.';
  }

  if (parsedValue < 0) {
    switch (field) {
      case 'targetMonthlyNet':
        return 'El objetivo mensual no puede ser negativo.';
      case 'monthlyFixedCosts':
        return 'Los costes fijos no pueden ser negativos.';
      case 'billableHoursPerMonth':
        return 'Las horas facturables no pueden ser negativas.';
      case 'includedHoursPerClient':
        return 'Las horas incluidas no pueden ser negativas.';
      case 'incidentBufferPercent':
        return 'El buffer no puede ser negativo.';
      case 'directMonthlyClientCosts':
        return 'Los costes del cliente no pueden ser negativos.';
      case 'taxReservePercent':
        return 'La reserva fiscal no puede ser negativa.';
      case 'profitMarginPercent':
        return 'El margen no puede ser negativo.';
    }
  }

  return '';
}

export function getNormalizedPastedValue(field: FieldName, value: string) {
  const parsedValue = parseNumericValue(value);
  return Number.isFinite(parsedValue)
    ? normalizeFieldValue(field, String(parsedValue))
    : null;
}

export function validateForm(values: Record<FieldName, string>): FormErrors {
  const nextErrors: FormErrors = {};

  (Object.keys(values) as FieldName[]).forEach((field) => {
    const error = getFieldError(field, values[field]);

    if (error) {
      nextErrors[field] = error;
    }
  });

  return nextErrors;
}
