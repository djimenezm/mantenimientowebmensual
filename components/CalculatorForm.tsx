'use client';

import type { ClipboardEvent } from 'react';
import { lazy, Suspense, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { calculateMaintenanceRetainer } from '@/lib/calculator';
import {
  DEFAULT_FORM_VALUES,
  type FieldName,
  getNormalizedPastedValue,
  normalizeFieldValue,
  validateForm,
} from '@/lib/calculatorForm';
import { parseSpanishNumber as parseNumericValue } from '@/lib/spanishNumber';

const ResultCard = lazy(() => import('@/components/ResultCard'));

function trackMaintenanceRetainerCalculated(data: Record<string, string>) {
  window.va?.('event', {
    name: 'maintenance_retainer_calculated',
    data,
  });
}

function handleNumericPaste(
  event: ClipboardEvent<HTMLInputElement>,
  field: FieldName,
  setValue: (value: string) => void,
) {
  const normalizedValue = getNormalizedPastedValue(field, event.clipboardData.getData('text'));

  if (normalizedValue === null) {
    return;
  }

  event.preventDefault();
  setValue(normalizedValue);
}

export default function CalculatorForm() {
  const [targetMonthlyNet, setTargetMonthlyNet] = useState(DEFAULT_FORM_VALUES.targetMonthlyNet);
  const [monthlyFixedCosts, setMonthlyFixedCosts] = useState(DEFAULT_FORM_VALUES.monthlyFixedCosts);
  const [billableHoursPerMonth, setBillableHoursPerMonth] = useState(
    DEFAULT_FORM_VALUES.billableHoursPerMonth,
  );
  const [includedHoursPerClient, setIncludedHoursPerClient] = useState(
    DEFAULT_FORM_VALUES.includedHoursPerClient,
  );
  const [incidentBufferPercent, setIncidentBufferPercent] = useState(
    DEFAULT_FORM_VALUES.incidentBufferPercent,
  );
  const [directMonthlyClientCosts, setDirectMonthlyClientCosts] = useState(
    DEFAULT_FORM_VALUES.directMonthlyClientCosts,
  );
  const [taxReservePercent, setTaxReservePercent] = useState(DEFAULT_FORM_VALUES.taxReservePercent);
  const [profitMarginPercent, setProfitMarginPercent] = useState(
    DEFAULT_FORM_VALUES.profitMarginPercent,
  );
  const [hasIVA, setHasIVA] = useState(DEFAULT_FORM_VALUES.hasIVA);
  const [submitted, setSubmitted] = useState(false);
  const [invalidSubmissionCount, setInvalidSubmissionCount] = useState(0);
  const formRef = useRef<HTMLFormElement | null>(null);
  const [hasTrackedConversion, setHasTrackedConversion] = useState(false);
  const [validSubmissionCount, setValidSubmissionCount] = useState(0);
  const resultRegionRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (invalidSubmissionCount > 0) {
      formRef.current?.querySelector<HTMLInputElement>('[aria-invalid="true"]')?.focus();
    }
  }, [invalidSubmissionCount]);

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
        Introduce tus costes, horas y margen. Te damos una cuota mínima y otra recomendada.
      </p>

      <form
        ref={formRef}
        noValidate
        aria-describedby="calculator-intro"
        onSubmit={(event) => {
          event.preventDefault();
          setSubmitted(true);

          if (hasValidationErrors) {
            setInvalidSubmissionCount((count) => count + 1);
          }

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
            onPaste={(event) =>
              handleNumericPaste(event, 'targetMonthlyNet', setTargetMonthlyNet)
            }
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
            onPaste={(event) =>
              handleNumericPaste(event, 'monthlyFixedCosts', setMonthlyFixedCosts)
            }
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
            onPaste={(event) =>
              handleNumericPaste(event, 'billableHoursPerMonth', setBillableHoursPerMonth)
            }
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
            onPaste={(event) =>
              handleNumericPaste(event, 'includedHoursPerClient', setIncludedHoursPerClient)
            }
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
            onPaste={(event) =>
              handleNumericPaste(event, 'incidentBufferPercent', setIncidentBufferPercent)
            }
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
            Reserva para pequeñas incidencias y soporte imprevisto.
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
            onPaste={(event) =>
              handleNumericPaste(event, 'directMonthlyClientCosts', setDirectMonthlyClientCosts)
            }
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
            Herramientas o servicios asociados a ese cliente.
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
            max="99"
            step="0.5"
            value={taxReservePercent}
            onChange={(event) => setTaxReservePercent(event.target.value)}
            onPaste={(event) =>
              handleNumericPaste(event, 'taxReservePercent', setTaxReservePercent)
            }
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
            Reserva orientativa; no sustituye un cálculo fiscal.
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
            onPaste={(event) =>
              handleNumericPaste(event, 'profitMarginPercent', setProfitMarginPercent)
            }
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
          <legend>¿Añadir IVA a la cuota?</legend>
          <label>
            <input type="radio" name="iva" checked={hasIVA} onChange={() => setHasIVA(true)} />
            Sí
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
          Referencia orientativa para presupuestar con más criterio.
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
