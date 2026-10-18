import type { Metadata } from 'next';
import Link from 'next/link';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import JsonLd from '@/components/JsonLd';
import { calculateMaintenanceRetainer } from '@/lib/calculator';
import { formatCurrency, formatNumber } from '@/lib/format';
import { packageExampleInputs, packageExampleQuotes } from '@/lib/packageExamples';
import { getSiteUrl, siteConfig } from '@/lib/site';

const route = '/cuanto-cobrar-mantenimiento-web-mensual';
const title = 'Cuánto cobrar mantenimiento web mensual: ejemplo y cálculo paso a paso';
const description =
  'Calcula una cuota de mantenimiento con un ejemplo reproducible: horas, incidencias, costes, recargo e IVA. Comprueba también la capacidad y los límites del servicio.';
const updatedAt = '2026-10-18';
const example = packageExampleInputs.professional;
const quote = packageExampleQuotes.professional;
const largerScope = calculateMaintenanceRetainer({ ...example, includedHoursPerClient: 6 });

const pageFaqItems = [
  {
    question: '¿Cuánto cobrar por mantenimiento web mensual?',
    answer:
      `Depende de tus costes y del alcance. En el ejemplo hipotético de esta guía, ${example.includedHoursPerClient} horas pactadas, un ${example.incidentBufferPercent}% de reserva interna de tiempo y ${formatCurrency(example.directMonthlyClientCosts)} de costes directos dan una cuota mínima de ${formatCurrency(quote.maintenanceFloorRetainer)} y una recomendada de ${formatCurrency(quote.recommendedMonthlyRetainer)}, ambas sin IVA. No son precios de mercado ni una oferta de servicio.`,
  },
  {
    question: '¿El buffer da derecho a más horas de soporte?',
    answer:
      `No. Es una reserva interna de tiempo para calcular el coste. En este ejemplo se reservan ${formatNumber(quote.bufferedIncludedHours)} horas de capacidad, pero el alcance que se ofrece al cliente sigue siendo de ${example.includedHoursPerClient} horas. Las tareas y los extras deben pactarse por separado.`,
  },
  {
    question: '¿La cuota recomendada garantiza beneficio o un neto concreto?',
    answer:
      'No. Es una simulación que depende de que se cumplan los costes, horas y clientes previstos. La reserva fiscal es una hipótesis simplificada, y el porcentaje extra es un recargo sobre el coste, no un margen de beneficio garantizado sobre las ventas.',
  },
] as const;

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: route },
  openGraph: {
    title: `${title} | ${siteConfig.name}`,
    description,
    url: route,
    type: 'article',
    modifiedTime: updatedAt,
    images: [{ url: '/opengraph-image', width: 1200, height: 630, alt: title }],
  },
  twitter: {
    card: 'summary_large_image',
    title,
    description,
    images: ['/opengraph-image'],
  },
};

export default function CuantoCobrarMantenimientoWebMensualPage() {
  const siteUrl = getSiteUrl();
  const pageUrl = new URL(route, siteUrl).toString();
  const inputs = [
    ['Objetivo mensual después de la reserva', formatCurrency(example.targetMonthlyNet)],
    ['Costes fijos mensuales', formatCurrency(example.monthlyFixedCosts)],
    ['Horas facturables mensuales', `${example.billableHoursPerMonth} h`],
    ['Horas pactadas por cliente', `${example.includedHoursPerClient} h`],
    ['Reserva interna de tiempo', `${example.incidentBufferPercent}%`],
    ['Costes directos por cliente', formatCurrency(example.directMonthlyClientCosts)],
    ['Reserva fiscal hipotética', `${example.taxReservePercent}%`],
    ['Recargo sobre el coste', `${example.profitMarginPercent}%`],
  ];

  return (
    <>
      <Header />
      <main id="contenido-principal">
        <JsonLd id="mantenimiento-web-article-schema" data={{
          '@context': 'https://schema.org',
          '@type': 'Article',
          headline: title,
          description,
          inLanguage: 'es',
          mainEntityOfPage: pageUrl,
          author: { '@type': 'Person', name: siteConfig.ownerName },
          publisher: { '@type': 'Organization', name: siteConfig.name },
          datePublished: '2026-04-24',
          dateModified: updatedAt,
        }} />
        <JsonLd id="mantenimiento-web-breadcrumb-schema" data={{
          '@context': 'https://schema.org',
          '@type': 'BreadcrumbList',
          itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Inicio', item: new URL('/', siteUrl).toString() },
            { '@type': 'ListItem', position: 2, name: title, item: pageUrl },
          ],
        }} />
        <JsonLd id="mantenimiento-web-faq-schema" data={{
          '@context': 'https://schema.org',
          '@type': 'FAQPage',
          mainEntity: pageFaqItems.map((item) => ({
            '@type': 'Question', name: item.question,
            acceptedAnswer: { '@type': 'Answer', text: item.answer },
          })),
        }} />

        <section className="hero" aria-labelledby="maintenance-guide-title">
          <div className="container article-layout">
            <div className="text-block">
              <span className="eyebrow">Guía con un ejemplo calculado</span>
              <h1 id="maintenance-guide-title">Cuánto cobrar por mantenimiento web mensual</h1>
              <p className="lead">
                Sigue una cuota desde los costes hasta el total con IVA. Después comprueba cuántos
                clientes caben en tu agenda y qué cambia si el soporte se amplía.
              </p>
              <p className="guide-byline">
                Responsable: {siteConfig.ownerName}. Actualizada el <time dateTime={updatedAt}>18 de octubre de 2026</time>.
              </p>
              <div className="guide-cta"><Link href="/#calculadora" className="primary-button">Calcular mi cuota</Link></div>
            </div>
            <aside className="article-summary">
              <h2>El resultado del ejemplo</h2>
              <p>{example.includedHoursPerClient} horas pactadas al mes.</p>
              <p><strong>{formatCurrency(quote.recommendedMonthlyRetainer)} sin IVA.</strong></p>
              <p>Escenario hipotético, no una tarifa de mercado ni una oferta comercial.</p>
            </aside>
          </div>
        </section>

        <section className="section" id="ejemplo-calculado" aria-labelledby="example-title">
          <div className="container text-block">
            <nav className="guide-jump-links" aria-label="Contenido de la guía">
              <a href="#ejemplo-calculado">Datos del ejemplo</a>
              <a href="#metodo">Cálculo paso a paso</a>
              <a href="#capacidad">Clientes y capacidad</a>
              <a href="#limites">Límites del modelo</a>
            </nav>
            <h2 id="example-title">Un plan de 4 horas con todos sus datos</h2>
            <p>
              Usamos el mismo motor que la calculadora, sin una tabla de precios oculta. Los datos
              son ficticios y sirven para reproducir el resultado, no proceden de clientes ni de un estudio de mercado.
            </p>
            <dl className="guide-example-inputs">
              {inputs.map(([label, value]) => <div key={label}><dt>{label}</dt><dd>{value}</dd></div>)}
            </dl>
            <p>
              El ejemplo añade un 21% de IVA únicamente como simulación. Para repetirlo, introduce
              estos ocho valores y marca «Sí» en IVA en la <Link href="/#calculadora">calculadora</Link>.
            </p>
          </div>
        </section>

        <section className="section alt" id="metodo" aria-labelledby="method-title">
          <div className="container text-block">
            <h2 id="method-title">De tus costes a la cuota mensual</h2>
            <ol className="article-list guide-calculation-steps">
              <li>
                <strong>Objetivo de facturación: {formatCurrency(quote.monthlyRevenueTarget)} al mes.</strong>
                {formatCurrency(example.targetMonthlyNet)} / (1 − {example.taxReservePercent} / 100)
                {' '}+ {formatCurrency(example.monthlyFixedCosts)} de costes fijos. La reserva es una hipótesis, no un cálculo de impuestos.
              </li>
              <li>
                <strong>Tarifa interna: {formatCurrency(quote.baseHourlyRate)} por hora.</strong>
                Divide ese objetivo entre {example.billableHoursPerMonth} horas facturables.
                Las horas de ventas, administración o formación deben quedar fuera de esas horas.
              </li>
              <li>
                <strong>Tiempo reservado: {formatNumber(quote.bufferedIncludedHours)} horas por cliente.</strong>
                {example.includedHoursPerClient} h × (1 + {example.incidentBufferPercent} / 100).
                La hora adicional es reserva interna: no convierte un plan de 4 horas en uno de 5.
              </li>
              <li>
                <strong>Cuota mínima: {formatCurrency(quote.maintenanceFloorRetainer)} sin IVA.</strong>
                Multiplica el tiempo reservado por la tarifa interna y suma los
                {' '}{formatCurrency(example.directMonthlyClientCosts)} de costes directos del cliente.
              </li>
              <li>
                <strong>Cuota recomendada: {formatCurrency(quote.recommendedMonthlyRetainer)} sin IVA.</strong>
                Aplica un recargo del {example.profitMarginPercent}% al coste anterior. No es un
                {' '}{example.profitMarginPercent}% de beneficio garantizado sobre las ventas.
              </li>
            </ol>
            <dl className="maintenance-example-metrics">
              <div><dt>Cuota sin IVA</dt><dd>{formatCurrency(quote.recommendedMonthlyRetainer)}</dd></div>
              <div><dt>IVA simulado, 21%</dt><dd>{formatCurrency(quote.vatAmount)}</dd></div>
              <div><dt>Total mensual con IVA</dt><dd>{formatCurrency(quote.totalWithVAT)}</dd></div>
            </dl>
            <p>
              Se conserva la precisión interna durante el cálculo; los importes mostrados se redondean
              a dos decimales. Por eso, recalcular a mano con la tarifa por hora ya redondeada puede variar unos céntimos.
            </p>
          </div>
        </section>

        <section className="section" id="capacidad" aria-labelledby="capacity-title">
          <div className="container text-block">
            <h2 id="capacity-title">¿Cuántos clientes caben de verdad?</h2>
            <p>
              A esta cuota necesitas {quote.clientsNeededForTarget} clientes similares para cubrir
              el objetivo, descontando primero el coste directo de cada uno. Consumen
              {' '}{formatNumber(quote.hoursNeededForTarget)} de tus {example.billableHoursPerMonth} horas
              facturables. El máximo por horas es de {quote.maxClientsByHours} clientes.
            </p>
            <p>
              No es una previsión de ventas. Supone clientes con la misma cuota, horas y costes,
              sin impagos ni bajas. Si ya dedicas parte de tu jornada a proyectos, reduce las horas
              disponibles para mantenimiento antes de calcular.
            </p>
            <h3>Si las tareas pasan de 4 a 6 horas todos los meses</h3>
            <p>
              Mantener el precio no mantiene el alcance. Con 6 horas pactadas y los demás datos
              iguales, el motor calcula {formatNumber(largerScope.bufferedIncludedHours)} horas internas
              y recomienda <strong>{formatCurrency(largerScope.recommendedMonthlyRetainer)} sin IVA</strong>.
              Solo cabrían {largerScope.maxClientsByHours} clientes, frente a los {quote.maxClientsByHours} del plan inicial.
            </p>
            <p>
              Una petición puntual fuera de las 4 horas exige acordar un extra; si se repite,
              conviene revisar el plan. El buffer interno no sustituye ese acuerdo.
            </p>
          </div>
        </section>

        <section className="section alt" id="limites" aria-labelledby="limits-title">
          <div className="container text-block">
            <h2 id="limits-title">Qué no resuelve esta cifra</h2>
            <ul className="article-list">
              <li>La reserva fiscal no calcula tramos, deducciones, cuota de autónomos ni obligaciones personales. Incluye tus gastos profesionales en los costes sin duplicarlos.</li>
              <li>El IVA del ejemplo no determina si debes repercutirlo ni qué tipo corresponde a tu operación. El IVA cobrado no es ingreso disponible.</li>
              <li>El buffer estima tiempo, no la probabilidad ni el coste de una emergencia grave. No presupone disponibilidad 24/7.</li>
              <li>La cuota mínima depende de que tus horas y costes sean realistas. Un resultado matemático no garantiza rentabilidad.</li>
            </ul>
            <p>
              Antes de ofrecer el servicio, deja por escrito tareas, horas, respuesta inicial,
              exclusiones y aprobación de extras. Responder a una incidencia no equivale a prometer
              su resolución en ese mismo plazo.
            </p>
            <p>
              Para comprobar el tratamiento de tu operación, utiliza la información oficial de
              {' '}<a href="https://sede.agenciatributaria.gob.es/Sede/iva/calculo-iva-repercutido-clientes.html">IVA repercutido de la Agencia Tributaria</a>
              {' '}o consulta a tu asesoría.
            </p>
            <div className="guide-cta">
              <Link href="/que-incluye-mantenimiento-web">Definir tareas y exclusiones</Link>
              <Link href="/paquetes-mantenimiento-web">Comparar los ejemplos de paquetes</Link>
            </div>
          </div>
        </section>

        <section className="section" aria-labelledby="resources-title">
          <div className="container text-block">
            <h2 id="resources-title">Comprueba el servicio, no solo el precio</h2>
            <p>
              El <Link href="/kit-mantenimiento-web">kit de mantenimiento</Link> incluye una ficha
              editable, registro de tareas y control de extras. Puedes consultarlo y descargarlo
              gratis sin dejar tu email. Es una ayuda operativa, no un contrato jurídico.
            </p>
            <p>
              Para las tareas técnicas, consulta las recomendaciones de
              {' '}<a href="https://developer.wordpress.org/advanced-administration/security/backup/">copias de seguridad de WordPress</a>
              {' '}y <a href="https://wordpress.org/documentation/article/updating-wordpress/">actualización de WordPress</a>.
              Son referencias técnicas: no son la fuente de los precios de esta simulación.
            </p>
            <p>Para señalar un error del modelo o del ejemplo, contacta con <a href={`mailto:${siteConfig.contactEmail}`}>{siteConfig.contactEmail}</a>.</p>
          </div>
        </section>

        <section className="section alt" aria-labelledby="mantenimiento-web-faq-title">
          <div className="container text-block">
            <h2 id="mantenimiento-web-faq-title">Preguntas frecuentes</h2>
            {pageFaqItems.map((item) => (
              <article className="faq-item" key={item.question}><h3>{item.question}</h3><p>{item.answer}</p></article>
            ))}
            <div className="guide-cta"><Link href="/#calculadora" className="primary-button">Calcular mi caso</Link></div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
