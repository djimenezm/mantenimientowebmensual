import type { Metadata } from 'next';
import Link from 'next/link';
import Script from 'next/script';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import LeadMagnetForm from '@/components/LeadMagnetForm';
import { getSiteUrl, siteConfig } from '@/lib/site';

const route = '/cuanto-cobrar-mantenimiento-wordpress-mensual';
const title = 'Cuánto cobrar mantenimiento WordPress mensual como freelance';
const description =
  'Guía práctica para calcular cuánto cobrar por mantenimiento WordPress mensual con horas incluidas, soporte, incidencias, herramientas, margen e IVA aparte.';

const pageFaqItems = [
  {
    question: '¿Cuánto cobrar por mantenimiento WordPress mensual?',
    answer:
      'Depende de las horas incluidas, el tipo de web, la frecuencia de soporte, las incidencias esperables, las herramientas usadas y el margen qué necesitas conservar. La cuota no debería salir solo de una tarifa de mercado.',
  },
  {
    question: '¿Qué debería incluir una cuota WordPress mensual?',
    answer:
      'Puede incluir actualizaciones, copias, supervisión, soporte limitado, pequeñas tareas y revisión técnica, pero cada elemento necesita límites claros para no convertirse en soporte ilimitado.',
  },
  {
    question: '¿Cómo subo el precio si el cliente pide más soporte?',
    answer:
      'No subas solo por sensación. Aumenta horas incluidas, prioridad, revisiones o alcance y refleja ese cambio en una cuota superior, dejando fuera extras y urgencias no pactadas.',
  },
] as const;

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: route,
  },
  keywords: [
    'cuánto cobrar mantenimiento wordpress mensual',
    'mantenimiento wordpress mensual freelance',
    'cuota mantenimiento wordpress',
    'precio soporte wordpress mensual',
    'cuánto cobrar soporte wordpress',
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

export default function CuantoCobrarMantenimientoWordPressMensualPage() {
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
    datePublished: '2026-05-02',
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
        id="cobrar-wordpress-article-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <Script
        id="cobrar-wordpress-breadcrumb-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <Script
        id="cobrar-wordpress-faq-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <Header />

      <section className="hero">
        <div className="container article-layout">
          <div className="text-block">
            <span className="eyebrow">WordPress mensual</span>
            <h1>Cuánto cobrar mantenimiento WordPress mensual como freelance</h1>
            <p className="lead">
              Cobrar mantenimiento WordPress no es poner una cuota bonita y esperar que el mes sea
              tranquilo. Para que sea rentable necesitas convertir soporte, actualizaciones,
              incidencias, herramientas y margen en una mensualidad que puedas defender.
            </p>
            <div className="hero-badges" aria-label="Qué cubre esta guía">
              <span className="hero-badge">Cuota WordPress</span>
              <span className="hero-badge">Soporte incluido</span>
              <span className="hero-badge">Margen mensual</span>
            </div>
            <div className="guide-cta">
              <Link href="/#calculadora" className="primary-button">
                Calcular cuota WordPress
              </Link>
            </div>
          </div>

          <aside className="feature-card article-summary">
            <h2>Antes de poner precio</h2>
            <ul className="article-list">
              <li>Define qué tareas WordPress entran cada mes.</li>
              <li>Calcula horas incluidas y fricción de soporte.</li>
              <li>Suma herramientas, licencias y costes por cliente.</li>
              <li>Protege margen antes de ofrecer descuentos.</li>
            </ul>
          </aside>
        </div>
      </section>

      <section className="section">
        <div className="container text-block">
          <h2>La cuota WordPress se rompe cuando no mide soporte</h2>
          <p>
            Muchos mantenimientos WordPress empiezan como una tarea técnica pequeña: actualizar,
            revisar copias y comprobar que todo sigue funcionando. El problema aparece cuando el
            cliente también espera consultas, pequeños cambios, urgencias suaves, seguimiento y
            disponibilidad mental todos los meses.
          </p>
          <p>
            Si esa fricción no está incluida en el cálculo, la cuota puede parecer rentable al
            venderla y quedarse corta al tercer mes. Por eso conviene separar tarea visible,
            soporte real y margen antes de hablar de precio.
          </p>
          <div className="disclaimer-box">
            <strong>Idea clave:</strong> no cobras solo por actualizar WordPress. Cobras por sostener
            una web viva con límites, responsabilidad y tiempo recurrente.
          </div>
        </div>
      </section>

      <section className="section alt">
        <div className="container feature-grid" aria-label="Variables de una cuota WordPress">
          <article className="feature-card">
            <h2>1. Base técnica</h2>
            <p>
              Actualizaciones, copias, monitorización, seguridad y revisiones forman el suelo del
              servicio. Si el sitio tiene muchos plugins o integraciones, el riesgo sube.
            </p>
          </article>

          <article className="feature-card">
            <h2>2. Soporte y cambios</h2>
            <p>
              Define si entran cambios de textos, maquetación, formularios, dudas del cliente o
              pequeñas incidencias. Lo que no se limite acaba consumiendo margen.
            </p>
          </article>

          <article className="feature-card">
            <h2>3. Coste y margen</h2>
            <p>
              Herramientas, licencias, compras, seguimiento y margen comercial deben estar dentro
              de la cuota. Si no, el precio solo cubre una parte del servicio real.
            </p>
          </article>
        </div>
      </section>

      <section className="section">
        <div className="container article-layout">
          <div className="text-block">
            <h2>Fórmula práctica para calcular tu cuota mensual</h2>
            <ol className="article-list article-list-ordered">
              <li>Parte de tu referencia por hora o de tu objetivo mensual.</li>
              <li>Define cuántas horas incluye el plan WordPress.</li>
              <li>Añade un buffer de incidencias y soporte recurrente.</li>
              <li>Suma costes directos por cliente: herramientas, licencias o servicios.</li>
              <li>Aplica margen extra para que la cuota no sea solo coste de producción.</li>
              <li>Presenta el IVA aparte y deja extras fuera de alcance por escrito.</li>
            </ol>
            <p>
              Si necesitas decidir primero qué tareas entran, revisa la guía sobre{' '}
              <Link href="/que-incluye-mantenimiento-web">
                qué incluye un mantenimiento web mensual
              </Link>. Si ya tienes planes, contrasta también el enfoque de{' '}
              <Link href="/mantenimiento-wordpress-basico-profesional-avanzado">
                mantenimiento WordPress básico, profesional y avanzado
              </Link>.
            </p>
          </div>

          <aside className="feature-card article-summary">
            <h2>No lo metas gratis</h2>
            <ul className="article-list">
              <li>Cambios grandes de plantilla.</li>
              <li>Nuevas páginas o funcionalidades.</li>
              <li>SEO, copy o estrategia de contenidos.</li>
              <li>Urgencias fuera de horario.</li>
              <li>Horas acumulables sin límite.</li>
            </ul>
          </aside>
        </div>
      </section>

      <section className="section alt">
        <div className="container text-block">
          <h2>Cómo defender el precio delante del cliente</h2>
          <p>
            El argumento no debería ser solo &quot;esto cuesta X&quot;. Es más fácil defender la
            cuota cuando explicas qué incluye supervisión, actualizaciones, soporte limitado, una
            bolsa de tiempo mensual, respuesta ante incidencias normales y continuidad técnica.
          </p>
          <p>
            También ayuda separar tres niveles: un plan mínimo muy acotado, un plan recomendado con
            margen sano y un plan superior para clientes que necesitan prioridad o más soporte.
          </p>
          <div className="guide-cta">
            <Link href="/#calculadora" className="primary-button">
              Probar mi cuota
            </Link>
            <Link href="/precio-mantenimiento-wordpress" className="primary-button">
              Ver guía de precio WordPress
            </Link>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container text-block">
          <h2>Usa la calculadora para validar si la cuota respira</h2>
          <p>
            Introduce tu objetivo mensual, costes fijos, horas facturables, horas incluidas por
            cliente, buffer de incidencias, costes directos y margen. El resultado te ayuda a ver si
            tu cuota WordPress es una entrada razonable o si estás vendiendo soporte demasiado
            barato.
          </p>
          <p>
            Si el número final se aleja mucho de lo que el cliente quiere pagar, no bajes la cuota
            sin tocar alcance. Reduce horas, limita soporte, separa urgencias o deja ciertas tareas
            como presupuesto aparte.
          </p>
          <div className="guide-cta">
            <Link href="/#calculadora" className="primary-button">
              Calcular mantenimiento WordPress
            </Link>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <LeadMagnetForm
            source="cuanto-cobrar-mantenimiento-wordpress-mensual"
            title="Te enviamos el kit de mantenimiento WordPress"
            description="Accede al recurso gratuito para ordenar alcance, soporte, horas, extras y cuota mensual antes de vender mantenimiento recurrente."
            buttonLabel="Quiero el kit"
          />
        </div>
      </section>

      <section className="section alt" aria-labelledby="cobrar-wordpress-faq-title">
        <div className="container text-block">
          <h2 id="cobrar-wordpress-faq-title">
            Preguntas frecuentes sobre cuánto cobrar mantenimiento WordPress
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
          <h2>Convierte una cuota intuitiva en un precio defendible</h2>
          <p>
            Si ya tienes una cuota WordPress en mente, no la envíes todavía. Pásala por la
            calculadora, revisa margen, ajusta límites y prepara una propuesta que explique que
            entra y que queda fuera.
          </p>
          <div className="guide-cta">
            <Link href="/#calculadora" className="primary-button">
              Ir a la calculadora
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
