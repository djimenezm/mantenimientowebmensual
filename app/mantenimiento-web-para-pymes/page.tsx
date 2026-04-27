import type { Metadata } from 'next';
import Link from 'next/link';
import Script from 'next/script';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import LeadMagnetForm from '@/components/LeadMagnetForm';
import { getSiteUrl, siteConfig } from '@/lib/site';

const route = '/mantenimiento-web-para-pymes';
const title = 'Mantenimiento web para pymes: que contratar, precio y alcance';
const description =
  'Guia para definir un servicio de mantenimiento web para pymes: actualizaciones, seguridad, soporte, horas incluidas, urgencias, precio mensual y tareas fuera de alcance.';

const pageFaqItems = [
  {
    question: 'Que mantenimiento web necesita una pyme?',
    answer:
      'Una pyme suele necesitar actualizaciones, copias, supervision basica, soporte pactado, revision de formularios, pequenas tareas y un proceso claro para incidencias, urgencias y trabajos fuera del plan.',
  },
  {
    question: 'Cuanto cuesta el mantenimiento web para una pyme?',
    answer:
      'Depende del tipo de web, horas incluidas, criticidad, frecuencia de cambios, soporte, urgencias, herramientas y responsabilidad tecnica. Lo importante es separar cuota mensual, extras y trabajos puntuales.',
  },
  {
    question: 'Que no deberia incluir un plan basico para pymes?',
    answer:
      'No conviene incluir redisenos, nuevas secciones, SEO profundo, campanas, copywriting amplio, integraciones nuevas, urgencias sin limite o recuperacion de problemas graves previos.',
  },
  {
    question: 'Es mejor una cuota mensual o una bolsa de horas?',
    answer:
      'La cuota mensual encaja cuando la pyme necesita continuidad y tranquilidad. La bolsa de horas puede servir para cambios puntuales, pero no sustituye un mantenimiento recurrente bien definido.',
  },
] as const;

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: route,
  },
  keywords: [
    'mantenimiento web para pymes',
    'servicio mantenimiento web pymes',
    'precio mantenimiento web pyme',
    'soporte web para empresas',
    'mantenimiento pagina web empresa',
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

export default function MantenimientoWebParaPymesPage() {
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
    datePublished: '2026-04-27',
    dateModified: '2026-04-27',
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
        id="mantenimiento-pymes-article-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <Script
        id="mantenimiento-pymes-breadcrumb-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <Script
        id="mantenimiento-pymes-faq-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <Header />

      <section className="hero">
        <div className="container article-layout">
          <div className="text-block">
            <span className="eyebrow">Soporte para empresas</span>
            <h1>Mantenimiento web para pymes: que contratar, precio y alcance</h1>
            <p className="lead">
              Una pyme no suele necesitar solo que la web este online. Necesita continuidad:
              actualizaciones, copias, soporte, pequenos cambios, control de formularios y una forma
              clara de resolver incidencias sin convertir cada aviso en una urgencia improvisada.
            </p>
            <div className="hero-badges" aria-label="Que cubre esta guia">
              <span className="hero-badge">Pymes</span>
              <span className="hero-badge">Soporte mensual</span>
              <span className="hero-badge">Alcance claro</span>
            </div>
            <div className="guide-cta">
              <Link href="/#calculadora" className="primary-button">
                Calcular cuota mensual
              </Link>
              <Link href="/paquetes-mantenimiento-web" className="primary-button">
                Ver paquetes
              </Link>
            </div>
          </div>

          <aside className="feature-card article-summary">
            <h2>Resumen rapido</h2>
            <ul className="article-list">
              <li>Una pyme necesita continuidad, no solo intervenciones sueltas.</li>
              <li>La cuota debe separar soporte incluido, extras y urgencias.</li>
              <li>El precio depende de horas, criticidad, cambios y responsabilidad.</li>
              <li>Un contrato claro evita que el mantenimiento sea soporte ilimitado.</li>
            </ul>
          </aside>
        </div>
      </section>

      <section className="section">
        <div className="container text-block">
          <h2>Que significa mantener la web de una pyme</h2>
          <p>
            Para una pyme, la web suele ser un escaparate, un canal de captacion o una pieza de
            confianza comercial. Si falla un formulario, se rompe una pagina clave o aparece un
            aviso de seguridad, el problema no es tecnico: puede afectar a ventas, reputacion y
            tiempo interno.
          </p>
          <p>
            Por eso el mantenimiento web para pymes debe combinar prevencion y respuesta. No hace
            falta vender una promesa enorme, pero si un marco claro: que se revisa, que se actualiza,
            como se reportan incidencias y que ocurre cuando el cliente pide algo fuera del plan.
          </p>
          <div className="disclaimer-box">
            <strong>Idea clave:</strong> una pyme compra tranquilidad y continuidad. La cuota debe
            cubrir tareas recurrentes sin abrir la puerta a cambios ilimitados.
          </div>
        </div>
      </section>

      <section className="section alt">
        <div className="container feature-grid" aria-label="Bloques clave para pymes">
          <article className="feature-card">
            <h2>Prevencion</h2>
            <p>
              Actualizaciones, copias, supervision basica, comprobacion de formularios y revision de
              errores visibles. Es la parte que evita sustos y reduce trabajo reactivo.
            </p>
          </article>

          <article className="feature-card">
            <h2>Soporte pactado</h2>
            <p>
              Consultas, pequenos ajustes y tareas recurrentes deben tener canal, horas incluidas,
              prioridad y tiempo de respuesta orientativo.
            </p>
          </article>

          <article className="feature-card">
            <h2>Extras claros</h2>
            <p>
              Nuevas paginas, redisenos, integraciones, SEO profundo, campanas o urgencias fuertes
              deberian presupuestarse aparte para proteger el margen.
            </p>
          </article>
        </div>
      </section>

      <section className="section">
        <div className="container article-layout">
          <div className="text-block">
            <h2>Alcance recomendado para un plan mensual de pyme</h2>
            <p>
              El mantenimiento debe sonar concreto. Una pyme entiende mejor un servicio cuando puede
              ver que tareas quedan cubiertas y donde empiezan los extras. Esta estructura suele ser
              una buena base para presentar una cuota mensual:
            </p>
            <ol className="article-list article-list-ordered">
              <li>Actualizaciones controladas de CMS, plugins, tema o dependencias.</li>
              <li>Copias de seguridad y comprobacion basica de restauracion.</li>
              <li>Revision de formularios, errores visibles y avisos criticos.</li>
              <li>Una bolsa mensual de pequenas tareas o soporte pactado.</li>
              <li>Canal de contacto, tiempo de respuesta y horario de soporte.</li>
              <li>Precio de horas extra, urgencias y trabajos fuera de alcance.</li>
            </ol>
          </div>

          <aside className="feature-card article-summary">
            <h2>No lo mezcles dentro de la cuota</h2>
            <ul className="article-list">
              <li>Redisenos o nuevas secciones.</li>
              <li>SEO tecnico profundo o contenidos recurrentes.</li>
              <li>Campanas de publicidad o analitica avanzada.</li>
              <li>Integraciones nuevas con CRM, pagos o automatizaciones.</li>
              <li>Recuperacion de hackeos o problemas anteriores al contrato.</li>
            </ul>
          </aside>
        </div>
      </section>

      <section className="section alt">
        <div className="container text-block">
          <h2>Como calcular el precio para una pyme</h2>
          <p>
            El precio no deberia salir de una media generica. Empieza por horas incluidas,
            probabilidad de incidencias, coste de herramientas, criticidad de la web y margen que
            necesitas para sostener interrupciones. Despues redondea la cuota para que sea facil de
            explicar.
          </p>
          <div className="feature-grid" aria-label="Factores de precio para pymes">
            <article className="feature-card">
              <h3>Web escaparate</h3>
              <p>
                Pocos cambios, menor criticidad y soporte limitado. Encaja con un plan basico bien
                delimitado.
              </p>
            </article>

            <article className="feature-card">
              <h3>Web comercial</h3>
              <p>
                Formularios, captacion y cambios mensuales. Requiere mas supervision y una cuota
                profesional.
              </p>
            </article>

            <article className="feature-card">
              <h3>Web critica</h3>
              <p>
                Ecommerce, reservas, integraciones o alta dependencia comercial. Necesita prioridad,
                mas buffer y condiciones mas claras.
              </p>
            </article>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container text-block">
          <h2>Cuota mensual o bolsa de horas para una pyme</h2>
          <p>
            La cuota mensual encaja si la pyme quiere continuidad y una persona responsable de la
            salud de la web. La bolsa de horas encaja mejor para cambios puntuales cuando no hay
            necesidad recurrente. El error es vender una cuota mensual barata y tratarla como bolsa
            abierta de tareas.
          </p>
          <p>
            Si la pyme pide cambios frecuentes, conviene incluir pocas tareas recurrentes y dejar
            claro que los cambios mayores se presupuestan aparte. Si lo que necesita es tranquilidad
            tecnica, el plan debe centrarse mas en supervision, copias, actualizaciones y soporte.
          </p>
          <div className="guide-cta">
            <Link href="/mantenimiento-web-vs-bolsa-horas" className="primary-button">
              Comparar con bolsa de horas
            </Link>
            <Link href="/contrato-mantenimiento-web-mensual" className="primary-button">
              Ver contrato mensual
            </Link>
          </div>
        </div>
      </section>

      <section className="section alt">
        <div className="container">
          <LeadMagnetForm
            source="mantenimiento-pymes"
            title="Te enviamos el kit para vender mantenimiento web a pymes"
            description="Incluye checklist de alcance, ejemplo de cuota mensual y estructura para separar soporte incluido, extras y urgencias."
            buttonLabel="Quiero el kit"
          />
        </div>
      </section>

      <section className="section">
        <div className="container text-block">
          <span className="eyebrow">Preguntas frecuentes</span>
          <h2>Dudas habituales sobre mantenimiento web para pymes</h2>
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
