import type { Metadata } from 'next';
import Link from 'next/link';
import Script from 'next/script';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import LeadMagnetForm from '@/components/LeadMagnetForm';
import { getSiteUrl, siteConfig } from '@/lib/site';

const route = '/paquetes-mantenimiento-web';
const title = 'Paquetes de mantenimiento web: como crear planes mensuales rentables';
const description =
  'Guia para estructurar paquetes de mantenimiento web mensual con alcance claro, horas incluidas, soporte, extras, limites e IVA aparte.';

const pageFaqItems = [
  {
    question: 'Cuantos paquetes de mantenimiento web conviene ofrecer?',
    answer:
      'Normalmente funcionan bien tres paquetes: basico, profesional y avanzado. Asi el cliente puede comparar alcance sin convertir cada propuesta en una negociacion desde cero.',
  },
  {
    question: 'Que debe incluir un paquete basico?',
    answer:
      'Un paquete basico deberia incluir tareas recurrentes concretas, supervision minima, copias, actualizaciones y un limite claro de soporte. Lo importante es que no se convierta en soporte ilimitado barato.',
  },
  {
    question: 'Como evitar que el cliente pida tareas fuera del plan?',
    answer:
      'Debes definir por escrito que entra, que no entra, cuantas horas incluye el plan, como se valoran las tareas extra y que ocurre con urgencias o cambios de alcance.',
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
            <h1>Paquetes de mantenimiento web: como crear planes que no se coman tu margen</h1>
            <p className="lead">
              Vender mantenimiento web como una cuota recurrente puede ser una gran fuente de
              estabilidad, pero solo si el paquete tiene limites claros. Si prometes soporte amplio
              por una cuota baja, el retainer deja de ser ingreso recurrente y se convierte en
              deuda de tiempo.
            </p>
            <div className="hero-badges" aria-label="Que cubre esta guia">
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
              <li>Un plan basico para webs simples y soporte limitado.</li>
              <li>Un plan profesional para clientes que necesitan seguimiento real.</li>
              <li>Un plan avanzado para webs con mas riesgo, urgencia o dependencia comercial.</li>
              <li>Extras siempre definidos fuera de la cuota mensual.</li>
            </ul>
          </aside>
        </div>
      </section>

      <section className="section">
        <div className="container feature-grid" aria-label="Tipos de paquete">
          <article className="feature-card">
            <h2>Plan basico</h2>
            <p>
              Para webs con poco movimiento. Puede cubrir actualizaciones, copias, revision ligera y
              una pequena franja de soporte. Debe tener pocas horas incluidas y limites visibles.
            </p>
          </article>

          <article className="feature-card">
            <h2>Plan profesional</h2>
            <p>
              Para clientes que necesitan continuidad. Incluye mas seguimiento, pequenas tareas,
              control de incidencias y un margen de soporte mensual que puedas sostener.
            </p>
          </article>

          <article className="feature-card">
            <h2>Plan avanzado</h2>
            <p>
              Para webs que venden, captan leads o dependen de integraciones. Debe contemplar
              prioridad, mas control tecnico, reporting o condiciones de respuesta mas exigentes.
            </p>
          </article>
        </div>
      </section>

      <section className="section alt">
        <div className="container article-layout">
          <div className="text-block">
            <h2>Que debe quedar por escrito en cada paquete</h2>
            <p>
              El objetivo de un paquete no es sonar completo, sino evitar ambiguedad. Cada plan debe
              decir que tareas incluye, cuantas horas cubre, como se tratan incidencias, que no esta
              incluido y que pasa si el cliente pide cambios fuera del alcance.
            </p>
            <ol className="article-list article-list-ordered">
              <li>Horas incluidas y si son acumulables o no.</li>
              <li>Canal de soporte y tiempo de respuesta orientativo.</li>
              <li>Actualizaciones, copias, seguridad y supervision incluidas.</li>
              <li>Pequenas tareas permitidas y ejemplos de tareas excluidas.</li>
              <li>Precio de horas extra, urgencias o trabajos puntuales.</li>
            </ol>
            <div className="disclaimer-box">
              <strong>Regla practica:</strong> si una tarea puede consumir varias horas o cambiar el
              alcance de la web, no deberia ir escondida dentro de una cuota mensual barata.
            </div>
          </div>

          <aside className="feature-card article-summary">
            <h2>Extras que conviene separar</h2>
            <ul className="article-list">
              <li>Nuevas paginas o redisenos.</li>
              <li>Copywriting, SEO profundo o estrategia.</li>
              <li>Integraciones nuevas con CRM, pagos o automatizaciones.</li>
              <li>Recuperacion de hackeos o incidencias graves previas.</li>
              <li>Urgencias fuera de horario o con SLA especial.</li>
            </ul>
          </aside>
        </div>
      </section>

      <section className="section">
        <div className="container text-block">
          <h2>Como usar la calculadora para fijar cada plan</h2>
          <p>
            Puedes usar la calculadora una vez por cada paquete. En el plan basico introduce pocas
            horas y poco buffer. En el profesional aumenta horas, incidencias y costes directos. En
            el avanzado suma mas margen porque hay mas responsabilidad y mas interrupciones.
          </p>
          <p>
            Despues redondea los resultados para que sean faciles de presentar, pero no bajes de tu
            cuota minima defendible. Si quieres vender tres planes, el intermedio deberia ser el que
            quieres que el cliente elija con mas frecuencia.
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
            title="Llevate el kit para estructurar tu mantenimiento"
            description="Recibe el checklist y la estructura base para definir alcance, horas incluidas, limites y extras antes de presentar una cuota mensual."
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
