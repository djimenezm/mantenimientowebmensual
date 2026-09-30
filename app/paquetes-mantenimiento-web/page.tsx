import type { Metadata } from 'next';
import Link from 'next/link';
import Script from 'next/script';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import LeadMagnetForm from '@/components/LeadMagnetForm';
import { formatCurrency, formatNumber } from '@/lib/format';
import { packageExampleInputs, packageExampleQuotes } from '@/lib/packageExamples';
import { getSiteUrl, siteConfig } from '@/lib/site';

const route = '/paquetes-mantenimiento-web';
const title = 'Paquetes de mantenimiento web: cómo crear planes mensuales rentables';
const description =
  'Guía para estructurar paquetes de mantenimiento web mensual con alcance claro, horas incluidas, soporte, extras, límites e IVA aparte.';

const pageFaqItems = [
  {
    question: '¿Cuántos paquetes de mantenimiento web conviene ofrecer?',
    answer:
      'Normalmente funcionan bien tres paquetes: básico, profesional y avanzado. Así el cliente puede comparar alcance sin convertir cada propuesta en una negociación desde cero.',
  },
  {
    question: '¿Qué debe incluir un paquete básico?',
    answer:
      'Un paquete básico debería incluir tareas recurrentes concretas, supervisión mínima, copias, actualizaciones y un límite claro de soporte. Lo importante es que no se convierta en soporte ilimitado barato.',
  },
  {
    question: '¿Cómo evitar que el cliente pida tareas fuera del plan?',
    answer:
      'Debes definir por escrito qué entra, qué no entra, cuántas horas incluye el plan, cómo se valoran las tareas extra y qué ocurre con urgencias o cambios de alcance.',
  },
] as const;

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: route,
  },
  keywords: [
    'paquetes mantenimiento web',
    'planes mantenimiento web mensual',
    'servicio mantenimiento web freelance',
    'cuotas mantenimiento web',
    'mantenimiento web mensual planes',
  ],
  openGraph: {
    title: `${title} | ${siteConfig.name}`,
    description,
    url: route,
    type: 'article',
    images: [
      {
        url: '/opengraph-image',
        width: 1200,
        height: 630,
        alt: `${siteConfig.name} - ${title}`,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${title} | ${siteConfig.name}`,
    description,
    images: ['/opengraph-image'],
  },
};

export default function PaquetesMantenimientoWebPage() {
  const siteUrl = getSiteUrl();
  const pageUrl = new URL(route, siteUrl).toString();

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: title,
    description,
    inLanguage: 'es',
    mainEntityOfPage: pageUrl,
    author: {
      '@type': 'Organization',
      name: siteConfig.name,
    },
    publisher: {
      '@type': 'Organization',
      name: siteConfig.name,
    },
    datePublished: '2026-04-26',
    dateModified: '2026-04-26',
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Inicio',
        item: new URL('/', siteUrl).toString(),
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: title,
        item: pageUrl,
      },
    ],
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: pageFaqItems.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  };

  return (
    <main>
      <Script
        id="paquetes-mantenimiento-article-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <Script
        id="paquetes-mantenimiento-breadcrumb-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <Script
        id="paquetes-mantenimiento-faq-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <Header />

      <section className="hero">
        <div className="container article-layout">
          <div className="text-block">
            <span className="eyebrow">Planes mensuales</span>
            <h1>Paquetes de mantenimiento web: cómo crear planes que no se coman tu margen</h1>
            <p className="lead">
              Vender mantenimiento web como una cuota recurrente puede ser una gran fuente de
              estabilidad, pero solo si el paquete tiene límites claros. Si prometes soporte amplio
              por una cuota baja, el retainer deja de ser ingreso recurrente y se convierte en
              deuda de tiempo.
            </p>
            <div className="hero-badges" aria-label="Qué cubre esta guía">
              <span className="hero-badge">Planes mensuales</span>
              <span className="hero-badge">Alcance claro</span>
              <span className="hero-badge">Extras aparte</span>
            </div>
            <div className="guide-cta">
              <Link href="/#calculadora" className="primary-button">
                Calcular una cuota
              </Link>
              <Link href="/kit-mantenimiento-web" className="primary-button">
                Ver kit de mantenimiento
              </Link>
            </div>
          </div>

          <aside className="feature-card article-summary">
            <h2>Estructura recomendada</h2>
            <ul className="article-list">
              <li>Un plan básico para webs simples y soporte limitado.</li>
              <li>Un plan profesional para clientes que necesitan seguimiento real.</li>
              <li>Un plan avanzado para webs con más riesgo, urgencia o dependencia comercial.</li>
              <li>Extras siempre definidos fuera de la cuota mensual.</li>
            </ul>
          </aside>
        </div>
      </section>

      <section className="section">
        <div className="container text-block">
          <h2>Tres planes calculados con la misma base</h2>
          <p>
            Ejemplo para un profesional con {formatCurrency(packageExampleInputs.basic.targetMonthlyNet)}
            {' '}de objetivo neto mensual, {formatCurrency(packageExampleInputs.basic.monthlyFixedCosts)}
            {' '}de costes fijos y {packageExampleInputs.basic.billableHoursPerMonth} horas
            {' '}facturables. La tarifa interna resultante es de
            {' '}{formatCurrency(packageExampleQuotes.basic.baseHourlyRate)} por hora. La reserva fiscal
            {' '}del {packageExampleInputs.basic.taxReservePercent}% es orientativa; las cuotas se
            muestran sin IVA.
          </p>
        </div>
        <div className="container feature-grid" aria-label="Tipos de paquete">
          <article className="feature-card">
            <h2>Plan básico</h2>
            <p>
              {formatNumber(packageExampleInputs.basic.includedHoursPerClient)} horas de soporte al mes para una web
              con pocos cambios: actualizaciones, revisión de copias y pequeños ajustes. Se estiman
              {' '}{formatCurrency(packageExampleInputs.basic.directMonthlyClientCosts)} de costes
              directos y un {packageExampleInputs.basic.incidentBufferPercent}% de reserva interna.
            </p>
            <p className="scenario-price">{formatCurrency(packageExampleQuotes.basic.recommendedMonthlyRetainer)} al mes sin IVA</p>
          </article>

          <article className="feature-card">
            <h2>Plan profesional</h2>
            <p>
              {packageExampleInputs.professional.includedHoursPerClient} horas al mes para seguimiento,
              pruebas de formularios, actualizaciones y ajustes acotados. Se estiman
              {' '}{formatCurrency(packageExampleInputs.professional.directMonthlyClientCosts)} de
              costes directos y un {packageExampleInputs.professional.incidentBufferPercent}% de
              reserva interna para incidencias.
            </p>
            <p className="scenario-price">{formatCurrency(packageExampleQuotes.professional.recommendedMonthlyRetainer)} al mes sin IVA</p>
          </article>

          <article className="feature-card">
            <h2>Plan avanzado</h2>
            <p>
              {packageExampleInputs.advanced.includedHoursPerClient} horas al mes para una web con
              más cambios, integraciones y revisión técnica. Se estiman
              {' '}{formatCurrency(packageExampleInputs.advanced.directMonthlyClientCosts)} de costes
              directos y un {packageExampleInputs.advanced.incidentBufferPercent}% de reserva
              interna. La prioridad de respuesta debe pactarse por escrito.
            </p>
            <p className="scenario-price">{formatCurrency(packageExampleQuotes.advanced.recommendedMonthlyRetainer)} al mes sin IVA</p>
          </article>
        </div>
        <div className="container text-block plan-scenario">
          <h2>Si una incidencia consume más horas</h2>
          <p>
            En el plan profesional, el cliente tiene {packageExampleInputs.professional.includedHoursPerClient}
            {' '}horas incluidas. La calculadora reserva internamente
            {' '}{formatNumber(packageExampleQuotes.professional.bufferedIncludedHours)} horas para proteger tu
            precio ante imprevistos, pero eso no amplía el derecho del cliente a pedir trabajo.
            Si las tareas solicitadas suman 6 horas en un mes, las 2 horas que superan el alcance
            pactado requieren aprobación y presupuesto aparte.
          </p>
          <p>
            Son escenarios orientativos, no tarifas de mercado: cambia tus costes, horas y nivel de
            servicio en la <Link href="/#calculadora">calculadora de mantenimiento</Link> antes de
            enviar una propuesta.
          </p>
        </div>
      </section>

      <section className="section alt">
        <div className="container article-layout">
          <div className="text-block">
            <h2>Qué debe quedar por escrito en cada paquete</h2>
            <p>
              El objetivo de un paquete no es sonar completo, sino evitar ambigüedad. Cada plan debe
              decir qué tareas incluye, cuántas horas cubre, cómo se tratan incidencias, qué no está
              incluido y qué pasa si el cliente pide cambios fuera del alcance.
            </p>
            <ol className="article-list article-list-ordered">
              <li>Horas incluidas y si son acumulables o no.</li>
              <li>Canal de soporte y tiempo de respuesta orientativo.</li>
              <li>Actualizaciones, copias, seguridad y supervisión incluidas.</li>
              <li>Pequeñas tareas permitidas y ejemplos de tareas excluidas.</li>
              <li>Precio de horas extra, urgencias o trabajos puntuales.</li>
            </ol>
            <div className="disclaimer-box">
              <strong>Regla práctica:</strong> si una tarea puede consumir varias horas o cambiar el
              alcance de la web, no debería ir escondida dentro de una cuota mensual barata.
            </div>
          </div>

          <aside className="feature-card article-summary">
            <h2>Extras qué conviene separar</h2>
            <ul className="article-list">
              <li>Nuevas páginas o rediseños.</li>
              <li>Copywriting, SEO profundo o estrategia.</li>
              <li>Integraciones nuevas con CRM, pagos o automatizaciones.</li>
              <li>Recuperación de hackeos o incidencias graves previas.</li>
              <li>Urgencias fuera de horario o con SLA especial.</li>
            </ul>
          </aside>
        </div>
      </section>

      <section className="section">
        <div className="container text-block">
          <h2>Cómo usar la calculadora para fijar cada plan</h2>
          <p>
            Puedes usar la calculadora una vez por cada paquete. En el plan básico introduce pocas
            horas y poco buffer. En el profesional aumenta horas, incidencias y costes directos. En
            el avanzado suma más margen porque hay más responsabilidad y más interrupciones.
          </p>
          <p>
            Después redondea los resultados para que sean fáciles de presentar, pero no bajes de tu
            cuota mínima defendible. Si quieres vender tres planes, el intermedio debería ser el que
            quieres que el cliente elija con más frecuencia.
          </p>
          <div className="guide-cta">
            <Link href="/#calculadora" className="primary-button">
              Ir a la calculadora
            </Link>
            <Link href="/precio-mantenimiento-wordpress" className="primary-button">
              Ver precio WordPress
            </Link>
          </div>
        </div>
      </section>

      <section className="section alt">
        <div className="container">
          <LeadMagnetForm
            source="paquetes-mantenimiento-web"
            title="Llévate el kit para estructurar tu mantenimiento"
            description="Recibe la lista de comprobación y la estructura base para definir alcance, horas incluidas, límites y extras antes de presentar una cuota mensual."
            buttonLabel="Quiero el kit"
          />
        </div>
      </section>

      <section className="section" id="faq-paquetes">
        <div className="container text-block">
          <span className="eyebrow">Preguntas frecuentes</span>
          <h2>Dudas habituales sobre paquetes de mantenimiento web</h2>
          {pageFaqItems.map((item) => (
            <article className="disclaimer-box" key={item.question}>
              <h3>{item.question}</h3>
              <p>{item.answer}</p>
            </article>
          ))}
        </div>
      </section>

      <Footer />
    </main>
  );
}
