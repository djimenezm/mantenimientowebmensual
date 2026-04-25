import type { Metadata } from 'next';
import Link from 'next/link';
import Script from 'next/script';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import LeadMagnetForm from '@/components/LeadMagnetForm';
import { getSiteUrl, siteConfig } from '@/lib/site';

const route = '/precio-mantenimiento-wordpress';
const title = 'Precio de mantenimiento WordPress sin regalar soporte cada mes';
const description =
  'Guia practica para definir el precio de mantenimiento WordPress segun horas incluidas, incidencias, soporte, herramientas, margen e IVA aparte.';

const pageFaqItems = [
  {
    question: 'Cuanto cuesta un mantenimiento WordPress al mes?',
    answer:
      'No hay una cuota unica. Depende del tipo de web, las horas incluidas, el nivel de soporte, las incidencias esperables, las herramientas y el margen que necesitas proteger.',
  },
  {
    question: 'Que suele incluir un mantenimiento WordPress?',
    answer:
      'Suele incluir actualizaciones, copias, supervision, pequenas tareas, soporte basico y resolucion de incidencias dentro de un alcance definido. Lo importante es dejar claros los limites del servicio.',
  },
  {
    question: 'Es mejor venderlo como bolsa de horas o como cuota fija?',
    answer:
      'La cuota fija suele venderse mejor, pero solo funciona si esta construida sobre una referencia realista de tiempo, incidencias y coste del servicio. Si no, acabas absorbiendo soporte gratis.',
  },
] as const;

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: route,
  },
  keywords: [
    'precio mantenimiento wordpress',
    'cuanto cobrar mantenimiento wordpress',
    'mantenimiento wordpress mensual precio',
    'cuota mantenimiento wordpress',
    'precio soporte wordpress',
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

export default function PrecioMantenimientoWordPressPage() {
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
    datePublished: '2026-04-25',
    dateModified: '2026-04-25',
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
        id="precio-wordpress-article-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <Script
        id="precio-wordpress-breadcrumb-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <Script
        id="precio-wordpress-faq-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <Header />

      <section className="hero">
        <div className="container article-layout">
          <div className="text-block">
            <span className="eyebrow">Guia practica</span>
            <h1>Precio de mantenimiento WordPress sin regalar soporte cada mes</h1>
            <p className="lead">
              Poner una cuota de mantenimiento WordPress no deberia depender de una cifra tomada de
              internet ni de lo que el cliente considera asumible. Si quieres que sea sostenible,
              necesitas bajar el servicio a horas reales, incidencias, herramientas y margen.
            </p>
            <div className="hero-badges" aria-label="Que cubre esta guia">
              <span className="hero-badge">WordPress</span>
              <span className="hero-badge">Cuota mensual</span>
              <span className="hero-badge">Soporte recurrente</span>
            </div>
            <div className="guide-cta">
              <Link href="/#calculadora" className="primary-button">
                Ir a la calculadora
              </Link>
            </div>
          </div>

          <aside className="feature-card article-summary">
            <h2>Que vas a aterrizar aqui</h2>
            <ul className="article-list">
              <li>Que cambia de verdad el precio de un mantenimiento WordPress.</li>
              <li>Como evitar que una cuota mensual acabe absorbiendo demasiado soporte.</li>
              <li>Que diferencia hay entre un plan minimo y una cuota sana.</li>
              <li>Como usar la calculadora para llegar a una cifra defendible.</li>
            </ul>
          </aside>
        </div>
      </section>

      <section className="section">
        <div className="container text-block">
          <h2>WordPress parece facil hasta que aparecen las incidencias</h2>
          <p>
            Sobre el papel, un mantenimiento WordPress puede parecer solo una combinacion de
            actualizaciones, copias y pequenas tareas. En la practica, tambien absorbe revisiones,
            conflictos de plugins, consultas del cliente, supervision y pequenas urgencias que no
            siempre se ven en la propuesta inicial.
          </p>
          <p>
            Por eso una cuota sana no sale de una intuicion rapida. Sale de entender cuanto tiempo
            real puedes acabar invirtiendo cada mes y de proteger el margen del servicio.
          </p>
          <div className="disclaimer-box">
            <strong>Idea clave:</strong> el precio de mantenimiento WordPress no deberia medir solo
            tareas visibles. Deberia medir tambien el desgaste real del soporte continuo.
          </div>
        </div>
      </section>

      <section className="section alt">
        <div className="container feature-grid" aria-label="Factores que cambian el precio">
          <article className="feature-card">
            <h2>1. Tipo de web y nivel de riesgo</h2>
            <p>
              No cuesta lo mismo mantener una web corporativa simple que una instalacion con mas
              plugins, formularios, integraciones o dependencia comercial fuerte.
            </p>
          </article>

          <article className="feature-card">
            <h2>2. Soporte real y friccion</h2>
            <p>
              Parte de la cuota debe cubrir seguimiento, pequenas consultas, incidencias suaves y
              tareas que acaban apareciendo aunque no estuvieran en el mejor escenario.
            </p>
          </article>

          <article className="feature-card">
            <h2>3. Herramientas y margen</h2>
            <p>
              Backups, monitorizacion, seguridad, licencias o terceros tambien forman parte del
              coste del servicio y no deberian salir gratis de tu margen.
            </p>
          </article>
        </div>
      </section>

      <section className="section">
        <div className="container text-block">
          <h2>Errores tipicos al fijar el precio de mantenimiento WordPress</h2>
          <ol className="article-list article-list-ordered">
            <li>Poner una cuota copiando el mercado sin conocer tu suelo.</li>
            <li>No dejar claro que tareas y soporte entran realmente.</li>
            <li>Contar solo horas visibles y no incidencias o friccion mensual.</li>
            <li>Olvidar herramientas, licencias o costes por cliente.</li>
            <li>Bajar la cuota sin ajustar limites del servicio.</li>
          </ol>
          <p>
            Si tu servicio no es solo WordPress y quieres una base mas general, puedes apoyarte
            tambien en la guia sobre{' '}
            <Link href="/cuanto-cobrar-mantenimiento-web-mensual">
              cuanto cobrar mantenimiento web mensual
            </Link>
            .
          </p>
        </div>
      </section>

      <section className="section alt">
        <div className="container feature-grid" aria-label="Como usar la calculadora para WordPress">
          <article className="feature-card">
            <h2>Referencia base por hora</h2>
            <p>
              Te ayuda a no improvisar. Si tu cuota queda muy por debajo de esa base, es facil que
              el servicio deje poco margen en cuanto aparezcan incidencias.
            </p>
          </article>

          <article className="feature-card">
            <h2>Cuota minima defendible</h2>
            <p>
              Marca el suelo antes de negociar. Si el cliente quiere bajar mas, probablemente toque
              reducir horas, soporte o tiempos de respuesta.
            </p>
          </article>

          <article className="feature-card">
            <h2>Cuota recomendada</h2>
            <p>
              Es la zona donde puedes vender un plan WordPress mas sano, con margen para incidencias
              normales y mejor capacidad de sostener el servicio.
            </p>
          </article>
        </div>
      </section>

      <section className="section">
        <div className="container text-block">
          <h2>Lleva la teoria a una cuota WordPress concreta</h2>
          <p>
            Esta guia te da el marco. La calculadora te ayuda a probar tu caso con objetivo mensual,
            costes fijos, horas incluidas, buffer, costes por cliente, margen e IVA para obtener
            una cuota mucho mas util que una cifra improvisada.
          </p>
          <div className="guide-cta">
            <Link href="/#calculadora" className="primary-button">
              Calcular mi cuota WordPress
            </Link>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <LeadMagnetForm
            source="precio-mantenimiento-wordpress"
            title="Te enviamos el kit de mantenimiento"
            description="Accede al recurso gratuito para vender mejor soporte y mantenimiento WordPress, con checklist, alcance y estructura de cuota."
            buttonLabel="Quiero el kit"
          />
        </div>
      </section>

      <section className="section alt" aria-labelledby="precio-wordpress-faq-title">
        <div className="container text-block">
          <h2 id="precio-wordpress-faq-title">
            Preguntas frecuentes sobre el precio de mantenimiento WordPress
          </h2>

          <div className="faq-list">
            {pageFaqItems.map((item) => (
              <article className="faq-item" key={item.question}>
                <h3>{item.question}</h3>
                <p>{item.answer}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container text-block">
          <span className="eyebrow">Siguiente paso</span>
          <h2>Pasa del precio orientativo a una cuota defendible</h2>
          <p>
            Si ya tienes claro que WordPress no se deberia mantener por intuicion, el siguiente paso
            util es probar tu caso real en la calculadora y separar tu minimo de tu zona recomendada.
          </p>
          <div className="guide-cta">
            <Link href="/#calculadora" className="primary-button">
              Probar la calculadora
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
