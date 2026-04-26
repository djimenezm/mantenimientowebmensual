import type { Metadata } from 'next';
import Link from 'next/link';
import Script from 'next/script';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import LeadMagnetForm from '@/components/LeadMagnetForm';
import { getSiteUrl, siteConfig } from '@/lib/site';

const route = '/mantenimiento-web-vs-bolsa-horas';
const title = 'Mantenimiento web mensual vs bolsa de horas: cuándo vender cada opción';
const description =
  'Guía para decidir si conviene vender mantenimiento web mensual, bolsa de horas o soporte puntual según recurrencia, urgencias, riesgo, alcance y margen.';

const pageFaqItems = [
  {
    question: '¿Qué es mejor, mantenimiento mensual o bolsa de horas?',
    answer:
      'Depende del tipo de cliente. El mantenimiento mensual encaja cuando hay recurrencia, seguimiento y responsabilidad continua. La bolsa de horas encaja mejor para tareas puntuales o demanda irregular.',
  },
  {
    question: '¿Una bolsa de horas puede sustituir al mantenimiento web?',
    answer:
      'Puede cubrir tareas concretas, pero no siempre sustituye un servicio recurrente con supervisión, actualizaciones, copias, seguridad o respuesta ante incidencias.',
  },
  {
    question: '¿Cómo precio una bolsa de horas sin perder margen?',
    answer:
      'Debes partir de tu tarifa real por hora, definir vigencia, consumo mínimo, qué tareas entran, qué urgencias quedan fuera y cómo se facturan horas adicionales.',
  },
] as const;

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: route,
  },
  keywords: [
    'mantenimiento web vs bolsa de horas',
    'bolsa de horas mantenimiento web',
    'mantenimiento web mensual o bolsa de horas',
    'precio bolsa de horas web',
    'cuota mensual mantenimiento web',
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

export default function MantenimientoVsBolsaHorasPage() {
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
        id="mantenimiento-vs-bolsa-article-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <Script
        id="mantenimiento-vs-bolsa-breadcrumb-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <Script
        id="mantenimiento-vs-bolsa-faq-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <Header />

      <section className="hero">
        <div className="container article-layout">
          <div className="text-block">
            <span className="eyebrow">Decisión comercial</span>
            <h1>Mantenimiento web mensual vs bolsa de horas: cuándo vender cada opción</h1>
            <p className="lead">
              No todos los clientes necesitan una cuota mensual completa, pero tampoco todas las
              tareas encajan en una bolsa de horas. Elegir mal el formato puede dejarte sin margen,
              sin previsión o con soporte ilimitado disfrazado de favor.
            </p>
            <div className="hero-badges" aria-label="Qué compara esta guía">
              <span className="hero-badge">Cuota mensual</span>
              <span className="hero-badge">Bolsa de horas</span>
              <span className="hero-badge">Soporte puntual</span>
            </div>
            <div className="guide-cta">
              <Link href="/#calculadora" className="primary-button">
                Calcular una cuota
              </Link>
              <Link href="/que-incluye-mantenimiento-web" className="primary-button">
                Ver qué incluye
              </Link>
            </div>
          </div>

          <aside className="feature-card article-summary">
            <h2>Resumen rápido</h2>
            <ul className="article-list">
              <li>Cuota mensual: mejor para seguimiento, riesgo y recurrencia.</li>
              <li>Bolsa de horas: mejor para tareas puntuales y demanda irregular.</li>
              <li>Soporte urgente: conviene cobrarlo aparte o con condiciones especiales.</li>
              <li>El precio debe salir de horas reales, no de una cifra cómoda.</li>
            </ul>
          </aside>
        </div>
      </section>

      <section className="section">
        <div className="container feature-grid" aria-label="Comparativa principal">
          <article className="feature-card">
            <h2>Cuándo vender mantenimiento mensual</h2>
            <p>
              Cuando hay actualizaciones, copias, supervisión, incidencias previsibles, soporte
              continuado o una web con dependencia comercial. El cliente compra tranquilidad y tú
              necesitas margen para responder sin improvisar.
            </p>
          </article>

          <article className="feature-card">
            <h2>Cuándo vender bolsa de horas</h2>
            <p>
              Cuando el cliente no necesita seguimiento recurrente, pero sí pequeñas tareas
              puntuales. Funciona mejor con caducidad, alcance claro y tareas excluidas desde el
              principio.
            </p>
          </article>

          <article className="feature-card">
            <h2>Cuándo evitar ambas opciones</h2>
            <p>
              Si hay un rediseño, una migración, una integración grande o un problema grave previo,
              probablemente conviene presupuestarlo como proyecto cerrado antes de vender una cuota.
            </p>
          </article>
        </div>
      </section>

      <section className="section alt">
        <div className="container article-layout">
          <div className="text-block">
            <h2>Diferencias clave antes de poner precio</h2>
            <ol className="article-list article-list-ordered">
              <li>El mantenimiento mensual vende disponibilidad y prevención.</li>
              <li>La bolsa de horas vende tiempo acotado para tareas concretas.</li>
              <li>La cuota mensual suele incluir responsabilidad recurrente.</li>
              <li>La bolsa debe tener vigencia, consumo y límites muy claros.</li>
              <li>Las urgencias no deberían valer lo mismo que el soporte normal.</li>
              <li>Ambas opciones necesitan exclusiones para proteger margen.</li>
            </ol>
            <div className="disclaimer-box">
              <strong>Regla práctica:</strong> si el cliente espera que estés pendiente de la web
              aunque no pida tareas, probablemente está comprando mantenimiento, no una bolsa de
              horas.
            </div>
          </div>

          <aside className="feature-card article-summary">
            <h2>Preguntas para decidir</h2>
            <ul className="article-list">
              <li>¿Hay tareas todos los meses?</li>
              <li>¿La web tiene impacto comercial directo?</li>
              <li>¿El cliente espera respuesta rápida?</li>
              <li>¿Hay actualizaciones o supervisión recurrente?</li>
              <li>¿Puedes dejar tareas fuera sin fricción?</li>
            </ul>
          </aside>
        </div>
      </section>

      <section className="section">
        <div className="container text-block">
          <h2>Cómo presentar ambas opciones sin confundirte</h2>
          <p>
            Una buena estrategia es ofrecer la bolsa de horas como opción puntual y el mantenimiento
            mensual como opción de continuidad. Así el cliente entiende que no son lo mismo y que la
            cuota mensual cubre algo más que tareas sueltas.
          </p>
          <div className="feature-grid" aria-label="Formas de presentar opciones">
            <article className="feature-card">
              <h3>Bolsa de horas</h3>
              <p>
                Para pequeños cambios, ajustes puntuales o soporte no recurrente. Define horas,
                vigencia y precio de horas adicionales.
              </p>
            </article>

            <article className="feature-card">
              <h3>Mantenimiento mensual</h3>
              <p>
                Para seguimiento continuo, actualizaciones, copias, supervisión e incidencias
                normales dentro de un alcance pactado.
              </p>
            </article>

            <article className="feature-card">
              <h3>Proyecto cerrado</h3>
              <p>
                Para trabajos grandes o con alcance propio: rediseños, migraciones, nuevas páginas
                o integraciones no previstas.
              </p>
            </article>
          </div>
        </div>
      </section>

      <section className="section alt">
        <div className="container text-block">
          <h2>Cómo llevar la decisión a números</h2>
          <p>
            Si eliges mantenimiento mensual, calcula una cuota con horas incluidas, buffer de
            incidencias, costes por cliente y margen. Si eliges bolsa de horas, parte de una tarifa
            por hora realista y añade condiciones de uso para que no se convierta en soporte
            ilimitado.
          </p>
          <p>
            Para definir mejor el alcance mensual, puedes revisar la guía sobre{' '}
            <Link href="/que-incluye-mantenimiento-web">qué incluye un mantenimiento web</Link>. Si
            quieres estructurar planes, mira también{' '}
            <Link href="/paquetes-mantenimiento-web">paquetes de mantenimiento web</Link>.
          </p>
          <div className="guide-cta">
            <Link href="/#calculadora" className="primary-button">
              Calcular mi cuota mensual
            </Link>
            <Link href="/precio-mantenimiento-wordpress" className="primary-button">
              Ver precio WordPress
            </Link>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <LeadMagnetForm
            source="mantenimiento-vs-bolsa-horas"
            title="Llévate el kit para decidir mejor tu mantenimiento"
            description="Recibe el checklist y la estructura base para separar cuota mensual, bolsa de horas, límites, extras y tareas fuera de alcance."
            buttonLabel="Quiero el kit"
          />
        </div>
      </section>

      <section className="section alt" id="faq-mantenimiento-vs-bolsa">
        <div className="container text-block">
          <span className="eyebrow">Preguntas frecuentes</span>
          <h2>Dudas habituales sobre mantenimiento web y bolsas de horas</h2>
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
