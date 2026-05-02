import type { Metadata } from 'next';
import Link from 'next/link';
import Script from 'next/script';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import LeadMagnetForm from '@/components/LeadMagnetForm';
import { getSiteUrl, siteConfig } from '@/lib/site';

const route = '/mantenimiento-wordpress-basico-profesional-avanzado';
const title = 'Mantenimiento WordPress basico, profesional o avanzado: que incluir';
const description =
  'Guia practica para estructurar planes de mantenimiento WordPress basico, profesional y avanzado con tareas incluidas, soporte, limites, extras, cuota e IVA aparte.';

const pageFaqItems = [
  {
    question: 'Que debe incluir un mantenimiento WordPress basico?',
    answer:
      'Un plan basico suele cubrir actualizaciones, copias, supervision minima y soporte limitado. Debe dejar fuera redisenos, nuevas funcionalidades, urgencias y tareas largas.',
  },
  {
    question: 'Cuando tiene sentido vender un plan WordPress profesional?',
    answer:
      'Tiene sentido cuando el cliente necesita mas soporte, pequenas mejoras recurrentes, seguimiento periodico y un margen razonable para incidencias sin convertirlo en soporte ilimitado.',
  },
  {
    question: 'Como diferencio un plan avanzado sin regalar trabajo?',
    answer:
      'El plan avanzado puede incluir mas horas, prioridad, revisiones periodicas y soporte mas amplio, pero siempre con limites, tiempos de respuesta y extras definidos por escrito.',
  },
] as const;

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: route,
  },
  keywords: [
    'mantenimiento wordpress basico profesional avanzado',
    'planes mantenimiento wordpress',
    'mantenimiento wordpress basico',
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
            <h1>Mantenimiento WordPress basico, profesional o avanzado: que incluir en cada plan</h1>
            <p className="lead">
              Vender mantenimiento WordPress por planes ayuda al cliente a elegir mejor, pero solo
              funciona si cada nivel tiene alcance, horas, soporte y limites claros. Si no, el plan
              mas pequeno acaba pareciendose demasiado al avanzado y el margen desaparece.
            </p>
            <div className="hero-badges" aria-label="Que cubre esta guia">
              <span className="hero-badge">Plan basico</span>
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
                Cuanto cobrar
              </Link>
            </div>
          </div>

          <aside className="feature-card article-summary">
            <h2>Resumen rapido</h2>
            <ul className="article-list">
              <li>El plan basico debe protegerse de tareas largas y urgencias.</li>
              <li>El profesional suele ser el plan mas equilibrado para vender.</li>
              <li>El avanzado debe incluir prioridad y mas seguimiento, no barra libre.</li>
              <li>Cada plan necesita horas, limites, extras y precio separados.</li>
            </ul>
          </aside>
        </div>
      </section>

      <section className="section">
        <div className="container text-block">
          <h2>Por que separar el mantenimiento WordPress en planes</h2>
          <p>
            Un cliente pequeno no necesita el mismo nivel de soporte que una web con captacion,
            formularios, plugins criticos o cambios frecuentes. Separar por niveles permite vender
            una entrada accesible sin comprometerte a resolverlo todo por una cuota baja.
          </p>
          <p>
            La clave es que cada plan tenga diferencias reales: horas incluidas, prioridad, tareas
            cubiertas, tiempo de respuesta, revisiones periodicas y precio de extras.
          </p>
          <div className="disclaimer-box">
            <strong>Idea clave:</strong> un plan mas caro no debe significar soporte infinito. Debe
            significar mas cobertura, mas prioridad y mejores limites definidos.
          </div>
        </div>
      </section>

      <section className="section alt">
        <div className="container feature-grid" aria-label="Planes de mantenimiento WordPress">
          <article className="feature-card">
            <h2>Basico</h2>
            <p>
              Para webs sencillas que necesitan actualizaciones, copias, supervision ligera y soporte
              muy limitado. Debe ser claro, barato de operar y con pocos extras incluidos.
            </p>
          </article>

          <article className="feature-card">
            <h2>Profesional</h2>
            <p>
              Para clientes que necesitan pequenas tareas recurrentes, mas soporte y seguimiento
              mensual. Suele ser el plan mas vendible si el alcance esta bien protegido.
            </p>
          </article>

          <article className="feature-card">
            <h2>Avanzado</h2>
            <p>
              Para webs con mas impacto comercial, prioridad, mas horas, revisiones periodicas y
              respuesta mas rapida. Debe tener limites para no convertirse en disponibilidad total.
            </p>
          </article>
        </div>
      </section>

      <section className="section">
        <div className="container article-layout">
          <div className="text-block">
            <h2>Que incluir en cada plan sin regalar soporte</h2>
            <ol className="article-list article-list-ordered">
              <li>Define horas mensuales incluidas y si se acumulan o no.</li>
              <li>Separa actualizaciones tecnicas de cambios de contenido.</li>
              <li>Indica cuantas pequenas tareas entran y que duracion maxima tienen.</li>
              <li>Marca tiempos de respuesta normales y urgentes.</li>
              <li>Deja fuera redisenos, nuevas paginas, integraciones y SEO profundo.</li>
              <li>Fija precio de hora extra o presupuesto aparte para trabajos fuera de alcance.</li>
              <li>Incluye IVA aparte y condiciones de cancelacion o revision de precio.</li>
            </ol>
            <p>
              Si necesitas una estructura mas amplia, tambien puedes revisar la guia de{' '}
              <Link href="/paquetes-mantenimiento-web">paquetes de mantenimiento web</Link> y la de{' '}
              <Link href="/contrato-mantenimiento-web-mensual">
                contrato de mantenimiento web mensual
              </Link>
              .
            </p>
          </div>

          <aside className="feature-card article-summary">
            <h2>No metas en el basico</h2>
            <ul className="article-list">
              <li>Urgencias fuera de horario.</li>
              <li>Redisenos o cambios de plantilla.</li>
              <li>Nuevas funcionalidades.</li>
              <li>Integraciones con terceros.</li>
              <li>Horas acumulables sin limite.</li>
            </ul>
          </aside>
        </div>
      </section>

      <section className="section alt">
        <div className="container text-block">
          <h2>Ejemplo de diferenciacion sencilla</h2>
          <div className="feature-grid" aria-label="Ejemplo de diferencias entre planes">
            <article className="feature-card">
              <h3>Basico</h3>
              <p>
                Actualizaciones, copia mensual, supervision basica y hasta 30 minutos de soporte
                menor. Extras siempre aparte.
              </p>
            </article>

            <article className="feature-card">
              <h3>Profesional</h3>
              <p>
                Todo lo anterior, copia mas frecuente, revision mensual, 1 o 2 horas de soporte y
                pequenos cambios dentro de alcance.
              </p>
            </article>

            <article className="feature-card">
              <h3>Avanzado</h3>
              <p>
                Mas horas, prioridad, monitorizacion mas cercana, revision de rendimiento y soporte
                preferente con limites claros.
              </p>
            </article>
          </div>
          <p>
            Este ejemplo no es una tarifa cerrada. Es una forma de pensar el alcance. La cuota final
            deberia salir de tus horas, costes, riesgo, margen e IVA.
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
          <h2>Como poner precio a cada plan WordPress</h2>
          <p>
            Empieza por tu referencia por hora, estima las horas incluidas, anade buffer de
            incidencias, suma herramientas o licencias por cliente y protege margen. Despues revisa
            si el salto entre planes es suficiente para que el cliente vea diferencia sin que tu
            plan intermedio se coma el trabajo del avanzado.
          </p>
          <p>
            Si ya tienes una cuota pensada, prueba el escenario en la calculadora y compara cuota
            minima con cuota recomendada. La diferencia te dira si el plan esta demasiado justo o si
            tiene espacio para absorber soporte normal.
          </p>
          <p>
            Para bajar el caso WordPress a una cuota mensual concreta, revisa tambien la guia sobre{' '}
            <Link href="/cuanto-cobrar-mantenimiento-wordpress-mensual">
              cuanto cobrar mantenimiento WordPress mensual
            </Link>
            .
          </p>
          <div className="guide-cta">
            <Link href="/#calculadora" className="primary-button">
              Probar la calculadora
            </Link>
            <Link href="/precio-mantenimiento-wordpress" className="primary-button">
              Leer guia de precio
            </Link>
          </div>
        </div>
      </section>

      <section className="section alt">
        <div className="container">
          <LeadMagnetForm
            source="mantenimiento-wordpress-basico-profesional-avanzado"
            title="Llevate el kit para ordenar tus planes WordPress"
            description="Recibe el checklist para separar alcance, horas, soporte, extras y cuota mensual antes de vender mantenimiento WordPress recurrente."
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
