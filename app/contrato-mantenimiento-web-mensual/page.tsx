import type { Metadata } from 'next';
import Link from 'next/link';
import Script from 'next/script';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import LeadMagnetForm from '@/components/LeadMagnetForm';
import { getSiteUrl, siteConfig } from '@/lib/site';

const route = '/contrato-mantenimiento-web-mensual';
const title = 'Contrato de mantenimiento web mensual: que dejar claro antes de cobrar';
const description =
  'Guia practica para preparar un contrato o acuerdo de mantenimiento web mensual con alcance, horas incluidas, soporte, extras, urgencias, precio e IVA aparte.';

const pageFaqItems = [
  {
    question: 'Hace falta un contrato para mantenimiento web mensual?',
    answer:
      'Conviene tener al menos un acuerdo por escrito. Puede ser contrato, propuesta aceptada o documento de condiciones, pero debe dejar claro alcance, precio, horas, tiempos de respuesta, extras y forma de cancelacion.',
  },
  {
    question: 'Que debe incluir un contrato de mantenimiento web?',
    answer:
      'Debe incluir tareas incluidas, tareas excluidas, horas o limites del plan, canal de soporte, tiempos de respuesta, precio, IVA, facturacion, duracion, renovacion, cancelacion y tratamiento de urgencias.',
  },
  {
    question: 'Puede una cuota mensual incluir soporte ilimitado?',
    answer:
      'No es recomendable. El soporte ilimitado suele destruir margen. Es mejor definir horas, tipos de tarea, limites y precio de extras antes de iniciar el servicio.',
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
            <h1>Contrato de mantenimiento web mensual: que dejar claro antes de cobrar</h1>
            <p className="lead">
              Una cuota mensual sin condiciones claras puede convertirse en soporte ilimitado. Antes
              de vender mantenimiento web, conviene dejar por escrito que entra, que queda fuera,
              como se tratan urgencias, cuantas horas incluye el plan y que ocurre con los extras.
            </p>
            <div className="hero-badges" aria-label="Que cubre esta guia">
              <span className="hero-badge">Alcance escrito</span>
              <span className="hero-badge">Extras aparte</span>
              <span className="hero-badge">Cancelacion clara</span>
            </div>
            <div className="guide-cta">
              <Link href="/#calculadora" className="primary-button">
                Calcular una cuota
              </Link>
              <Link href="/que-incluye-mantenimiento-web" className="primary-button">
                Ver que incluir
              </Link>
            </div>
          </div>

          <aside className="feature-card article-summary">
            <h2>Resumen rapido</h2>
            <ul className="article-list">
              <li>Define tareas incluidas, tareas excluidas y horas del plan.</li>
              <li>Separa soporte normal, urgencias y trabajos fuera de alcance.</li>
              <li>Indica precio, IVA, facturacion, renovacion y cancelacion.</li>
              <li>Evita prometer disponibilidad o soporte ilimitado sin limites.</li>
            </ul>
          </aside>
        </div>
      </section>

      <section className="section">
        <div className="container text-block">
          <h2>No necesitas complicarlo, pero si dejarlo por escrito</h2>
          <p>
            En muchos casos no hace falta empezar con un contrato largo. Puede bastar una propuesta
            aceptada con condiciones claras, siempre que el cliente entienda que la cuota no compra
            cualquier tarea futura. Lo peligroso es vender mantenimiento como una frase generica y
            discutir los limites cuando ya aparece la primera urgencia.
          </p>
          <p>
            Esta guia no sustituye una revision legal. Te da una estructura practica para preparar
            el acuerdo antes de pasar por una asesoria o adaptarlo a tu forma de trabajar.
          </p>
          <div className="disclaimer-box">
            <strong>Idea clave:</strong> cuanto mas recurrente es el servicio, mas importante es que
            alcance, extras y cancelacion esten claros desde el principio.
          </div>
        </div>
      </section>

      <section className="section alt">
        <div className="container feature-grid" aria-label="Bloques del acuerdo">
          <article className="feature-card">
            <h2>Alcance incluido</h2>
            <p>
              Explica que tareas entran: actualizaciones, copias, supervision, pequenas tareas,
              soporte pactado o revision mensual. Usa ejemplos concretos, no promesas genericas.
            </p>
          </article>

          <article className="feature-card">
            <h2>Limites y exclusiones</h2>
            <p>
              Deja fuera redisenos, nuevas paginas, SEO profundo, integraciones, urgencias fuera de
              horario o recuperaciones especiales si no estan presupuestadas.
            </p>
          </article>

          <article className="feature-card">
            <h2>Precio y condiciones</h2>
            <p>
              Indica cuota mensual, IVA, forma de pago, fecha de facturacion, permanencia si existe
              y como se cancela o revisa el servicio.
            </p>
          </article>
        </div>
      </section>

      <section className="section">
        <div className="container article-layout">
          <div className="text-block">
            <h2>Checklist de puntos que conviene incluir</h2>
            <ol className="article-list article-list-ordered">
              <li>Nombre del cliente, dominio o proyecto cubierto por el mantenimiento.</li>
              <li>Plan contratado y cuota mensual sin IVA e IVA aparte si aplica.</li>
              <li>Horas incluidas, si son acumulables y como se consumen.</li>
              <li>Tareas incluidas con ejemplos faciles de entender.</li>
              <li>Tareas excluidas y precio de trabajos extra.</li>
              <li>Canal de soporte, tiempos de respuesta y horario de atencion.</li>
              <li>Condiciones para urgencias, incidencias graves o problemas externos.</li>
              <li>Duracion, renovacion, cancelacion y revision de precios.</li>
            </ol>
            <p>
              Si todavia no sabes que poner dentro de cada plan, empieza por la guia sobre{' '}
              <Link href="/que-incluye-mantenimiento-web">
                que incluye un mantenimiento web mensual
              </Link>{' '}
              y despues ordenalo en paquetes.
            </p>
          </div>

          <aside className="feature-card article-summary">
            <h2>Frases peligrosas</h2>
            <ul className="article-list">
              <li>Incluye todo lo que necesites.</li>
              <li>Soporte ilimitado.</li>
              <li>Urgencias incluidas.</li>
              <li>Cambios pequenos sin limite.</li>
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
              mensuales de soporte para pequenas modificaciones. Las horas no consumidas no se
              acumulan. Cualquier nueva funcionalidad, redisenos, integraciones, urgencias fuera de
              horario o tareas no incluidas se presupuestaran aparte antes de realizarse.
            </p>
          </div>
          <p>
            Este tipo de texto no lo resuelve todo, pero reduce mucho la ambiguedad. Lo importante
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
          <h2>Como conectar contrato y precio</h2>
          <p>
            El contrato protege el alcance, pero el precio debe salir de numeros. Antes de enviar el
            acuerdo, calcula horas incluidas, buffer de incidencias, costes mensuales por cliente,
            margen e IVA. Asi evitas firmar una cuota que parece atractiva pero no sostiene el
            servicio.
          </p>
          <p>
            Puedes usar la calculadora para obtener una cuota minima y una cuota recomendada, y
            despues convertir ese resultado en condiciones claras dentro de la propuesta.
          </p>
          <div className="guide-cta">
            <Link href="/#calculadora" className="primary-button">
              Calcular mi cuota
            </Link>
            <Link href="/cuanto-cobrar-mantenimiento-web-mensual" className="primary-button">
              Leer guia de precio
            </Link>
          </div>
        </div>
      </section>

      <section className="section alt">
        <div className="container">
          <LeadMagnetForm
            source="contrato-mantenimiento-web-mensual"
            title="Llevate el kit para ordenar tu acuerdo de mantenimiento"
            description="Recibe el checklist para separar alcance, horas, extras, urgencias y cuota mensual antes de presentar un servicio recurrente."
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
