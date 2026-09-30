import type { Metadata } from 'next';
import Link from 'next/link';
import Script from 'next/script';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import LeadMagnetForm from '@/components/LeadMagnetForm';
import { getSiteUrl, siteConfig } from '@/lib/site';

const route = '/cuanto-cobrar-mantenimiento-web-mensual';
const title = 'Cuánto cobrar mantenimiento web mensual sin poner la cuota a ojo';
const description =
  'Guía práctica para calcular cuánto cobrar por mantenimiento web mensual según horas incluidas, buffer de incidencias, costes por cliente, margen e IVA aparte.';

const pageFaqItems = [
  {
    question: '¿Cuánto cobrar por mantenimiento web mensual?',
    answer:
      'No hay una cuota única. Depende de las horas incluidas, el tipo de soporte, el buffer de incidencias, los costes mensuales por cliente y el margen qué necesitas proteger.',
  },
  {
    question: '¿Qué debería incluir un plan de mantenimiento web?',
    answer:
      'Suele incluir actualizaciones, supervisión básica, pequeñas tareas, soporte, revisiones técnicas y un alcance claro. Lo importante es que la cuota refleje tanto las horas visibles como la fricción real del servicio.',
  },
  {
    question: '¿Es mejor cobrar mantenimiento por bolsa de horas o por cuota fija?',
    answer:
      'Las dos opciones pueden funcionar. La cuota fija suele venderse mejor, pero solo es sana si conoces tu referencia por hora y el coste real de absorber incidencias y soporte recurrente.',
  },
] as const;

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: route,
  },
  keywords: [
    'cuánto cobrar mantenimiento web mensual',
    'precio mantenimiento web mensual',
    'cuota mantenimiento web',
    'mantenimiento web mensual freelance',
    'soporte web mensual precio',
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

export default function CuantoCobrarMantenimientoWebMensualPage() {
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
    datePublished: '2026-04-24',
    dateModified: '2026-04-24',
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
        id="mantenimiento-web-article-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <Script
        id="mantenimiento-web-breadcrumb-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <Script
        id="mantenimiento-web-faq-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <Header />

      <section className="hero">
        <div className="container article-layout">
          <div className="text-block">
            <span className="eyebrow">Guía práctica</span>
            <h1>Cuánto cobrar mantenimiento web mensual sin poner la cuota a ojo</h1>
            <p className="lead">
              Una cuota de mantenimiento no debería salir de lo que te parece razonable ni de lo
              que cobra otra persona por internet. Si quieres que el servicio sea sostenible,
              necesitas bajar el mantenimiento a horas reales, incidencias, costes por cliente y
              margen.
            </p>
            <div className="hero-badges" aria-label="Qué cubre esta guía">
              <span className="hero-badge">Cuota mensual</span>
              <span className="hero-badge">Buffer de incidencias</span>
              <span className="hero-badge">Margen defendible</span>
            </div>
            <div className="guide-cta">
              <Link href="/#calculadora" className="primary-button">
                Ir a la calculadora
              </Link>
            </div>
          </div>

          <aside className="feature-card article-summary">
            <h2>Qué vas a aterrizar aquí</h2>
            <ul className="article-list">
              <li>Qué variables cambian de verdad el precio del mantenimiento web.</li>
              <li>Cómo usar horas incluidas y buffer sin regalar soporte todos los meses.</li>
              <li>Qué diferencia hay entre cuota mínima y cuota recomendada.</li>
              <li>Cómo presentar una mensualidad más sana al cliente.</li>
            </ul>
          </aside>
        </div>
      </section>

      <section className="section">
        <div className="container text-block">
          <h2>El mantenimiento web no es solo &quot;unas horitas al mes&quot;</h2>
          <p>
            Muchas cuotas se quedan cortas porque se calculan solo con las tareas visibles:
            actualizar plugins, revisar copias o hacer pequeños cambios. Pero el servicio real suele
            incluir también supervisión, contexto, soporte, fricción, seguimiento e incidencias que
            no siempre aparecen en el mejor escenario.
          </p>
          <p>
            Por eso una cuota mensual sana no se debería fijar a ojo. Se debería construir desde tu
            base económica y desde el tiempo real que ese cliente puede consumir.
          </p>
          <div className="disclaimer-box">
            <strong>Idea clave:</strong> un mantenimiento mensual rentable no depende solo de las
            horas incluidas. Depende también del soporte que terminas absorbiendo y del margen que
            necesitas proteger.
          </div>
        </div>
      </section>

      <section className="section alt">
        <div className="container feature-grid" aria-label="Factores que cambian la cuota">
          <article className="feature-card">
            <h2>1. Horas incluidas y horas reales</h2>
            <p>
              No basta con definir una bolsa teórica. Necesitas comprobar cuántas horas puede
              consumir de verdad ese cliente entre tareas, soporte y pequeñas incidencias.
            </p>
          </article>

          <article className="feature-card">
            <h2>2. Buffer de incidencias</h2>
            <p>
              Parte del precio debería cubrir el desgaste normal del servicio: imprevistos,
              urgencias suaves, revisiones o tareas pequeñas que se repiten sin avisar.
            </p>
          </article>

          <article className="feature-card">
            <h2>3. Costes y margen</h2>
            <p>
              Herramientas, monitorización, terceros, compras y margen comercial también forman
              parte de una cuota mensual sostenible.
            </p>
          </article>
        </div>
      </section>

      <section className="section">
        <div className="container text-block">
          <h2>Errores habituales al cobrar mantenimiento web</h2>
          <ol className="article-list article-list-ordered">
            <li>Poner una cuota copiando el mercado sin conocer tu propio suelo.</li>
            <li>Contar solo horas visibles y no el soporte real que absorbes.</li>
            <li>No dejar buffer para incidencias y pequeñas tareas recurrentes.</li>
            <li>Olvidar costes directos del cliente o herramientas específicas.</li>
            <li>Negociar a la baja sin tocar alcance, tiempos o límites del servicio.</li>
          </ol>
          <p>
            El resultado suele ser el mismo: clientes que parecen buenos sobre el papel pero que,
            mes a mes, erosionan margen y tiempo útil.
          </p>
        </div>
      </section>

      <section className="section alt">
        <div className="container feature-grid" aria-label="Cómo usar la calculadora">
          <article className="feature-card">
            <h2>Referencia base por hora</h2>
            <p>
              Te da una base económica para no improvisar. Sirve para validar si tu cuota actual
              cubre de verdad el tiempo y el negocio que hay detrás.
            </p>
          </article>

          <article className="feature-card">
            <h2>Cuota mínima defendible</h2>
            <p>
              Marca el suelo del servicio antes de regalar margen. Si el cliente quiere bajar más,
              probablemente haya que tocar horas incluidas, alcance o tiempos de respuesta.
            </p>
          </article>

          <article className="feature-card">
            <h2>Cuota recomendada</h2>
            <p>
              Es la zona donde puedes presentar una mensualidad más sana, con espacio para negociar
              y absorber mejor la fricción normal del soporte recurrente.
            </p>
          </article>
        </div>
      </section>

      <section className="section">
        <div className="container text-block">
          <h2>Usa la calculadora para aterrizar tu caso</h2>
          <p>
            Esta guía te da el marco. La calculadora te ayuda a probar tu caso real con objetivo
            mensual, costes fijos, horas incluidas, buffer, costes por cliente, margen e IVA para
            obtener una cuota mensual mucho más útil que una cifra improvisada.
          </p>
          <p>
            Si tu caso gira específicamente alrededor de WordPress, puedes apoyarte también en la
            guía sobre <Link href="/precio-mantenimiento-wordpress">precio de mantenimiento
            WordPress</Link> para separar mejor soporte, incidencias y coste del servicio.
          </p>
          <div className="guide-cta">
            <Link href="/#calculadora" className="primary-button">
              Calcular mi cuota mensual
            </Link>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <LeadMagnetForm
            source="cuanto-cobrar-mantenimiento-web-mensual"
            title="Te enviamos el kit de mantenimiento"
            description="Si esta guía te resulta útil, deja tu email y te damos acceso al kit gratuito con lista de comprobación de mantenimiento, estructura de cuota mensual y ejemplo de alcance."
            buttonLabel="Quiero el kit"
          />
        </div>
      </section>

      <section className="section alt" aria-labelledby="mantenimiento-web-faq-title">
        <div className="container text-block">
          <h2 id="mantenimiento-web-faq-title">
            Preguntas frecuentes sobre cuánto cobrar mantenimiento web mensual
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
          <h2>Lleva la teoría a una cuota concreta</h2>
          <p>
            Si ya tienes claro que el mantenimiento no se debería cobrar a ojo, el siguiente paso
            útil es probar un caso real en la calculadora y ver dónde queda tu cuota mínima y tu
            zona recomendada.
          </p>
          <div className="guide-cta">
            <Link href="/#calculadora" className="primary-button">
              Probar la calculadora
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
