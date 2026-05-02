import type { Metadata } from 'next';
import Link from 'next/link';
import Script from 'next/script';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import LeadMagnetForm from '@/components/LeadMagnetForm';
import { getSiteUrl, siteConfig } from '@/lib/site';

const route = '/cuanto-cobrar-mantenimiento-wordpress-mensual';
const title = 'Cuanto cobrar mantenimiento WordPress mensual como freelance';
const description =
  'Guia practica para calcular cuanto cobrar por mantenimiento WordPress mensual con horas incluidas, soporte, incidencias, herramientas, margen e IVA aparte.';

const pageFaqItems = [
  {
    question: 'Cuanto cobrar por mantenimiento WordPress mensual?',
    answer:
      'Depende de las horas incluidas, el tipo de web, la frecuencia de soporte, las incidencias esperables, las herramientas usadas y el margen que necesitas conservar. La cuota no deberia salir solo de una tarifa de mercado.',
  },
  {
    question: 'Que deberia incluir una cuota WordPress mensual?',
    answer:
      'Puede incluir actualizaciones, copias, supervision, soporte limitado, pequenas tareas y revision tecnica, pero cada elemento necesita limites claros para no convertirse en soporte ilimitado.',
  },
  {
    question: 'Como subo el precio si el cliente pide mas soporte?',
    answer:
      'No subas solo por sensacion. Aumenta horas incluidas, prioridad, revisiones o alcance y refleja ese cambio en una cuota superior, dejando fuera extras y urgencias no pactadas.',
  },
] as const;

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: route,
  },
  keywords: [
    'cuanto cobrar mantenimiento wordpress mensual',
    'mantenimiento wordpress mensual freelance',
    'cuota mantenimiento wordpress',
    'precio soporte wordpress mensual',
    'cuanto cobrar soporte wordpress',
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
            <h1>Cuanto cobrar mantenimiento WordPress mensual como freelance</h1>
            <p className="lead">
              Cobrar mantenimiento WordPress no es poner una cuota bonita y esperar que el mes sea
              tranquilo. Para que sea rentable necesitas convertir soporte, actualizaciones,
              incidencias, herramientas y margen en una mensualidad que puedas defender.
            </p>
            <div className="hero-badges" aria-label="Que cubre esta guia">
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
              <li>Define que tareas WordPress entran cada mes.</li>
              <li>Calcula horas incluidas y friccion de soporte.</li>
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
            Muchos mantenimientos WordPress empiezan como una tarea tecnica pequena: actualizar,
            revisar copias y comprobar que todo sigue funcionando. El problema aparece cuando el
            cliente tambien espera consultas, pequenos cambios, urgencias suaves, seguimiento y
            disponibilidad mental todos los meses.
          </p>
          <p>
            Si esa friccion no esta incluida en el calculo, la cuota puede parecer rentable al
            venderla y quedarse corta al tercer mes. Por eso conviene separar tarea visible,
            soporte real y margen antes de hablar de precio.
          </p>
          <div className="disclaimer-box">
            <strong>Idea clave:</strong> no cobras solo por actualizar WordPress. Cobras por sostener
            una web viva con limites, responsabilidad y tiempo recurrente.
          </div>
        </div>
      </section>

      <section className="section alt">
        <div className="container feature-grid" aria-label="Variables de una cuota WordPress">
          <article className="feature-card">
            <h2>1. Base tecnica</h2>
            <p>
              Actualizaciones, copias, monitorizacion, seguridad y revisiones forman el suelo del
              servicio. Si el sitio tiene muchos plugins o integraciones, el riesgo sube.
            </p>
          </article>

          <article className="feature-card">
            <h2>2. Soporte y cambios</h2>
            <p>
              Define si entran cambios de textos, maquetacion, formularios, dudas del cliente o
              pequenas incidencias. Lo que no se limite acaba consumiendo margen.
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
            <h2>Formula practica para calcular tu cuota mensual</h2>
            <ol className="article-list article-list-ordered">
              <li>Parte de tu referencia por hora o de tu objetivo mensual.</li>
              <li>Define cuantas horas incluye el plan WordPress.</li>
              <li>Anade un buffer de incidencias y soporte recurrente.</li>
              <li>Suma costes directos por cliente: herramientas, licencias o servicios.</li>
              <li>Aplica margen extra para que la cuota no sea solo coste de produccion.</li>
              <li>Presenta el IVA aparte y deja extras fuera de alcance por escrito.</li>
            </ol>
            <p>
              Si necesitas decidir primero que tareas entran, revisa la guia sobre{' '}
              <Link href="/que-incluye-mantenimiento-web">
                que incluye un mantenimiento web mensual
              </Link>
              . Si ya tienes planes, contrasta tambien el enfoque de{' '}
              <Link href="/mantenimiento-wordpress-basico-profesional-avanzado">
                mantenimiento WordPress basico, profesional y avanzado
              </Link>
              .
            </p>
          </div>

          <aside className="feature-card article-summary">
            <h2>No lo metas gratis</h2>
            <ul className="article-list">
              <li>Cambios grandes de plantilla.</li>
              <li>Nuevas paginas o funcionalidades.</li>
              <li>SEO, copy o estrategia de contenidos.</li>
              <li>Urgencias fuera de horario.</li>
              <li>Horas acumulables sin limite.</li>
            </ul>
          </aside>
        </div>
      </section>

      <section className="section alt">
        <div className="container text-block">
          <h2>Como defender el precio delante del cliente</h2>
          <p>
            El argumento no deberia ser solo &quot;esto cuesta X&quot;. Es mas facil defender la
            cuota cuando explicas que incluye supervision, actualizaciones, soporte limitado, una
            bolsa de tiempo mensual, respuesta ante incidencias normales y continuidad tecnica.
          </p>
          <p>
            Tambien ayuda separar tres niveles: un plan minimo muy acotado, un plan recomendado con
            margen sano y un plan superior para clientes que necesitan prioridad o mas soporte.
          </p>
          <div className="guide-cta">
            <Link href="/#calculadora" className="primary-button">
              Probar mi cuota
            </Link>
            <Link href="/precio-mantenimiento-wordpress" className="primary-button">
              Ver guia de precio WordPress
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
            tu cuota WordPress es una entrada razonable o si estas vendiendo soporte demasiado
            barato.
          </p>
          <p>
            Si el numero final se aleja mucho de lo que el cliente quiere pagar, no bajes la cuota
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
            Preguntas frecuentes sobre cuanto cobrar mantenimiento WordPress
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
            Si ya tienes una cuota WordPress en mente, no la envies todavia. Pasala por la
            calculadora, revisa margen, ajusta limites y prepara una propuesta que explique que
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
