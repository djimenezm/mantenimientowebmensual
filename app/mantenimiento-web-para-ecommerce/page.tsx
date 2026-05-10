import type { Metadata } from 'next';
import Link from 'next/link';
import Script from 'next/script';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import LeadMagnetForm from '@/components/LeadMagnetForm';
import { getSiteUrl, siteConfig } from '@/lib/site';

const route = '/mantenimiento-web-para-ecommerce';
const title = 'Mantenimiento web para ecommerce: como fijar una cuota mensual';
const description =
  'Guia para definir el precio de mantenimiento web para ecommerce con soporte, seguridad, actualizaciones, incidencias, horas incluidas y extras fuera de cuota.';

const pageFaqItems = [
  {
    question: 'Cuanto cobrar por mantenimiento web para ecommerce?',
    answer:
      'Depende del volumen de cambios, la criticidad de la tienda, las horas incluidas, las integraciones y el nivel de soporte. Un ecommerce suele requerir mas margen que una web corporativa porque una incidencia puede afectar ventas, pedidos o pagos.',
  },
  {
    question: 'Que debe incluir una cuota de mantenimiento para tienda online?',
    answer:
      'Debe separar tareas recurrentes, actualizaciones, copias, revision de errores, soporte funcional, pequenas mejoras y urgencias. Tambien conviene dejar por escrito que integraciones, cambios de catalogo o trabajos de conversion se presupuestan aparte.',
  },
  {
    question: 'Conviene vender mantenimiento ecommerce como soporte ilimitado?',
    answer:
      'No suele ser buena idea. En ecommerce hay mas peticiones, urgencias e impacto comercial. Es mejor incluir horas, prioridad y condiciones claras, y valorar por separado cambios grandes, integraciones o incidencias de terceros.',
  },
] as const;

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: route,
  },
  keywords: [
    'mantenimiento web ecommerce',
    'mantenimiento tienda online mensual',
    'precio mantenimiento ecommerce',
    'cuanto cobrar mantenimiento ecommerce',
    'mantenimiento woocommerce mensual',
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

export default function MantenimientoWebParaEcommercePage() {
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
    datePublished: '2026-05-10',
    dateModified: '2026-05-10',
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
        id="mantenimiento-ecommerce-article-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <Script
        id="mantenimiento-ecommerce-breadcrumb-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <Script
        id="mantenimiento-ecommerce-faq-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <Header />

      <section className="hero">
        <div className="container article-layout">
          <div className="text-block">
            <span className="eyebrow">Tiendas online</span>
            <h1>Mantenimiento web para ecommerce: como fijar una cuota mensual sostenible</h1>
            <p className="lead">
              Un ecommerce no se mantiene igual que una web informativa. Hay pedidos, pagos,
              catalogo, plugins, integraciones y una dependencia directa de las ventas. Por eso la
              cuota mensual necesita mas margen, mas claridad y menos promesas abiertas.
            </p>
            <div className="hero-badges" aria-label="Que cubre esta guia">
              <span className="hero-badge">Ecommerce</span>
              <span className="hero-badge">Horas incluidas</span>
              <span className="hero-badge">Urgencias aparte</span>
            </div>
            <div className="guide-cta">
              <Link href="/#calculadora" className="primary-button">
                Calcular cuota ecommerce
              </Link>
              <Link href="/paquetes-mantenimiento-web" className="primary-button">
                Ver paquetes mensuales
              </Link>
            </div>
          </div>

          <aside className="feature-card article-summary">
            <h2>Resumen rapido</h2>
            <ul className="article-list">
              <li>Sube el margen si la tienda vende a diario o depende de integraciones.</li>
              <li>Define horas incluidas, prioridad, canal de soporte y extras.</li>
              <li>No metas cambios de catalogo, CRO o nuevas integraciones sin limite.</li>
              <li>Separa mantenimiento preventivo, soporte y mejoras comerciales.</li>
            </ul>
          </aside>
        </div>
      </section>

      <section className="section">
        <div className="container feature-grid" aria-label="Factores de precio ecommerce">
          <article className="feature-card">
            <h2>Riesgo comercial</h2>
            <p>
              Si una incidencia puede frenar pedidos, pagos o formularios, la cuota debe contemplar
              mas responsabilidad. No es solo tiempo tecnico: tambien es disponibilidad mental y
              prioridad frente a otros trabajos.
            </p>
          </article>

          <article className="feature-card">
            <h2>Integraciones</h2>
            <p>
              Pasarelas de pago, envios, ERP, CRM, analytics o marketplaces aumentan el riesgo.
              Conviene indicar que fallos de terceros, nuevas conexiones o cambios de configuracion
              se valoran aparte.
            </p>
          </article>

          <article className="feature-card">
            <h2>Volumen de cambios</h2>
            <p>
              Productos, banners, promociones, cupones y landings internas pueden consumir la cuota
              muy rapido. Define si entran, cuantas horas cubren y que ocurre cuando se agotan.
            </p>
          </article>
        </div>
      </section>

      <section className="section alt">
        <div className="container article-layout">
          <div className="text-block">
            <h2>Que incluir en un mantenimiento ecommerce</h2>
            <p>
              La cuota deberia proteger la continuidad de la tienda sin convertirse en un servicio
              ilimitado de mejoras. Para eso necesitas separar tareas recurrentes, soporte,
              incidencias y trabajos de crecimiento.
            </p>
            <ol className="article-list article-list-ordered">
              <li>Actualizaciones controladas de CMS, tema, plugins o dependencias.</li>
              <li>Copias, revision de errores y supervision basica de disponibilidad.</li>
              <li>Soporte funcional para incidencias menores de compra, pago o carrito.</li>
              <li>Horas mensuales para pequenos ajustes, siempre con limite visible.</li>
              <li>Informe o resumen simple de tareas realizadas y pendientes relevantes.</li>
            </ol>
            <div className="disclaimer-box">
              <strong>Filtro practico:</strong> si una tarea cambia la venta, la conversion o una
              integracion critica, probablemente merece presupuesto aparte o una bolsa de horas
              adicional.
            </div>
          </div>

          <aside className="feature-card article-summary">
            <h2>No lo incluyas sin limite</h2>
            <ul className="article-list">
              <li>Subida masiva de productos o cambios de catalogo.</li>
              <li>Nuevas pasarelas, automatizaciones o integraciones.</li>
              <li>Optimizacion SEO, CRO o analitica avanzada.</li>
              <li>Recuperacion de hackeos o incidencias graves previas.</li>
              <li>Urgencias fuera de horario o con SLA estricto.</li>
            </ul>
          </aside>
        </div>
      </section>

      <section className="section">
        <div className="container text-block">
          <h2>Como usar la calculadora para una tienda online</h2>
          <p>
            Empieza con tu coste por hora real y despues ajusta el mantenimiento del cliente. Para
            ecommerce, evita partir de las mismas horas que usarias en una web corporativa sencilla:
            suma buffer por incidencias, mas costes directos si usas herramientas de monitorizacion
            y un margen mayor si el cliente espera prioridad.
          </p>
          <p>
            Si ofreces WooCommerce, Shopify o una tienda a medida, el criterio economico es
            parecido: cuanto mas impacta la web en ventas y mas piezas dependen de terceros, mas
            clara debe ser la cuota y mas estrictos deben ser los limites.
          </p>
          <div className="guide-cta">
            <Link href="/#calculadora" className="primary-button">
              Abrir calculadora
            </Link>
            <Link href="/horas-incluidas-mantenimiento-web" className="primary-button">
              Definir horas incluidas
            </Link>
          </div>
        </div>
      </section>

      <section className="section alt">
        <div className="container">
          <LeadMagnetForm
            source="mantenimiento-web-para-ecommerce"
            title="Llevate el kit para estructurar tu mantenimiento"
            description="Recibe el checklist y la estructura base para definir alcance, horas incluidas, limites y extras antes de presentar una cuota mensual."
            buttonLabel="Quiero el kit"
          />
        </div>
      </section>

      <section className="section">
        <div className="container text-block">
          <span className="eyebrow">Conecta el ecosistema</span>
          <h2>Si el ecommerce nace de un proyecto cerrado, separa construccion y soporte</h2>
          <p>
            Cuando primero presupuestas la tienda o una landing de captacion, conviene separar el
            precio de construccion de la cuota mensual posterior. Para aterrizar el proyecto cerrado
            puedes apoyarte en{' '}
            <a href="https://www.cuantopresupuestar.es?utm_source=mantenimientowebmensual&utm_medium=article-link&utm_campaign=ecommerce_maintenance">
              Cuanto Presupuestar
            </a>
            . Si el trabajo previo es una landing para captar leads, revisa tambien{' '}
            <a href="https://www.cuantocobrarlandingpage.es?utm_source=mantenimientowebmensual&utm_medium=article-link&utm_campaign=ecommerce_maintenance">
              Cuanto Cobrar Landing Page
            </a>
            .
          </p>
          <p>
            Para moverte entre todas las calculadoras y guias del ecosistema, puedes volver al{' '}
            <a href="https://www.paneldeherramientas.es?utm_source=mantenimientowebmensual&utm_medium=article-link&utm_campaign=ecommerce_maintenance">
              Panel de Herramientas
            </a>
            .
          </p>
        </div>
      </section>

      <section className="section alt" id="faq-ecommerce">
        <div className="container text-block">
          <span className="eyebrow">Preguntas frecuentes</span>
          <h2>Dudas habituales sobre mantenimiento web para ecommerce</h2>
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
