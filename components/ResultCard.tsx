'use client';

import { forwardRef, useEffect, useRef, useState } from 'react';
import { type CalculationResult } from '@/lib/calculator';
import { formatCurrency, formatNumber } from '@/lib/format';

type ResultCardProps = {
  result: CalculationResult;
  hasIVA: boolean;
};

type CopyStatus = 'idle' | 'copied' | 'error';

async function copyTextToClipboard(text: string) {
  if (navigator.clipboard?.writeText) {
    await navigator.clipboard.writeText(text);
    return;
  }

  const textArea = document.createElement('textarea');
  textArea.value = text;
  textArea.setAttribute('readonly', '');
  textArea.setAttribute('aria-hidden', 'true');
  textArea.tabIndex = -1;
  textArea.style.position = 'fixed';
  textArea.style.left = '-9999px';
  document.body.appendChild(textArea);
  textArea.select();

  const copied = document.execCommand('copy');
  document.body.removeChild(textArea);

  if (!copied) {
    throw new Error('No se pudo copiar el resumen.');
  }
}

const ResultCard = forwardRef<HTMLElement, ResultCardProps>(function ResultCard(
  { result, hasIVA },
  ref,
) {
  const [copyStatus, setCopyStatus] = useState<CopyStatus>('idle');
  const capacityRef = useRef<HTMLDivElement>(null);
  const hasTrackedCapacityView = useRef(false);
  const exceedsCapacity = result.clientsNeededForTarget > result.maxClientsByHours;

  useEffect(() => {
    if (!capacityRef.current || typeof IntersectionObserver === 'undefined') return;

    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting || hasTrackedCapacityView.current) return;

      hasTrackedCapacityView.current = true;
      window.va?.('event', {
        name: 'maintenance_capacity_viewed',
        data: { outcome: exceedsCapacity ? 'over_capacity' : 'within_capacity' },
      });
      observer.disconnect();
    }, { threshold: 0.5 });

    observer.observe(capacityRef.current);
    return () => observer.disconnect();
  }, [exceedsCapacity]);
  const pricingBuffer = Math.max(
    0,
    result.recommendedMonthlyRetainer - result.maintenanceFloorRetainer,
  );
  const hoursNeeded = result.hoursNeededForTarget.toLocaleString('es-ES', {
    maximumFractionDigits: 2,
  });
  const hoursOverCapacity = result.hoursOverCapacity.toLocaleString('es-ES', {
    maximumFractionDigits: 2,
  });
  const maintenanceSummary = [
    'Resumen de mantenimiento web mensual',
    `Cuota mínima defendible: ${formatCurrency(result.maintenanceFloorRetainer)} sin IVA`,
    `Cuota recomendada: ${formatCurrency(result.recommendedMonthlyRetainer)} sin IVA`,
    hasIVA
      ? `Total mensual con IVA: ${formatCurrency(result.totalWithVAT)}`
      : 'IVA: no añadido en esta simulación',
    `Horas incluidas al mes: ${formatNumber(result.includedHoursPerClient, 2)} h`,
    `Horas con buffer: ${formatNumber(result.bufferedIncludedHours, 2)} h`,
    `Buffer de incidencias y soporte: ${formatNumber(result.incidentBufferPercent, 2)}%`,
    `Referencia base: ${formatCurrency(result.baseHourlyRate)}/h`,
    `Tarifa efectiva del servicio: ${formatCurrency(result.effectiveHourlyRate)}/h`,
    `Costes mensuales directos: ${formatCurrency(result.directMonthlyClientCosts)}`,
    `Colchón de negociación: ${formatCurrency(pricingBuffer)}`,
    `Clientes similares necesarios para el objetivo: ${result.clientsNeededForTarget}`,
    `Clientes que caben en las horas disponibles: ${result.maxClientsByHours}`,
    'Nota: si el cliente pide bajar la cuota, conviene reducir horas, alcance o tiempos de respuesta antes de bajar del mínimo defendible.',
  ].join('\n');

  async function handleCopySummary() {
    try {
      await copyTextToClipboard(maintenanceSummary);
      setCopyStatus('copied');
      window.setTimeout(() => setCopyStatus('idle'), 2500);
    } catch {
      setCopyStatus('error');
    }
  }

  return (
    <section
      ref={ref}
      className="result-card"
      tabIndex={-1}
      aria-live="polite"
      aria-labelledby="result-card-title"
    >
      <h3 id="result-card-title">Tu cuota mensual recomendada para mantenimiento web</h3>

      <p className="result-lead">
        Con esta simulación, una cuota mensual razonable quedaría en{' '}
        <strong>{formatCurrency(result.recommendedMonthlyRetainer)}</strong> sin IVA. Tu suelo para
        no quedarte corto con este servicio estaría alrededor de{' '}
        <strong>{formatCurrency(result.maintenanceFloorRetainer)}</strong>, así que la diferencia
        entre ambas cifras es el margen real que te das para absorber incidencias, pequeñas
        desviaciones y negociación.
      </p>

      <div className="result-grid">
        <div className="result-item">
          <span>Referencia base por hora</span>
          <strong>{formatCurrency(result.baseHourlyRate)}/h</strong>
        </div>

        <div className="result-item">
          <span>Horas mensuales con buffer</span>
          <strong>{formatNumber(result.bufferedIncludedHours, 2)} h</strong>
        </div>

        <div className="result-item">
          <span>Costes mensuales del cliente</span>
          <strong>{formatCurrency(result.directMonthlyClientCosts)}</strong>
        </div>

        <div className="result-item">
          <span>Cuota mínima defendible</span>
          <strong>{formatCurrency(result.maintenanceFloorRetainer)}</strong>
        </div>

        <div className="result-item">
          <span>Cuota recomendada sin IVA</span>
          <strong>{formatCurrency(result.recommendedMonthlyRetainer)}</strong>
        </div>

        <div className="result-item">
          <span>Colchón entre mínimo y recomendado</span>
          <strong>{formatCurrency(pricingBuffer)}</strong>
        </div>

        <div className="result-item result-item-full">
          <span>Total mensual con IVA</span>
          <strong>{formatCurrency(result.totalWithVAT)}</strong>
        </div>
      </div>

      <div className="capacity-check" ref={capacityRef}>
        <h4>¿Cuántos clientes como este necesitas?</h4>
        <dl className="capacity-metrics">
          <div>
            <dt>Para alcanzar tu objetivo</dt>
            <dd>
              {result.clientsNeededForTarget}{' '}
              {result.clientsNeededForTarget === 1 ? 'cliente' : 'clientes'}
            </dd>
          </div>
          <div>
            <dt>Caben en tus horas</dt>
            <dd>
              {result.maxClientsByHours} {result.maxClientsByHours === 1 ? 'cliente' : 'clientes'}
            </dd>
          </div>
        </dl>
        {exceedsCapacity ? (
          <p>
            A esta cuota y con estas horas incluidas, el objetivo supera tu capacidad en{' '}
            <strong>{hoursOverCapacity} h al mes</strong>. Revisa la cuota o el alcance antes de
            añadir más clientes.
          </p>
        ) : (
          <p>
            Esos clientes ocuparían <strong>{hoursNeeded} h</strong> de tus{' '}
            <strong>{formatNumber(result.billableHoursPerMonth, 2)} h</strong> facturables al mes.
          </p>
        )}
        <small>
          Referencia orientativa: supone que todos pagan esta cuota y consumen las mismas horas y
          costes mensuales.
        </small>
      </div>

      <div className="result-next-step">
        <strong>Lectura rápida para defender la cuota</strong>
        <p>
          Si el cliente intenta bajar la mensualidad, toma{' '}
          <strong>{formatCurrency(result.maintenanceFloorRetainer)}</strong> como referencia de
          suelo: por debajo de esa cifra empiezas a comerte tu parte del soporte, las incidencias o
          el margen del servicio. La zona más cómoda para presentar propuesta está más cerca de{' '}
          <strong>{formatCurrency(result.recommendedMonthlyRetainer)}</strong>.
        </p>
      </div>

      <div className="result-copy-box">
        <div className="result-copy-header">
          <div>
            <strong>Resumen listo para guardar</strong>
            <p>
              Copia una versión corta del cálculo para convertirlo en una nota interna, una oferta
              mensual o una explicación rápida para el cliente.
            </p>
          </div>
          <button type="button" className="result-copy-button" onClick={handleCopySummary}>
            {copyStatus === 'copied' ? 'Resumen copiado' : 'Copiar resumen'}
          </button>
        </div>
        <pre className="result-copy-preview">{maintenanceSummary}</pre>
        {copyStatus === 'copied' && (
          <span className="result-copy-status" role="status">
            Resumen copiado.
          </span>
        )}
        {copyStatus === 'error' && (
          <span className="result-copy-status result-copy-status-error" role="status">
            No se ha podido copiar automáticamente. Puedes seleccionar el resumen manualmente.
          </span>
        )}
      </div>

      <p className="result-summary">
        Para sostener un objetivo mensual de <strong>{formatCurrency(result.targetMonthlyNet)}</strong>
        , con unos costes fijos de <strong>{formatCurrency(result.monthlyFixedCosts)}</strong> y{' '}
        <strong>{formatNumber(result.billableHoursPerMonth, 2)}</strong> horas facturables al mes, tu referencia
        mensual se sitúa en <strong>{formatCurrency(result.monthlyRevenueTarget)}</strong> antes de
        repartirla entre clientes recurrentes.
      </p>

      <p className="result-summary">
        En este caso hemos partido de <strong>{formatNumber(result.includedHoursPerClient, 2)} horas incluidas</strong>{' '}
        al mes y les hemos aplicado un buffer del <strong>{formatNumber(result.incidentBufferPercent, 2)}%</strong>,
        lo que deja el servicio en <strong>{formatNumber(result.bufferedIncludedHours, 2)} horas</strong> razonables
        para soportar incidencias y pequeñas tareas sin improvisar la cuota.
      </p>

      <p className="result-summary">
        Además, has dejado una reserva fiscal orientativa del{' '}
        <strong>{formatNumber(result.taxReservePercent, 2)}%</strong> y un margen extra del{' '}
        <strong>{formatNumber(result.profitMarginPercent, 2)}%</strong>. Eso sitúa el servicio en una referencia
        efectiva de <strong>{formatCurrency(result.effectiveHourlyRate)}/h</strong> sobre las horas
        ya amortiguadas por buffer, con un colchón de{' '}
        <strong>{formatCurrency(pricingBuffer)}</strong> frente al mínimo.
        {hasIVA ? (
          <>
            {' '}
            Si repercutes IVA, tendrías que añadir aproximadamente{' '}
            <strong>{formatCurrency(result.vatAmount)}</strong>, dejando la cuota final en{' '}
            <strong>{formatCurrency(result.totalWithVAT)}</strong>.
          </>
        ) : (
          <> En esta simulación no se añade IVA al total.</>
        )}
      </p>

      <div className="result-next-step">
        <strong>Siguiente paso recomendado</strong>
        <p>
          Usa la cuota recomendada como base para definir tu plan mensual. Si el cliente aprieta
          precio, intenta tocar antes alcance, horas incluidas o tiempos de respuesta: bajar por
          debajo del mínimo defendible significa asumir tu parte del coste del mantenimiento.
        </p>
      </div>
    </section>
  );
});

export default ResultCard;
