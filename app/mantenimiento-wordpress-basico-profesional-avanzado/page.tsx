import type { Metadata } from 'next';
import Link from 'next/link';
import Script from 'next/script';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import LeadMagnetForm from '@/components/LeadMagnetForm';
import { getSiteUrl, siteConfig } from '@/lib/site';

const route = '/mantenimiento-wordpress-basico-profesional-avanzado';
const title = 'Mantenimiento WordPress básico, profesional o avanzado: qué incluir';
const description =
  'Guía práctica para estructurar planes de mantenimiento WordPress básico, profesional y avanzado con tareas incluidas, soporte, límites, extras, cuota e IVA aparte.';

const pageFaqItems = [
  {
    question: '¿Qué debe incluir un mantenimiento WordPress básico?',
    answer:
      'Un plan básico suele cubrir actualizaciones, copias, supervisión mínima y soporte limitado. Debe dejar fuera rediseños, nuevas funcionalidades, urgencias y tareas largas.',
  },
  {
    question: '¿Cuándo tiene sentido vender un plan WordPress profesional?',
    answer:
      'Tiene sentido cuando el cliente necesita más soporte, pequeñas mejoras recurrentes, seguimiento periódico y un margen razonable para incidencias sin convertirlo en soporte ilimitado.',
  },
  {
    question: '¿Cómo diferencio un plan avanzado sin regalar trabajo?',
    answer:
      'El plan avanzado puede incluir más horas, prioridad, revisiones periódicas y soporte más amplio, pero siempre con límites, tiempos de respuesta y extras definidos por escrito.',
  },
] as const;

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: route,
  },
  keywords: [
    'mantenimiento wordpress básico profesional avanzado',
    'planes mantenimiento wordpress',
    'mantenimiento wordpress básico',
    'mantenimiento wordpress profesional',
    'mantenimiento wordpress avanzado',
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

export default function MantenimientoWordPressPlanesPage() {
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
        id="planes-wordpress-article-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <Script
        id="planes-wordpress-breadcrumb-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <Script
        id="planes-wordpress-faq-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <Header />

      <section className="hero">
        <div className="container article-layout">
          <div className="text-block">
            <span className="eyebrow">Planes WordPress</span>
            <h1>Mantenimiento WordPress básico, profesional o avanzado: qué incluir en cada plan</h1>
            <p className="lead">
              Vender mantenimiento WordPress por planes ayuda al cliente a elegir mejor, pero solo
              funciona si cada nivel tiene alcance, horas, soporte y límites claros. Si no, el plan
              más pequeño acaba pareciéndose demasiado al avanzado y el margen desaparece.
            </p>
            <div className="hero-badges" aria-label="Qué cubre esta guía">
              <span className="hero-badge">Plan básico</span>
              <span className="hero-badge">Plan profesional</span>
              <span className="hero-badge">Plan avanzado</span>
            </div>
            <div className="guide-cta">
              <Link href="/#calculadora" className="primary-button">
                Calcular cuota
              </Link>
              <Link href="/precio-mantenimiento-wordpress" className="primary-button">
                Ver precio WordPress
              </Link>
              <Link
                href="/cuanto-cobrar-mantenimiento-wordpress-mensual"
                className="primary-button"
              >
                Cuánto cobrar
              </Link>
            </div>
          </div>

          <aside className="feature-card article-summary">
            <h2>Resumen rápido</h2>
            <ul className="article-list">
              <li>El plan básico debe protegerse de tareas largas y urgencias.</li>
              <li>El profesional suele ser el plan más equilibrado para vender.</li>
              <li>El avanzado debe incluir prioridad y más seguimiento, no barra libre.</li>
              <li>Cada plan necesita horas, límites, extras y precio separados.</li>
            </ul>
          </aside>
        </div>
      </section>

      <section className="section">
        <div className="container text-block">
          <h2>Por qué separar el mantenimiento WordPress en planes</h2>
          <p>
            Un cliente pequeño no necesita el mismo nivel de soporte que una web con captación,
            formularios, plugins críticos o cambios frecuentes. Separar por niveles permite vender
            una entrada accesible sin comprometerte a resolverlo todo por una cuota baja.
          </p>
          <p>
            La clave es que cada plan tenga diferencias reales: horas incluidas, prioridad, tareas
            cubiertas, tiempo de respuesta, revisiones periódicas y precio de extras.
          </p>
          <div className="disclaimer-box">
            <strong>Idea clave:</strong> un plan más caro no debe significar soporte infinito. Debe
            significar más cobertura, más prioridad y mejores límites definidos.
          </div>
        </div>
      </section>

      <section className="section alt">
        <div className="container feature-grid" aria-label="Planes de mantenimiento WordPress">
          <article className="feature-card">
            <h2>Básico</h2>
            <p>
              Para webs sencillas que necesitan actualizaciones, copias, supervisión ligera y soporte
              muy limitado. Debe ser claro, barato de operar y con pocos extras incluidos.
            </p>
          </article>

          <article className="feature-card">
            <h2>Profesional</h2>
            <p>
              Para clientes que necesitan pequeñas tareas recurrentes, más soporte y seguimiento
              mensual. Suele ser el plan más vendible si el alcance está bien protegido.
            </p>
          </article>

          <article className="feature-card">
            <h2>Avanzado</h2>
            <p>
              Para webs con más impacto comercial, prioridad, más horas, revisiones periódicas y
              respuesta más rápida. Debe tener límites para no convertirse en disponibilidad total.
            </p>
          </article>
        </div>
      </section>

      <section className="section">
        <div className="container article-layout">
          <div className="text-block">
            <h2>Qué incluir en cada plan sin regalar soporte</h2>
            <ol className="article-list article-list-ordered">
              <li>Define horas mensuales incluidas y si se acumulan o no.</li>
              <li>Separa actualizaciones técnicas de cambios de contenido.</li>
              <li>Indica cuántas pequeñas tareas entran y qué duración máxima tienen.</li>
              <li>Marca tiempos de respuesta normales y urgentes.</li>
              <li>Deja fuera rediseños, nuevas páginas, integraciones y SEO profundo.</li>
              <li>Fija precio de hora extra o presupuesto aparte para trabajos fuera de alcance.</li>
              <li>Incluye IVA aparte y condiciones de cancelación o revisión de precio.</li>
            </ol>
            <p>
              Si necesitas una estructura más amplia, también puedes revisar la guía de{' '}
              <Link href="/paquetes-mantenimiento-web">paquetes de mantenimiento web</Link> y la de{' '}
              <Link href="/contrato-mantenimiento-web-mensual">
                contrato de mantenimiento web mensual
              </Link>.
            </p>
          </div>

          <aside className="feature-card article-summary">
            <h2>No metas en el básico</h2>
            <ul className="article-list">
              <li>Urgencias fuera de horario.</li>
              <li>Rediseños o cambios de plantilla.</li>
              <li>Nuevas funcionalidades.</li>
              <li>Integraciones con terceros.</li>
              <li>Horas acumulables sin límite.</li>
            </ul>
          </aside>
        </div>
      </section>

      <section className="section alt">
        <div className="container text-block">
          <h2>Ejemplo de diferenciación sencilla</h2>
          <div className="feature-grid" aria-label="Ejemplo de diferencias entre planes">
            <article className="feature-card">
              <h3>Básico</h3>
              <p>
                Actualizaciones, copia mensual, supervisión básica y hasta 30 minutos de soporte
                menor. Extras siempre aparte.
              </p>
            </article>

            <article className="feature-card">
              <h3>Profesional</h3>
              <p>
                Todo lo anterior, copia más frecuente, revisión mensual, 1 o 2 horas de soporte y
                pequeños cambios dentro de alcance.
              </p>
            </article>

            <article className="feature-card">
              <h3>Avanzado</h3>
              <p>
                Más horas, prioridad, monitorización más cercana, revisión de rendimiento y soporte
                preferente con límites claros.
              </p>
            </article>
          </div>
          <p>
            Este ejemplo no es una tarifa cerrada. Es una forma de pensar el alcance. La cuota final
            debería salir de tus horas, costes, riesgo, margen e IVA.
          </p>
          <div className="guide-cta">
            <Link href="/#calculadora" className="primary-button">
              Calcular mis planes
            </Link>
            <Link href="/mantenimiento-web-vs-bolsa-horas" className="primary-button">
              Comparar con bolsa de horas
            </Link>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container text-block">
          <h2>Cómo poner precio a cada plan WordPress</h2>
          <p>
            Empieza por tu referencia por hora, estima las horas incluidas, añade buffer de
            incidencias, suma herramientas o licencias por cliente y protege margen. Después revisa
            si el salto entre planes es suficiente para que el cliente vea diferencia sin que tu
            plan intermedio se coma el trabajo del avanzado.
          </p>
          <p>
            Si ya tienes una cuota pensada, prueba el escenario en la calculadora y compara cuota
            mínima con cuota recomendada. La diferencia te dirá si el plan esta demasiado justo o si
            tiene espacio para absorber soporte normal.
          </p>
          <p>
            Para bajar el caso WordPress a una cuota mensual concreta, revisa también la guía sobre{' '}
            <Link href="/cuanto-cobrar-mantenimiento-wordpress-mensual">
              cuánto cobrar mantenimiento WordPress mensual
            </Link>.
          </p>
          <div className="guide-cta">
            <Link href="/#calculadora" className="primary-button">
              Probar la calculadora
            </Link>
            <Link href="/precio-mantenimiento-wordpress" className="primary-button">
              Leer guía de precio
            </Link>
          </div>
        </div>
      </section>

      <section className="section alt">
        <div className="container">
          <LeadMagnetForm
            source="mantenimiento-wordpress-basico-profesional-avanzado"
            title="Llévate el kit para ordenar tus planes WordPress"
            description="Recibe la lista de comprobación para separar alcance, horas, soporte, extras y cuota mensual antes de vender mantenimiento WordPress recurrente."
            buttonLabel="Quiero el kit"
          />
        </div>
      </section>

      <section className="section" id="faq-planes-wordpress">
        <div className="container text-block">
          <span className="eyebrow">Preguntas frecuentes</span>
          <h2>Dudas habituales sobre planes de mantenimiento WordPress</h2>
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

      <Footer />
    </main>
  );
}
