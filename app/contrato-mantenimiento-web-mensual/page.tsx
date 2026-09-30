import type { Metadata } from 'next';
import Link from 'next/link';
import Script from 'next/script';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import LeadMagnetForm from '@/components/LeadMagnetForm';
import { getSiteUrl, siteConfig } from '@/lib/site';

const route = '/contrato-mantenimiento-web-mensual';
const title = 'Contrato de mantenimiento web mensual: qué dejar claro antes de cobrar';
const description =
  'Guía práctica para preparar un contrato o acuerdo de mantenimiento web mensual con alcance, horas incluidas, soporte, extras, urgencias, precio e IVA aparte.';

const pageFaqItems = [
  {
    question: '¿Hace falta un contrato para mantenimiento web mensual?',
    answer:
      'Conviene tener al menos un acuerdo por escrito. Puede ser contrato, propuesta aceptada o documento de condiciones, pero debe dejar claro alcance, precio, horas, tiempos de respuesta, extras y forma de cancelación.',
  },
  {
    question: '¿Qué debe incluir un contrato de mantenimiento web?',
    answer:
      'Debe incluir tareas incluidas, tareas excluidas, horas o límites del plan, canal de soporte, tiempos de respuesta, precio, IVA, facturación, duración, renovación, cancelación y tratamiento de urgencias.',
  },
  {
    question: '¿Puede una cuota mensual incluir soporte ilimitado?',
    answer:
      'No es recomendable. El soporte ilimitado suele destruir margen. Es mejor definir horas, tipos de tarea, límites y precio de extras antes de iniciar el servicio.',
  },
] as const;

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: route,
  },
  keywords: [
    'contrato mantenimiento web',
    'contrato mantenimiento web mensual',
    'acuerdo mantenimiento web',
    'plantilla contrato mantenimiento web',
    'condiciones mantenimiento web freelance',
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

export default function ContratoMantenimientoWebMensualPage() {
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
        id="contrato-mantenimiento-article-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <Script
        id="contrato-mantenimiento-breadcrumb-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <Script
        id="contrato-mantenimiento-faq-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <Header />

      <section className="hero">
        <div className="container article-layout">
          <div className="text-block">
            <span className="eyebrow">Condiciones del servicio</span>
            <h1>Contrato de mantenimiento web mensual: qué dejar claro antes de cobrar</h1>
            <p className="lead">
              Una cuota mensual sin condiciones claras puede convertirse en soporte ilimitado. Antes
              de vender mantenimiento web, conviene dejar por escrito qué entra, qué queda fuera,
              cómo se tratan urgencias, cuántas horas incluye el plan y qué ocurre con los extras.
            </p>
            <div className="hero-badges" aria-label="Qué cubre esta guía">
              <span className="hero-badge">Alcance escrito</span>
              <span className="hero-badge">Extras aparte</span>
              <span className="hero-badge">Cancelación clara</span>
            </div>
            <div className="guide-cta">
              <Link href="/#calculadora" className="primary-button">
                Calcular una cuota
              </Link>
              <Link href="/que-incluye-mantenimiento-web" className="primary-button">
                Ver qué incluir
              </Link>
            </div>
          </div>

          <aside className="feature-card article-summary">
            <h2>Resumen rápido</h2>
            <ul className="article-list">
              <li>Define tareas incluidas, tareas excluidas y horas del plan.</li>
              <li>Separa soporte normal, urgencias y trabajos fuera de alcance.</li>
              <li>Indica precio, IVA, facturación, renovación y cancelación.</li>
              <li>Evita prometer disponibilidad o soporte ilimitado sin límites.</li>
            </ul>
          </aside>
        </div>
      </section>

      <section className="section">
        <div className="container text-block">
          <h2>No necesitas complicarlo, pero sí dejarlo por escrito</h2>
          <p>
            En muchos casos no hace falta empezar con un contrato largo. Puede bastar una propuesta
            aceptada con condiciones claras, siempre que el cliente entienda que la cuota no compra
            cualquier tarea futura. Lo peligroso es vender mantenimiento como una frase genérica y
            discutir los límites cuando ya aparece la primera urgencia.
          </p>
          <p>
            Esta guía no sustituye una revisión legal. Te da una estructura práctica para preparar
            el acuerdo antes de pasar por una asesoría o adaptarlo a tu forma de trabajar.
          </p>
          <div className="disclaimer-box">
            <strong>Idea clave:</strong> cuanto más recurrente es el servicio, más importante es que
            alcance, extras y cancelación estén claros desde el principio.
          </div>
        </div>
      </section>

      <section className="section alt">
        <div className="container feature-grid" aria-label="Bloques del acuerdo">
          <article className="feature-card">
            <h2>Alcance incluido</h2>
            <p>
              Explica qué tareas entran: actualizaciones, copias, supervisión, pequeñas tareas,
              soporte pactado o revisión mensual. Usa ejemplos concretos, no promesas genéricas.
            </p>
          </article>

          <article className="feature-card">
            <h2>Límites y exclusiones</h2>
            <p>
              Deja fuera rediseños, nuevas páginas, SEO profundo, integraciones, urgencias fuera de
              horario o recuperaciones especiales si no están presupuestadas.
            </p>
          </article>

          <article className="feature-card">
            <h2>Precio y condiciones</h2>
            <p>
              Indica cuota mensual, IVA, forma de pago, fecha de facturación, permanencia si existe
              y como se cancela o revisa el servicio.
            </p>
          </article>
        </div>
      </section>

      <section className="section">
        <div className="container article-layout">
          <div className="text-block">
            <h2>Lista de comprobación: puntos que conviene incluir</h2>
            <ol className="article-list article-list-ordered">
              <li>Nombre del cliente, dominio o proyecto cubierto por el mantenimiento.</li>
              <li>Plan contratado y cuota mensual sin IVA e IVA aparte si aplica.</li>
              <li>Horas incluidas, si son acumulables y como se consumen.</li>
              <li>Tareas incluidas con ejemplos fáciles de entender.</li>
              <li>Tareas excluidas y precio de trabajos extra.</li>
              <li>Canal de soporte, tiempos de respuesta y horario de atención.</li>
              <li>Condiciones para urgencias, incidencias graves o problemas externos.</li>
              <li>Duración, renovación, cancelación y revisión de precios.</li>
            </ol>
            <p>
              Si todavía no sabes que poner dentro de cada plan, empieza por la guía sobre{' '}
              <Link href="/que-incluye-mantenimiento-web">
                qué incluye un mantenimiento web mensual
              </Link>{' '}
              y después ordenalo en paquetes.
            </p>
          </div>

          <aside className="feature-card article-summary">
            <h2>Frases peligrosas</h2>
            <ul className="article-list">
              <li>Incluye todo lo que necesites.</li>
              <li>Soporte ilimitado.</li>
              <li>Urgencias incluidas.</li>
              <li>Cambios pequeños sin límite.</li>
              <li>Ya lo vamos viendo sobre la marcha.</li>
            </ul>
          </aside>
        </div>
      </section>

      <section className="section alt">
        <div className="container text-block">
          <h2>Ejemplo de bloque de condiciones</h2>
          <div className="disclaimer-box">
            <p>
              La cuota mensual incluye las tareas descritas en el plan contratado y hasta 2 horas
              mensuales de soporte para pequeñas modificaciones. Las horas no consumidas no se
              acumulan. Cualquier nueva funcionalidad, rediseño, integración, urgencia fuera de
              horario o tarea no incluida se presupuestará aparte antes de realizarse.
            </p>
          </div>
          <p>
            Este tipo de texto no lo resuelve todo, pero reduce mucho la ambigüedad. Lo importante
            es que el cliente sepa que la cuota tiene un alcance, no una puerta abierta a cualquier
            cambio futuro.
          </p>
          <div className="guide-cta">
            <Link href="/paquetes-mantenimiento-web" className="primary-button">
              Ver paquetes de mantenimiento
            </Link>
            <Link href="/mantenimiento-web-vs-bolsa-horas" className="primary-button">
              Comparar con bolsa de horas
            </Link>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container text-block">
          <h2>Cómo conectar contrato y precio</h2>
          <p>
            El contrato protege el alcance, pero el precio debe salir de números. Antes de enviar el
            acuerdo, calcula horas incluidas, buffer de incidencias, costes mensuales por cliente,
            margen e IVA. Así evitas firmar una cuota que parece atractiva pero no sostiene el
            servicio.
          </p>
          <p>
            Puedes usar la calculadora para obtener una cuota mínima y una cuota recomendada, y
            después convertir ese resultado en condiciones claras dentro de la propuesta.
          </p>
          <div className="guide-cta">
            <Link href="/#calculadora" className="primary-button">
              Calcular mi cuota
            </Link>
            <Link href="/cuanto-cobrar-mantenimiento-web-mensual" className="primary-button">
              Leer guía de precio
            </Link>
          </div>
        </div>
      </section>

      <section className="section alt">
        <div className="container">
          <LeadMagnetForm
            source="contrato-mantenimiento-web-mensual"
            title="Llévate el kit para ordenar tu acuerdo de mantenimiento"
            description="Recibe la lista de comprobación para separar alcance, horas, extras, urgencias y cuota mensual antes de presentar un servicio recurrente."
            buttonLabel="Quiero el kit"
          />
        </div>
      </section>

      <section className="section" id="faq-contrato-mantenimiento">
        <div className="container text-block">
          <span className="eyebrow">Preguntas frecuentes</span>
          <h2>Dudas habituales sobre contratos de mantenimiento web mensual</h2>
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
