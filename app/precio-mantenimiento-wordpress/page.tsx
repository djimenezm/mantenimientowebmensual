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
  'Guía práctica para definir el precio de mantenimiento WordPress según horas incluidas, incidencias, soporte, herramientas, margen e IVA aparte.';

const pageFaqItems = [
  {
    question: '¿Cuánto cuesta un mantenimiento WordPress al mes?',
    answer:
      'No hay una cuota única. Depende del tipo de web, las horas incluidas, el nivel de soporte, las incidencias esperables, las herramientas y el margen qué necesitas proteger.',
  },
  {
    question: '¿Qué suele incluir un mantenimiento WordPress?',
    answer:
      'Suele incluir actualizaciones, copias, supervisión, pequeñas tareas, soporte básico y resolución de incidencias dentro de un alcance definido. Lo importante es dejar claros los límites del servicio.',
  },
  {
    question: '¿Es mejor venderlo como bolsa de horas o como cuota fija?',
    answer:
      'La cuota fija suele venderse mejor, pero solo funciona si está construida sobre una referencia realista de tiempo, incidencias y coste del servicio. Si no, acabas absorbiendo soporte gratis.',
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
    'cuánto cobrar mantenimiento wordpress',
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
    dateModified: '2026-05-02',
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
            <span className="eyebrow">Guía práctica</span>
            <h1>Precio de mantenimiento WordPress sin regalar soporte cada mes</h1>
            <p className="lead">
              Poner una cuota de mantenimiento WordPress no debería depender de una cifra tomada de
              internet ni de lo que el cliente considera asumible. Si quieres que sea sostenible,
              necesitas bajar el servicio a horas reales, incidencias, herramientas y margen.
            </p>
            <div className="hero-badges" aria-label="Qué cubre esta guía">
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
            <h2>Qué vas a aterrizar aquí</h2>
            <ul className="article-list">
              <li>Qué cambia de verdad el precio de un mantenimiento WordPress.</li>
              <li>Cómo evitar que una cuota mensual acabe absorbiendo demasiado soporte.</li>
              <li>Qué diferencia hay entre un plan mínimo y una cuota sana.</li>
              <li>Cómo usar la calculadora para llegar a una cifra defendible.</li>
            </ul>
          </aside>
        </div>
      </section>

      <section className="section">
        <div className="container text-block">
          <h2>WordPress parece fácil hasta que aparecen las incidencias</h2>
          <p>
            Sobre el papel, un mantenimiento WordPress puede parecer solo una combinación de
            actualizaciones, copias y pequeñas tareas. En la práctica, también absorbe revisiones,
            conflictos de plugins, consultas del cliente, supervisión y pequeñas urgencias que no
            siempre se ven en la propuesta inicial.
          </p>
          <p>
            Por eso una cuota sana no sale de una intuición rápida. Sale de entender cuánto tiempo
            real puedes acabar invirtiendo cada mes y de proteger el margen del servicio.
          </p>
          <div className="disclaimer-box">
            <strong>Idea clave:</strong> el precio de mantenimiento WordPress no debería medir solo
            tareas visibles. Debería medir también el desgaste real del soporte continuo.
          </div>
        </div>
      </section>

      <section className="section alt">
        <div className="container feature-grid" aria-label="Factores que cambian el precio">
          <article className="feature-card">
            <h2>1. Tipo de web y nivel de riesgo</h2>
            <p>
              No cuesta lo mismo mantener una web corporativa simple que una instalación con más
              plugins, formularios, integraciones o dependencia comercial fuerte.
            </p>
          </article>

          <article className="feature-card">
            <h2>2. Soporte real y fricción</h2>
            <p>
              Parte de la cuota debe cubrir seguimiento, pequeñas consultas, incidencias suaves y
              tareas que acaban apareciendo aunque no estuvieran en el mejor escenario.
            </p>
          </article>

          <article className="feature-card">
            <h2>3. Herramientas y margen</h2>
            <p>
              Backups, monitorización, seguridad, licencias o terceros también forman parte del
              coste del servicio y no deberían salir gratis de tu margen.
            </p>
          </article>
        </div>
      </section>

      <section className="section">
        <div className="container text-block">
          <h2>Errores típicos al fijar el precio de mantenimiento WordPress</h2>
          <ol className="article-list article-list-ordered">
            <li>Poner una cuota copiando el mercado sin conocer tu suelo.</li>
            <li>No dejar claro qué tareas y soporte entran realmente.</li>
            <li>Contar solo horas visibles y no incidencias o fricción mensual.</li>
            <li>Olvidar herramientas, licencias o costes por cliente.</li>
            <li>Bajar la cuota sin ajustar límites del servicio.</li>
          </ol>
          <p>
            Si tu servicio no es solo WordPress y quieres una base más general, puedes apoyarte
            también en la guía sobre{' '}
            <Link href="/cuanto-cobrar-mantenimiento-web-mensual">
              cuánto cobrar mantenimiento web mensual
            </Link>.
          </p>
          <p>
            Si lo que buscas es fijar tu propia cuota como freelance, la guía sobre{' '}
            <Link href="/cuanto-cobrar-mantenimiento-wordpress-mensual">
              cuánto cobrar mantenimiento WordPress mensual
            </Link>{' '}
            baja el servicio a horas, soporte, incidencias, costes y margen.
          </p>
        </div>
      </section>

      <section className="section alt">
        <div className="container feature-grid" aria-label="Cómo usar la calculadora para WordPress">
          <article className="feature-card">
            <h2>Referencia base por hora</h2>
            <p>
              Te ayuda a no improvisar. Si tu cuota queda muy por debajo de esa base, es fácil que
              el servicio deje poco margen en cuanto aparezcan incidencias.
            </p>
          </article>

          <article className="feature-card">
            <h2>Cuota mínima defendible</h2>
            <p>
              Marca el suelo antes de negociar. Si el cliente quiere bajar más, probablemente toque
              reducir horas, soporte o tiempos de respuesta.
            </p>
          </article>

          <article className="feature-card">
            <h2>Cuota recomendada</h2>
            <p>
              Es la zona donde puedes vender un plan WordPress más sano, con margen para incidencias
              normales y mejor capacidad de sostener el servicio.
            </p>
          </article>
        </div>
      </section>

      <section className="section">
        <div className="container text-block">
          <h2>Lleva la teoría a una cuota WordPress concreta</h2>
          <p>
            Esta guía te da el marco. La calculadora te ayuda a probar tu caso con objetivo mensual,
            costes fijos, horas incluidas, buffer, costes por cliente, margen e IVA para obtener
            una cuota mucho más útil que una cifra improvisada.
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
            description="Accede al recurso gratuito para vender mejor soporte y mantenimiento WordPress, con lista de comprobación, alcance y estructura de cuota."
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
            Si ya tienes claro que WordPress no se debería mantener por intuición, el siguiente paso
            útil es probar tu caso real en la calculadora y separar tu mínimo de tu zona recomendada.
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
