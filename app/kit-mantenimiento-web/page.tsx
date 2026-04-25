import type { Metadata } from 'next';
import Link from 'next/link';
import Script from 'next/script';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import { getSiteUrl, siteConfig } from '@/lib/site';

const route = '/kit-mantenimiento-web';
const title = 'Kit de mantenimiento web';
const description =
  'Recurso practico con checklist mensual, ejemplo de alcance y estructura de cuota para vender mejor mantenimiento web recurrente.';

const faqItems = [
  {
    question: 'Que incluye este kit de mantenimiento web?',
    answer:
      'Incluye una checklist mensual de revisiones, una estructura base de alcance para presentar el servicio y una guia breve para ordenar una cuota mensual defendible.',
  },
  {
    question: 'Este kit sustituye la calculadora?',
    answer:
      'No. El kit te ayuda a presentar mejor el servicio. La calculadora sigue siendo la herramienta para aterrizar una cuota minima y una zona recomendada a partir de tus numeros.',
  },
  {
    question: 'Puedo descargarlo y adaptarlo?',
    answer:
      'Si. Hay una version descargable en texto para que la adaptes a tus propios planes, limites de soporte y forma de trabajar.',
  },
] as const;

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: route,
  },
  keywords: [
    'kit mantenimiento web',
    'checklist mantenimiento web',
    'alcance mantenimiento web',
    'cuota mantenimiento web',
    'recurso mantenimiento wordpress',
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

export default function KitMantenimientoWebPage() {
  const siteUrl = getSiteUrl();
  const pageUrl = new URL(route, siteUrl).toString();
  const downloadUrl = new URL('/recursos/kit-mantenimiento-web.txt', siteUrl).toString();

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
    mainEntity: faqItems.map((item) => ({
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
        id="kit-mantenimiento-article-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <Script
        id="kit-mantenimiento-breadcrumb-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <Script
        id="kit-mantenimiento-faq-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <Header />

      <section className="hero">
        <div className="container article-layout">
          <div className="text-block">
            <span className="eyebrow">Recurso gratuito</span>
            <h1>Kit de mantenimiento web</h1>
            <p className="lead">
              Un recurso simple para pasar de una cuota intuitiva a un plan de mantenimiento mejor
              explicado. Incluye checklist mensual, ejemplo de alcance y una estructura basica para
              presentar una cuota recurrente con mas criterio.
            </p>
            <div className="hero-badges" aria-label="Que incluye el kit">
              <span className="hero-badge">Checklist mensual</span>
              <span className="hero-badge">Ejemplo de alcance</span>
              <span className="hero-badge">Cuota defendible</span>
            </div>
            <div className="guide-cta">
              <a href={downloadUrl} className="primary-button" download>
                Descargar version en texto
              </a>
              <Link href="/#calculadora" className="primary-button">
                Ir a la calculadora
              </Link>
            </div>
          </div>

          <aside className="feature-card article-summary">
            <h2>Que te llevas</h2>
            <ul className="article-list">
              <li>Una checklist mensual para ordenar revisiones y tareas.</li>
              <li>Un ejemplo corto de alcance para presentar el servicio.</li>
              <li>Una estructura de cuota para no vender el mantenimiento a ojo.</li>
              <li>Una version descargable para adaptarla a tus propios planes.</li>
            </ul>
          </aside>
        </div>
      </section>

      <section className="section">
        <div className="container text-block">
          <h2>1. Checklist mensual de mantenimiento</h2>
          <ol className="article-list article-list-ordered">
            <li>Revisar copias y confirmar que la restauracion seria viable.</li>
            <li>Aplicar actualizaciones del core, temas y plugins dentro del alcance pactado.</li>
            <li>Comprobar que formularios, avisos y puntos criticos siguen funcionando.</li>
            <li>Revisar errores visibles, seguridad basica y alertas del sitio.</li>
            <li>Registrar incidencias, tareas pequenas y tiempo consumido.</li>
            <li>Preparar observaciones o recomendaciones para el cliente si hace falta.</li>
          </ol>
        </div>
      </section>

      <section className="section alt">
        <div className="container text-block">
          <h2>2. Estructura corta de alcance</h2>
          <ol className="article-list article-list-ordered">
            <li>Que incluye el plan: actualizaciones, supervision, soporte y pequenas tareas.</li>
            <li>Limites: horas incluidas, revisiones o tareas fuera de cuota.</li>
            <li>Tiempo de respuesta orientativo.</li>
            <li>Que no entra: redisenos, nuevas paginas, cambios grandes o terceros complejos.</li>
            <li>Como se gestionan extras, urgencias y compras de herramientas.</li>
          </ol>
          <p>
            La clave no es escribir un contrato enorme. Es que el cliente entienda donde empieza el
            mantenimiento, donde termina y cuando tocaria presupuestar algo aparte.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container text-block">
          <h2>3. Estructura basica de cuota mensual</h2>
          <ol className="article-list article-list-ordered">
            <li>Referencia interna por hora segun tu objetivo mensual y tus costes.</li>
            <li>Horas incluidas realistas para el plan.</li>
            <li>Buffer para incidencias normales y friccion de soporte.</li>
            <li>Costes mensuales por cliente: herramientas, licencias o terceros.</li>
            <li>Margen para proteger el servicio y no venderlo al limite.</li>
            <li>IVA aparte y forma de pago claras.</li>
          </ol>
          <div className="disclaimer-box">
            <strong>Recuerda:</strong> este kit te ayuda a presentar mejor el servicio, pero la
            calculadora sigue siendo la mejor pieza para aterrizar una cuota minima y una zona
            recomendada antes de ofrecer nada.
          </div>
        </div>
      </section>

      <section className="section alt">
        <div className="container feature-grid" aria-label="Recursos relacionados">
          <article className="feature-card">
            <h2>Mantenimiento mensual</h2>
            <p>
              Si quieres el marco general antes de poner numeros, revisa{' '}
              <Link href="/cuanto-cobrar-mantenimiento-web-mensual">
                cuanto cobrar mantenimiento web mensual
              </Link>
              .
            </p>
          </article>

          <article className="feature-card">
            <h2>WordPress</h2>
            <p>
              Si la mayor parte de tu soporte es WordPress, complementa este kit con la guia sobre{' '}
              <Link href="/precio-mantenimiento-wordpress">precio de mantenimiento WordPress</Link>.
            </p>
          </article>

          <article className="feature-card">
            <h2>Numero base</h2>
            <p>
              Si aun no tienes clara la cuota, vuelve antes a la calculadora y separa tu minimo de
              tu zona recomendada.
            </p>
          </article>
        </div>
      </section>

      <section className="section" aria-labelledby="kit-mantenimiento-faq-title">
        <div className="container text-block">
          <h2 id="kit-mantenimiento-faq-title">Preguntas frecuentes sobre el kit</h2>

          <div className="faq-list">
            {faqItems.map((item) => (
              <article className="faq-item" key={item.question}>
                <h3>{item.question}</h3>
                <p>{item.answer}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section alt">
        <div className="container text-block">
          <span className="eyebrow">Siguiente paso</span>
          <h2>Descarga el kit o vuelve a calcular tu cuota</h2>
          <p>
            Si ya tienes clientes en mantenimiento, puedes descargar la version en texto y adaptarla
            a tus planes. Si sigues afinando la cifra, vuelve antes a la calculadora.
          </p>
          <div className="guide-cta">
            <a href={downloadUrl} className="primary-button" download>
              Descargar el kit
            </a>
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
