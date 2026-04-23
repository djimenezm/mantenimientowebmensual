import { CalculationResult } from '@/lib/calculator';
import { formatCurrency } from '@/lib/format';

type ResultCardProps = {
  result: CalculationResult;
  hasIVA: boolean;
};

export default function ResultCard({ result, hasIVA }: ResultCardProps) {
  const pricingBuffer = Math.max(
    0,
    result.recommendedMonthlyRetainer - result.maintenanceFloorRetainer,
  );

  return (
    <section className="result-card" aria-live="polite">
      <h3>Tu cuota mensual recomendada para mantenimiento web</h3>

      <p className="result-lead">
        Con esta simulacion, una cuota mensual razonable quedaria en{' '}
        <strong>{formatCurrency(result.recommendedMonthlyRetainer)}</strong> sin IVA. Tu suelo para
        no quedarte corto con este servicio estaria alrededor de{' '}
        <strong>{formatCurrency(result.maintenanceFloorRetainer)}</strong>, asi que la diferencia
        entre ambas cifras es el margen real que te das para absorber incidencias, pequeñas
        desviaciones y negociacion.
      </p>

      <div className="result-grid">
        <div className="result-item">
          <span>Referencia base por hora</span>
          <strong>{formatCurrency(result.baseHourlyRate)}/h</strong>
        </div>

        <div className="result-item">
          <span>Horas mensuales con buffer</span>
          <strong>{result.bufferedIncludedHours} h</strong>
        </div>

        <div className="result-item">
          <span>Costes mensuales del cliente</span>
          <strong>{formatCurrency(result.directMonthlyClientCosts)}</strong>
        </div>

        <div className="result-item">
          <span>Cuota minima defendible</span>
          <strong>{formatCurrency(result.maintenanceFloorRetainer)}</strong>
        </div>

        <div className="result-item">
          <span>Cuota recomendada sin IVA</span>
          <strong>{formatCurrency(result.recommendedMonthlyRetainer)}</strong>
        </div>

        <div className="result-item">
          <span>Colchon entre minimo y recomendado</span>
          <strong>{formatCurrency(pricingBuffer)}</strong>
        </div>

        <div className="result-item result-item-full">
          <span>Total mensual con IVA</span>
          <strong>{formatCurrency(result.totalWithVAT)}</strong>
        </div>
      </div>

      <div className="result-next-step">
        <strong>Lectura rapida para defender la cuota</strong>
        <p>
          Si el cliente intenta bajar la mensualidad, toma{' '}
          <strong>{formatCurrency(result.maintenanceFloorRetainer)}</strong> como referencia de
          suelo: por debajo de esa cifra empiezas a comerte tu parte del soporte, las incidencias o
          el margen del servicio. La zona mas comoda para presentar propuesta esta mas cerca de{' '}
          <strong>{formatCurrency(result.recommendedMonthlyRetainer)}</strong>.
        </p>
      </div>

      <p className="result-summary">
        Para sostener un objetivo mensual de <strong>{formatCurrency(result.targetMonthlyNet)}</strong>
        , con unos costes fijos de <strong>{formatCurrency(result.monthlyFixedCosts)}</strong> y{' '}
        <strong>{result.billableHoursPerMonth}</strong> horas facturables al mes, tu referencia
        mensual se situa en <strong>{formatCurrency(result.monthlyRevenueTarget)}</strong> antes de
        repartirla entre clientes recurrentes.
      </p>

      <p className="result-summary">
        En este caso hemos partido de <strong>{result.includedHoursPerClient} horas incluidas</strong>{' '}
        al mes y les hemos aplicado un buffer del <strong>{result.incidentBufferPercent}%</strong>,
        lo que deja el servicio en <strong>{result.bufferedIncludedHours} horas</strong> razonables
        para soportar incidencias y pequenas tareas sin improvisar la cuota.
      </p>

      <p className="result-summary">
        Ademas, has dejado una reserva fiscal orientativa del{' '}
        <strong>{result.taxReservePercent}%</strong> y un margen extra del{' '}
        <strong>{result.profitMarginPercent}%</strong>. Eso situa el servicio en una referencia
        efectiva de <strong>{formatCurrency(result.effectiveHourlyRate)}/h</strong> sobre las horas
        ya amortiguadas por buffer, con un colchon de{' '}
        <strong>{formatCurrency(pricingBuffer)}</strong> frente al minimo.
        {hasIVA ? (
          <>
            {' '}
            Si repercutes IVA, tendrias que anadir aproximadamente{' '}
            <strong>{formatCurrency(result.vatAmount)}</strong>, dejando la cuota final en{' '}
            <strong>{formatCurrency(result.totalWithVAT)}</strong>.
          </>
        ) : (
          <> En esta simulacion no se anade IVA al total.</>
        )}
      </p>

      <div className="result-next-step">
        <strong>Siguiente paso recomendado</strong>
        <p>
          Usa la cuota recomendada como base para definir tu plan mensual. Si el cliente aprieta
          precio, intenta tocar antes alcance, horas incluidas o tiempos de respuesta: bajar por
          debajo del minimo defendible significa asumir tu parte del coste del mantenimiento.
        </p>
      </div>
    </section>
  );
}
