import type { Metadata } from 'next';
import Link from 'next/link';
import Script from 'next/script';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import LeadMagnetForm from '@/components/LeadMagnetForm';
import { getSiteUrl, siteConfig } from '@/lib/site';

const route = '/horas-incluidas-mantenimiento-web';
const title = 'Horas incluidas en mantenimiento web: como definir una cuota mensual sana';
const description =
  'Guia practica para decidir cuantas horas incluir en un mantenimiento web mensual, como limitar tareas, urgencias, extras y soporte sin perder margen.';

const pageFaqItems = [
  {
    question: 'Cuantas horas deberia incluir un mantenimiento web mensual?',
    answer:
      'Depende del tipo de web, riesgo, frecuencia de cambios y nivel de soporte. Para planes pequenos puede bastar 1 o 2 horas; para planes profesionales suele tener sentido definir 3 a 6 horas con limites claros.',
  },
  {
    question: 'Las horas no usadas se acumulan para el mes siguiente?',
    answer:
      'No conviene hacerlo por defecto. Si las horas se acumulan, la cuota puede convertirse en una deuda de trabajo. Es mejor definir una caducidad o vender una bolsa de horas aparte.',
  },
  {
    question: 'Que pasa si el cliente supera las horas incluidas?',
    answer:
      'Debe estar previsto antes de empezar: puedes cobrar horas extra, pasar tareas a una bolsa aparte o proponer un plan superior si el consumo se repite varios meses.',
  },
] as const;

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: route,
  },
  keywords: [
    'horas incluidas mantenimiento web',
    'cuantas horas incluir mantenimiento web',
    'horas mantenimiento web mensual',
    'limites mantenimiento web',
    'plan mantenimiento web horas incluidas',
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

export default function HorasIncluidasMantenimientoWebPage() {
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
        id="horas-incluidas-article-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <Script
        id="horas-incluidas-breadcrumb-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <Script
        id="horas-incluidas-faq-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <Header />

      <section className="hero">
        <div className="container article-layout">
          <div className="text-block">
            <span className="eyebrow">Limites de soporte</span>
            <h1>Horas incluidas en mantenimiento web: como definir una cuota mensual sana</h1>
            <p className="lead">
              La cuota mensual no deberia ser una barra libre de cambios pequenos. Definir bien las
              horas incluidas te ayuda a vender continuidad, proteger agenda y evitar que el
              mantenimiento se convierta en soporte ilimitado con sonrisa cansada.
            </p>
            <div className="hero-badges" aria-label="Que cubre esta guia">
              <span className="hero-badge">Horas mensuales</span>
              <span className="hero-badge">Urgencias y extras</span>
              <span className="hero-badge">Planes escalables</span>
            </div>
            <div className="guide-cta">
              <Link href="/#calculadora" className="primary-button">
                Calcular mi cuota
              </Link>
              <Link href="/paquetes-mantenimiento-web" className="primary-button">
                Ver paquetes
              </Link>
            </div>
          </div>

          <aside className="feature-card article-summary">
            <h2>Resumen rapido</h2>
            <ul className="article-list">
              <li>Incluye horas suficientes para tareas normales, no para cualquier cosa.</li>
              <li>Define si las horas caducan, se acumulan o se facturan como extra.</li>
              <li>Separa soporte normal, urgencias, mejoras y proyectos nuevos.</li>
              <li>Si el cliente supera horas varios meses, probablemente necesita otro plan.</li>
            </ul>
          </aside>
        </div>
      </section>

      <section className="section">
        <div className="container text-block">
          <h2>Por que las horas incluidas importan tanto</h2>
          <p>
            En mantenimiento web, el problema no suele ser una tarea aislada. Es la suma silenciosa:
            una actualizacion pequena, una consulta rapida, una revision, una urgencia leve, un
            cambio de texto y esa llamada que iba a durar cinco minutos. Sin limites, la cuota se
            vuelve elastica y tu margen se encoge.
          </p>
          <p>
            Las horas incluidas no son solo un numero. Son una forma de explicar que compra el
            cliente, que ritmo de soporte puede esperar y donde empieza el trabajo adicional.
          </p>
          <div className="disclaimer-box">
            <strong>Idea clave:</strong> una cuota sana combina tareas recurrentes, disponibilidad
            razonable y limites claros para cambios fuera de alcance.
          </div>
        </div>
      </section>

      <section className="section alt">
        <div className="container feature-grid" aria-label="Rangos de horas recomendados">
          <article className="feature-card">
            <h2>Plan basico: 1 a 2 horas</h2>
            <p>
              Para webs sencillas con pocos cambios, actualizaciones controladas y soporte puntual.
              Encaja si el cliente solo necesita tranquilidad minima.
            </p>
          </article>

          <article className="feature-card">
            <h2>Plan profesional: 3 a 6 horas</h2>
            <p>
              Para webs con cambios frecuentes, pequenas mejoras, soporte mensual y seguimiento mas
              cercano. Aqui ya necesitas reglas claras sobre prioridad.
            </p>
          </article>

          <article className="feature-card">
            <h2>Plan avanzado: 8 horas o mas</h2>
            <p>
              Para webs con dependencia comercial, contenido frecuente, mejoras continuas o varios
              interlocutores. Conviene separar roadmap, urgencias y tareas de proyecto.
            </p>
          </article>
        </div>
      </section>

      <section className="section">
        <div className="container article-layout">
          <div className="text-block">
            <h2>Como definir las horas incluidas sin quedarte corto</h2>
            <ol className="article-list article-list-ordered">
              <li>Lista tareas recurrentes: actualizaciones, copias, revision y pequenos ajustes.</li>
              <li>Estima consumo mensual normal segun historial o tipo de web.</li>
              <li>Anade buffer para incidencias pequenas, no para proyectos nuevos.</li>
              <li>Decide si las horas caducan o si pasan a una bolsa aparte.</li>
              <li>Define precio de hora extra y plazo de respuesta.</li>
              <li>Revisa el plan si el consumo real supera el limite durante varios meses.</li>
            </ol>
            <p>
              La clave es que el cliente vea el mantenimiento como un acuerdo de continuidad, no
              como una cuenta corriente de horas infinitas. Si necesita mas ritmo, sube de plan; si
              necesita un cambio grande, se presupuesta aparte.
            </p>
          </div>

          <aside className="feature-card article-summary">
            <h2>Checklist rapido</h2>
            <ul className="article-list">
              <li>Horas incluidas al mes.</li>
              <li>Caducidad o no acumulacion.</li>
              <li>Precio de hora extra.</li>
              <li>Tareas excluidas.</li>
              <li>Tiempo de respuesta normal y urgente.</li>
            </ul>
          </aside>
        </div>
      </section>

      <section className="section alt">
        <div className="container text-block">
          <h2>Que tareas no deberian consumir la misma bolsa</h2>
          <p>
            No todo lo que ocurre en una web deberia salir de las mismas horas. Actualizar plugins,
            cambiar un texto o revisar una copia no tiene el mismo impacto que crear una nueva
            seccion, resolver una caida grave o integrar una herramienta externa.
          </p>
          <div className="feature-grid" aria-label="Tipos de trabajo">
            <article className="feature-card">
              <h3>Incluido normalmente</h3>
              <p>Actualizaciones, copias, ajustes pequenos, revision visual y soporte ordinario.</p>
            </article>

            <article className="feature-card">
              <h3>Extra o bolsa aparte</h3>
              <p>Nuevas secciones, formularios complejos, integraciones, copy o cambios de diseno.</p>
            </article>

            <article className="feature-card">
              <h3>Urgencia con condiciones</h3>
              <p>Caidas, errores criticos, malware o incidencias fuera de horario pactado.</p>
            </article>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container text-block">
          <h2>Texto de ejemplo para tu contrato o propuesta</h2>
          <div className="disclaimer-box">
            <p>
              La cuota mensual incluye hasta 3 horas de soporte ordinario para tareas de
              mantenimiento, pequenos ajustes y revisiones tecnicas. Las horas no consumidas no son
              acumulables. Cualquier tarea que supere el alcance incluido se presupuestara aparte o
              se facturara segun la tarifa de hora adicional acordada.
            </p>
          </div>
          <p>
            Puedes ajustar este texto segun tus planes y despues bajarlo a un documento mas completo
            con la guia de{' '}
            <Link href="/contrato-mantenimiento-web-mensual">
              contrato de mantenimiento web mensual
            </Link>
            . Si estas comparando modelos, revisa tambien{' '}
            <Link href="/mantenimiento-web-vs-bolsa-horas">
              mantenimiento web vs bolsa de horas
            </Link>
            .
          </p>
          <div className="guide-cta">
            <Link href="/#calculadora" className="primary-button">
              Calcular cuota con horas
            </Link>
            <Link href="/que-incluye-mantenimiento-web" className="primary-button">
              Ver tareas incluidas
            </Link>
          </div>
        </div>
      </section>

      <section className="section alt">
        <div className="container">
          <LeadMagnetForm
            source="horas-incluidas-mantenimiento-web"
            title="Llevate el kit para definir mejor tus horas incluidas"
            description="Recibe el checklist para separar horas incluidas, extras, urgencias y tareas fuera de alcance antes de vender una cuota mensual."
            buttonLabel="Quiero el kit"
          />
        </div>
      </section>

      <section className="section" id="faq-horas-incluidas">
        <div className="container text-block">
          <span className="eyebrow">Preguntas frecuentes</span>
          <h2>Dudas habituales sobre horas incluidas en mantenimiento web</h2>
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
