import type { Metadata } from 'next';
import Link from 'next/link';
import Script from 'next/script';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import LeadMagnetForm from '@/components/LeadMagnetForm';
import { getSiteUrl, siteConfig } from '@/lib/site';

const route = '/que-incluye-mantenimiento-web';
const title = 'Qué incluye un mantenimiento web mensual y qué conviene dejar fuera';
const description =
  'Guía para definir qué incluye un mantenimiento web mensual, cómo separar soporte, seguridad, actualizaciones, incidencias, horas extra y tareas fuera de alcance.';

const pageFaqItems = [
  {
    question: '¿Qué incluye normalmente un mantenimiento web mensual?',
    answer:
      'Suele incluir actualizaciones, copias de seguridad, supervisión básica, soporte pactado, pequeñas tareas recurrentes, control de incidencias y revisión del estado general de la web.',
  },
  {
    question: '¿Qué no debería incluir una cuota básica de mantenimiento?',
    answer:
      'No conviene incluir rediseños, nuevas páginas, cambios grandes de estructura, SEO profundo, campañas, integraciones nuevas, urgencias fuera de alcance o recuperación de problemas graves previos.',
  },
  {
    question: '¿Cómo evitar que el mantenimiento se convierta en soporte ilimitado?',
    answer:
      'Define horas incluidas, tiempos de respuesta, canal de soporte, ejemplos de tareas incluidas, tareas excluidas y precio de extras antes de activar el servicio.',
  },
] as const;

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: route,
  },
  keywords: [
    'que incluye mantenimiento web',
    'mantenimiento web mensual que incluye',
    'servicio mantenimiento web mensual',
    'soporte mantenimiento web',
    'alcance mantenimiento web',
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

export default function QueIncluyeMantenimientoWebPage() {
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
        id="que-incluye-mantenimiento-article-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <Script
        id="que-incluye-mantenimiento-breadcrumb-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <Script
        id="que-incluye-mantenimiento-faq-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <Header />

      <section className="hero">
        <div className="container article-layout">
          <div className="text-block">
            <span className="eyebrow">Alcance del servicio</span>
            <h1>Qué incluye un mantenimiento web mensual y qué conviene dejar fuera</h1>
            <p className="lead">
              Una cuota de mantenimiento web no debería venderse como una promesa abierta de
              disponibilidad infinita. Para que sea rentable, el cliente debe entender qué entra,
              qué no entra y cómo se tratan las tareas extra antes de que aparezca la primera
              incidencia.
            </p>
            <div className="hero-badges" aria-label="Qué cubre esta guía">
              <span className="hero-badge">Alcance claro</span>
              <span className="hero-badge">Extras aparte</span>
              <span className="hero-badge">Soporte recurrente</span>
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
            <h2>Resumen rápido</h2>
            <ul className="article-list">
              <li>Incluye tareas recurrentes, soporte pactado y supervisión básica.</li>
              <li>Separa nuevas páginas, rediseños, SEO profundo e integraciones.</li>
              <li>Define horas, tiempos de respuesta, canal y precio de extras.</li>
              <li>Usa una cuota mínima defendible antes de negociar descuentos.</li>
            </ul>
          </aside>
        </div>
      </section>

      <section className="section">
        <div className="container feature-grid" aria-label="Bloques habituales del mantenimiento">
          <article className="feature-card">
            <h2>Actualizaciones y seguridad</h2>
            <p>
              Actualizar CMS, plugins, temas o dependencias puede entrar en la cuota, pero debe ir
              acompañado de comprobaciones básicas para no convertir cada actualización en una
              reparación gratis.
            </p>
          </article>

          <article className="feature-card">
            <h2>Copias y supervisión</h2>
            <p>
              Las copias de seguridad, la monitorización básica y una revisión periódica del estado
              de la web son parte natural del servicio si están definidas con una frecuencia clara.
            </p>
          </article>

          <article className="feature-card">
            <h2>Soporte y pequeñas tareas</h2>
            <p>
              El soporte mensual puede incluir consultas y pequeños ajustes, siempre que haya horas
              máximas, ejemplos de tareas y una regla sencilla para trabajos que exceden el plan.
            </p>
          </article>
        </div>
      </section>

      <section className="section alt">
        <div className="container article-layout">
          <div className="text-block">
            <h2>Qué debería entrar en una cuota mensual sana</h2>
            <p>
              El objetivo no es que el mantenimiento suene enorme, sino que el cliente perciba
              continuidad y tú puedas sostener el servicio sin regalar horas invisibles.
            </p>
            <ol className="article-list article-list-ordered">
              <li>Actualizaciones controladas y comprobación básica posterior.</li>
              <li>Copias de seguridad y revisión de restauración cuando corresponda.</li>
              <li>Supervisión de disponibilidad, formularios o errores visibles.</li>
              <li>Pequeñas tareas dentro de una bolsa de horas mensual definida.</li>
              <li>Soporte por un canal pactado y con tiempo de respuesta orientativo.</li>
              <li>Informe breve o resumen mensual si el plan lo justifica.</li>
            </ol>
          </div>

          <aside className="feature-card article-summary">
            <h2>Señales de alcance peligroso</h2>
            <ul className="article-list">
              <li>El cliente espera disponibilidad inmediata por una cuota baja.</li>
              <li>No hay límite de horas ni ejemplos de tareas excluidas.</li>
              <li>Las urgencias entran igual que el soporte normal.</li>
              <li>Se mezclan mantenimiento, diseño, SEO y estrategia en el mismo precio.</li>
            </ul>
          </aside>
        </div>
      </section>

      <section className="section">
        <div className="container text-block">
          <h2>Qué conviene dejar fuera o presupuestar aparte</h2>
          <p>
            Muchas cuotas se rompen porque incluyen demasiado sin decirlo. Si una tarea cambia el
            alcance de la web, requiere varias horas o implica responsabilidad nueva, es mejor
            presupuestarla aparte.
          </p>
          <div className="feature-grid" aria-label="Tareas fuera de alcance">
            <article className="feature-card">
              <h3>Cambios grandes</h3>
              <p>Nuevas páginas, rediseños, migraciones, cambios de estructura o nuevos idiomas.</p>
            </article>

            <article className="feature-card">
              <h3>Marketing y estrategia</h3>
              <p>SEO profundo, campañas, copywriting, analítica avanzada o consultoría comercial.</p>
            </article>

            <article className="feature-card">
              <h3>Incidencias especiales</h3>
              <p>Hackeos previos, urgencias fuera de horario, integraciones nuevas o problemas externos.</p>
            </article>
          </div>
          <div className="disclaimer-box">
            <strong>Regla práctica:</strong> si no puedes estimar el tiempo de una tarea en pocos
            minutos, probablemente no debería ir dentro de una cuota básica.
          </div>
        </div>
      </section>

      <section className="section alt">
        <div className="container text-block">
          <h2>Cómo llevar este alcance a precio</h2>
          <p>
            Una vez tienes claro qué entra, puedes convertir el plan en números. Empieza por tus
            horas incluidas, suma un buffer de incidencias, añade costes mensuales por cliente y
            protege margen. Después separa la cuota mínima defendible de la cuota recomendada.
          </p>
          <p>
            Si todavía no tienes planes definidos, puedes leer la guía de{' '}
            <Link href="/paquetes-mantenimiento-web">paquetes de mantenimiento web</Link>. Si tu
            caso es WordPress, también tienes una guía específica sobre{' '}
            <Link href="/precio-mantenimiento-wordpress">precio de mantenimiento WordPress</Link>.
          </p>
          <div className="guide-cta">
            <Link href="/#calculadora" className="primary-button">
              Calcular mi cuota mensual
            </Link>
            <Link href="/cuanto-cobrar-mantenimiento-web-mensual" className="primary-button">
              Leer guía de precios
            </Link>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <LeadMagnetForm
            source="que-incluye-mantenimiento-web"
            title="Llévate el kit para definir tu mantenimiento"
            description="Recibe el checklist y la estructura base para separar tareas incluidas, límites, extras y cuota mensual antes de presentar el servicio."
            buttonLabel="Quiero el kit"
          />
        </div>
      </section>

      <section className="section alt" id="faq-que-incluye-mantenimiento">
        <div className="container text-block">
          <span className="eyebrow">Preguntas frecuentes</span>
          <h2>Dudas habituales sobre qué incluye un mantenimiento web</h2>
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
