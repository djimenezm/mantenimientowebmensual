'use client';

import { lazy, Suspense, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { calculateMaintenanceRetainer } from '@/lib/calculator';

const ResultCard = lazy(() => import('@/components/ResultCard'));

type FieldName =
  | 'targetMonthlyNet'
  | 'monthlyFixedCosts'
  | 'billableHoursPerMonth'
  | 'includedHoursPerClient'
  | 'incidentBufferPercent'
  | 'directMonthlyClientCosts'
  | 'taxReservePercent'
  | 'profitMarginPercent';

type FormErrors = Partial<Record<FieldName, string>>;

function trackMaintenanceRetainerCalculated(data: Record<string, string>) {
  window.va?.('event', {
    name: 'maintenance_retainer_calculated',
    data,
  });
}

function parseNumericValue(value: string) {
  const normalizedValue = value.replace(',', '.').trim();

  if (normalizedValue === '') {
    return Number.NaN;
  }

  return Number(normalizedValue);
}

function formatNormalizedNumber(value: number, maximumFractionDigits = 2) {
  return value.toLocaleString('en-US', {
    useGrouping: false,
    maximumFractionDigits,
  });
}

function normalizeFieldValue(field: FieldName, value: string) {
  const parsedValue = parseNumericValue(value);

  if (!Number.isFinite(parsedValue)) {
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
    case 'taxReservePercent':
    case 'profitMarginPercent':
      return formatNormalizedNumber(Math.min(100, Math.max(0, parsedValue)), 1);
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
        return 'Introduce un numero valido de horas.';
      case 'incidentBufferPercent':
      case 'taxReservePercent':
      case 'profitMarginPercent':
        return 'Introduce un porcentaje valido.';
      default:
        return 'Introduce un importe valido.';
    }
  }

  if (field === 'targetMonthlyNet' && parsedValue <= 0) {
    return 'El objetivo mensual debe ser mayor que 0.';
  }

  if (field === 'billableHoursPerMonth' && parsedValue <= 0) {
    return 'Las horas facturables deben ser mayores que 0.';
  }

  if (field === 'billableHoursPerMonth' && !Number.isInteger(parsedValue)) {
    return 'Las horas facturables deben ser un numero entero.';
  }

  if (field === 'includedHoursPerClient' && parsedValue <= 0) {
    return 'Las horas incluidas deben ser mayores que 0.';
  }

  if (
    (field === 'incidentBufferPercent' ||
      field === 'taxReservePercent' ||
      field === 'profitMarginPercent') &&
    parsedValue > 100
  ) {
    return 'El porcentaje debe ser como maximo 100.';
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

function validateForm(values: Record<FieldName, string>): FormErrors {
  const nextErrors: FormErrors = {};

  (Object.keys(values) as FieldName[]).forEach((field) => {
    const error = getFieldError(field, values[field]);

    if (error) {
      nextErrors[field] = error;
    }
  });

  return nextErrors;
}

export default function CalculatorForm() {
  const [targetMonthlyNet, setTargetMonthlyNet] = useState('1800');
  const [monthlyFixedCosts, setMonthlyFixedCosts] = useState('300');
  const [billableHoursPerMonth, setBillableHoursPerMonth] = useState('80');
  const [includedHoursPerClient, setIncludedHoursPerClient] = useState('2');
  const [incidentBufferPercent, setIncidentBufferPercent] = useState('25');
  const [directMonthlyClientCosts, setDirectMonthlyClientCosts] = useState('15');
  const [taxReservePercent, setTaxReservePercent] = useState('20');
  const [profitMarginPercent, setProfitMarginPercent] = useState('15');
  const [hasIVA, setHasIVA] = useState(true);
  const [submitted, setSubmitted] = useState(false);
  const [hasTrackedConversion, setHasTrackedConversion] = useState(false);
  const [validSubmissionCount, setValidSubmissionCount] = useState(0);
  const resultRegionRef = useRef<HTMLElement | null>(null);

  const validationErrors = useMemo(
    () =>
      validateForm({
        targetMonthlyNet,
        monthlyFixedCosts,
        billableHoursPerMonth,
        includedHoursPerClient,
        incidentBufferPercent,
        directMonthlyClientCosts,
        taxReservePercent,
        profitMarginPercent,
      }),
    [
      targetMonthlyNet,
      monthlyFixedCosts,
      billableHoursPerMonth,
      includedHoursPerClient,
      incidentBufferPercent,
      directMonthlyClientCosts,
      taxReservePercent,
      profitMarginPercent,
    ],
  );

  const parsedBillableHours = parseNumericValue(billableHoursPerMonth);
  const hasValidationErrors = Object.keys(validationErrors).length > 0;
  const showBillableHoursError =
    Boolean(validationErrors.billableHoursPerMonth) &&
    (submitted ||
      (billableHoursPerMonth.trim() !== '' &&
        Number.isFinite(parsedBillableHours) &&
        parsedBillableHours <= 0));

  const result = useMemo(() => {
    return calculateMaintenanceRetainer({
      targetMonthlyNet: parseNumericValue(targetMonthlyNet),
      monthlyFixedCosts: parseNumericValue(monthlyFixedCosts),
      billableHoursPerMonth: parseNumericValue(billableHoursPerMonth),
      includedHoursPerClient: parseNumericValue(includedHoursPerClient),
      incidentBufferPercent: parseNumericValue(incidentBufferPercent),
      directMonthlyClientCosts: parseNumericValue(directMonthlyClientCosts),
      taxReservePercent: parseNumericValue(taxReservePercent),
      profitMarginPercent: parseNumericValue(profitMarginPercent),
      hasIVA,
    });
  }, [
    targetMonthlyNet,
    monthlyFixedCosts,
    billableHoursPerMonth,
    includedHoursPerClient,
    incidentBufferPercent,
    directMonthlyClientCosts,
    taxReservePercent,
    profitMarginPercent,
    hasIVA,
  ]);

  useEffect(() => {
    if (validSubmissionCount > 0) {
      resultRegionRef.current?.focus({ preventScroll: false });
    }
  }, [validSubmissionCount]);

  const setResultRegionRef = useCallback(
    (node: HTMLElement | null) => {
      resultRegionRef.current = node;

      if (node && validSubmissionCount > 0) {
        window.requestAnimationFrame(() => node.focus({ preventScroll: false }));
      }
    },
    [validSubmissionCount],
  );

  return (
    <div className="calculator-card" id="calculadora">
      <h2>Calculadora</h2>
      <p className="card-intro" id="calculator-intro">
        Convierte tu objetivo mensual en una cuota de mantenimiento web mas defendible usando horas
        incluidas, buffer de incidencias, costes mensuales por cliente y una reserva fiscal
        orientativa.
      </p>

      <form
        noValidate
        aria-describedby="calculator-intro"
        onSubmit={(event) => {
          event.preventDefault();
          setSubmitted(true);

          if (!hasValidationErrors) {
            setValidSubmissionCount((currentCount) => currentCount + 1);
          }

          if (!hasValidationErrors && !hasTrackedConversion) {
            trackMaintenanceRetainerCalculated({
              hasIVA: hasIVA ? 'yes' : 'no',
              hasMargin: parseNumericValue(profitMarginPercent) > 0 ? 'yes' : 'no',
            });
            setHasTrackedConversion(true);
          }
        }}
        className="calculator-form"
      >
        <label>
          <span>Objetivo mensual neto (EUR)</span>
          <input
            type="number"
            min="0"
            step="0.01"
            value={targetMonthlyNet}
            onChange={(event) => setTargetMonthlyNet(event.target.value)}
            onBlur={(event) =>
              setTargetMonthlyNet(normalizeFieldValue('targetMonthlyNet', event.target.value))
            }
            aria-invalid={submitted && Boolean(validationErrors.targetMonthlyNet)}
            aria-describedby={
              submitted && validationErrors.targetMonthlyNet ? 'target-monthly-net-error' : undefined
            }
          />
          {submitted && validationErrors.targetMonthlyNet && (
            <small className="field-error" id="target-monthly-net-error" role="alert">
              {validationErrors.targetMonthlyNet}
            </small>
          )}
        </label>

        <label>
          <span>Costes fijos mensuales (EUR)</span>
          <input
            type="number"
            min="0"
            step="0.01"
            value={monthlyFixedCosts}
            onChange={(event) => setMonthlyFixedCosts(event.target.value)}
            onBlur={(event) =>
              setMonthlyFixedCosts(normalizeFieldValue('monthlyFixedCosts', event.target.value))
            }
            aria-invalid={submitted && Boolean(validationErrors.monthlyFixedCosts)}
            aria-describedby={
              submitted && validationErrors.monthlyFixedCosts
                ? 'monthly-fixed-costs-error'
                : undefined
            }
          />
          {submitted && validationErrors.monthlyFixedCosts && (
            <small className="field-error" id="monthly-fixed-costs-error" role="alert">
              {validationErrors.monthlyFixedCosts}
            </small>
          )}
        </label>

        <label>
          <span>Horas facturables al mes</span>
          <input
            type="number"
            min="1"
            step="1"
            value={billableHoursPerMonth}
            onChange={(event) => setBillableHoursPerMonth(event.target.value)}
            onBlur={(event) =>
              setBillableHoursPerMonth(normalizeFieldValue('billableHoursPerMonth', event.target.value))
            }
            aria-invalid={showBillableHoursError}
            aria-describedby={showBillableHoursError ? 'billable-hours-error' : undefined}
          />
          {showBillableHoursError && validationErrors.billableHoursPerMonth && (
            <small className="field-error" id="billable-hours-error" role="alert">
              {validationErrors.billableHoursPerMonth}
            </small>
          )}
        </label>

        <label>
          <span>Horas incluidas al mes por cliente</span>
          <input
            type="number"
            min="0.5"
            step="0.5"
            value={includedHoursPerClient}
            onChange={(event) => setIncludedHoursPerClient(event.target.value)}
            onBlur={(event) =>
              setIncludedHoursPerClient(
                normalizeFieldValue('includedHoursPerClient', event.target.value),
              )
            }
            aria-invalid={submitted && Boolean(validationErrors.includedHoursPerClient)}
            aria-describedby={
              submitted && validationErrors.includedHoursPerClient
                ? 'included-hours-error'
                : undefined
            }
          />
          {submitted && validationErrors.includedHoursPerClient && (
            <small className="field-error" id="included-hours-error" role="alert">
              {validationErrors.includedHoursPerClient}
            </small>
          )}
        </label>

        <label>
          <span>Buffer de incidencias y soporte (%)</span>
          <input
            type="number"
            min="0"
            max="100"
            step="0.5"
            value={incidentBufferPercent}
            onChange={(event) => setIncidentBufferPercent(event.target.value)}
            onBlur={(event) =>
              setIncidentBufferPercent(
                normalizeFieldValue('incidentBufferPercent', event.target.value),
              )
            }
            aria-invalid={submitted && Boolean(validationErrors.incidentBufferPercent)}
            aria-describedby={
              submitted && validationErrors.incidentBufferPercent
                ? 'incident-buffer-error'
                : 'incident-buffer-hint'
            }
          />
          <small className="field-hint" id="incident-buffer-hint">
            Usalo para cubrir pequenos picos de soporte, incidencias y tareas mensuales que no
            siempre se ven venir.
          </small>
          {submitted && validationErrors.incidentBufferPercent && (
            <small className="field-error" id="incident-buffer-error" role="alert">
              {validationErrors.incidentBufferPercent}
            </small>
          )}
        </label>

        <label>
          <span>Costes mensuales directos por cliente (EUR)</span>
          <input
            type="number"
            min="0"
            step="0.01"
            value={directMonthlyClientCosts}
            onChange={(event) => setDirectMonthlyClientCosts(event.target.value)}
            onBlur={(event) =>
              setDirectMonthlyClientCosts(
                normalizeFieldValue('directMonthlyClientCosts', event.target.value),
              )
            }
            aria-invalid={submitted && Boolean(validationErrors.directMonthlyClientCosts)}
            aria-describedby={
              submitted && validationErrors.directMonthlyClientCosts
                ? 'direct-monthly-costs-error'
                : 'direct-monthly-costs-hint'
            }
          />
          <small className="field-hint" id="direct-monthly-costs-hint">
            Ejemplos: herramientas especificas, monitorizacion, compras de terceros o soporte
            externalizado asociado a ese cliente.
          </small>
          {submitted && validationErrors.directMonthlyClientCosts && (
            <small className="field-error" id="direct-monthly-costs-error" role="alert">
              {validationErrors.directMonthlyClientCosts}
            </small>
          )}
        </label>

        <label>
          <span>Reserva fiscal orientativa (%)</span>
          <input
            type="number"
            min="0"
            max="100"
            step="0.5"
            value={taxReservePercent}
            onChange={(event) => setTaxReservePercent(event.target.value)}
            onBlur={(event) =>
              setTaxReservePercent(normalizeFieldValue('taxReservePercent', event.target.value))
            }
            aria-invalid={submitted && Boolean(validationErrors.taxReservePercent)}
            aria-describedby={
              submitted && validationErrors.taxReservePercent
                ? 'tax-reserve-percent-error'
                : 'tax-reserve-hint'
            }
          />
          <small className="field-hint" id="tax-reserve-hint">
            No intenta sustituir un calculo fiscal exacto: solo te ayuda a no fijar la cuota como
            si todo el ingreso fuera limpio.
          </small>
          {submitted && validationErrors.taxReservePercent && (
            <small className="field-error" id="tax-reserve-percent-error" role="alert">
              {validationErrors.taxReservePercent}
            </small>
          )}
        </label>

        <label>
          <span>Margen extra sobre la cuota (%)</span>
          <input
            type="number"
            min="0"
            max="100"
            step="0.5"
            value={profitMarginPercent}
            onChange={(event) => setProfitMarginPercent(event.target.value)}
            onBlur={(event) =>
              setProfitMarginPercent(normalizeFieldValue('profitMarginPercent', event.target.value))
            }
            aria-invalid={submitted && Boolean(validationErrors.profitMarginPercent)}
            aria-describedby={
              submitted && validationErrors.profitMarginPercent
                ? 'profit-margin-percent-error'
                : undefined
            }
          />
          {submitted && validationErrors.profitMarginPercent && (
            <small className="field-error" id="profit-margin-percent-error" role="alert">
              {validationErrors.profitMarginPercent}
            </small>
          )}
        </label>

        <fieldset className="radio-group">
          <legend>¿Anadir IVA a la cuota?</legend>
          <label>
            <input type="radio" name="iva" checked={hasIVA} onChange={() => setHasIVA(true)} />
            Si
          </label>
          <label>
            <input type="radio" name="iva" checked={!hasIVA} onChange={() => setHasIVA(false)} />
            No
          </label>
        </fieldset>

        <button type="submit" className="primary-button">
          Calcular cuota mensual
        </button>

        {submitted && hasValidationErrors && (
          <p className="form-message" role="alert">
            Revisa los campos marcados antes de calcular.
          </p>
        )}

        <p className="form-note">
          La herramienta es orientativa: sirve para transformar una intuicion difusa en una cuota
          mensual mas defendible, no para cerrar un encaje fiscal exacto.
        </p>
      </form>

      {submitted && !hasValidationErrors && (
        <Suspense
          fallback={
            <p className="form-note" role="status">
              Preparando resultado...
            </p>
          }
        >
          <ResultCard ref={setResultRegionRef} result={result} hasIVA={hasIVA} />
        </Suspense>
      )}
    </div>
  );
}
