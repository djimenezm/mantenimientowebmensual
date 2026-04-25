import Link from 'next/link';
import Script from 'next/script';
import CalculatorForm from '@/components/CalculatorForm';
import FAQ, { faqItems } from '@/components/FAQ';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import { siteConfig } from '@/lib/site';

export default function HomePage() {
  const webAppSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: siteConfig.name,
    applicationCategory: 'BusinessApplication',
    operatingSystem: 'Any',
    inLanguage: 'es',
    isAccessibleForFree: true,
    description: siteConfig.description,
    url: siteConfig.url,
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'EUR',
    },
    featureList: [
      'Calculadora para saber cuanto cobrar mantenimiento web mensual',
      'Referencia base por hora a partir de tu objetivo mensual',
      'Buffer de incidencias y soporte',
      'IVA aparte y margen configurable',
    ],
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqItems.map((item) => ({
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
        id="webapp-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }}
      />
      <Script
        id="faq-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <Header />

      <section className="hero">
        <div className="container hero-grid">
          <div>
            <span className="eyebrow">Cuanto Cobrar Mantenimiento Web</span>
            <h1>Calculadora para saber cuanto cobrar mantenimiento web mensual</h1>
            <p className="lead">
              Convierte tu objetivo mensual en una cuota de mantenimiento web mas defendible.
              Calcula una referencia base por hora, anade buffer de incidencias, costes mensuales
              por cliente, margen extra e IVA aparte para no fijar la mensualidad a ciegas.
            </p>
            <div className="hero-badges" aria-label="Ventajas principales">
              <span className="hero-badge">Sin registro</span>
              <span className="hero-badge">Pensada para retainers mensuales</span>
              <span className="hero-badge">IVA siempre aparte</span>
            </div>
            <ul className="hero-points">
              <li>Convierte una cuota intuitiva en una cifra mas defendible para el cliente.</li>
              <li>
                Incluye horas facturables reales, buffer de incidencias, costes directos y reserva
                fiscal orientativa.
              </li>
              <li>
                Util para WordPress, webs corporativas, landing pages, soporte tecnico y servicios
                recurrentes.
              </li>
            </ul>
            <p className="hero-cta-note">
              Si ya ofreces mantenimiento mensual, usala para comprobar si esa cuota te deja el
              margen que buscas o si estas absorbiendo demasiado soporte.
            </p>
          </div>

          <CalculatorForm />
        </div>
      </section>

      <section className="section">
        <div className="container feature-grid" aria-label="Puntos clave de la herramienta">
          <article className="feature-card">
            <h2>Que resuelve</h2>
            <p>
              Parte de tu objetivo mensual, tus costes fijos y tus horas facturables para sacar una
              referencia por hora. Despues la convierte en una cuota mensual por cliente con buffer,
              costes directos y margen.
            </p>
          </article>

          <article className="feature-card">
            <h2>Cuando te aporta mas valor</h2>
            <p>
              Cuando vendes soporte o mantenimiento recurrente y quieres validar si la mensualidad
              cubre el tiempo real, las incidencias y el suelo economico de tu actividad.
            </p>
          </article>

          <article className="feature-card">
            <h2>Donde poner el filtro final</h2>
            <p>
              En contratos complejos, SLA mas estrictos o servicios con responsabilidad tecnica
              alta. La herramienta esta pensada para orientar tu cuota, no para sustituir una
              revision fiscal o contractual profesional.
            </p>
          </article>
        </div>
      </section>

      <section className="section" id="como-funciona">
        <div className="container text-block">
          <h2>Como funciona la calculadora</h2>
          <p>
            Primero estima cuanto necesitas facturar al mes para sostener tu objetivo neto y tus
            costes fijos. Esa cifra se reparte entre tus horas facturables reales para obtener una
            referencia base por hora.
          </p>
          <p>
            Despues esa referencia se lleva al cliente de mantenimiento: introduces las horas
            incluidas, un buffer de incidencias, los costes mensuales directos y el margen extra que
            quieres defender. Con eso obtienes una cuota minima defendible, una cuota recomendada y,
            si aplica, el total mensual con IVA aparte.
          </p>
          <div className="disclaimer-box">
            <strong>Idea clave:</strong> un retainer mensual sano no deberia salir de una intuicion
            rapida. Deberia salir de tus horas reales, el soporte que esperas absorber y el margen
            que necesitas conservar.
          </div>
        </div>
      </section>

      <section className="section alt">
        <div className="container conversion-grid">
          <div className="conversion-copy">
            <h2>No uses la cuota mensual como gesto comercial: usala como suelo defendible</h2>
            <p>
              La herramienta te da una cifra para no fijar el mantenimiento solo por sensacion o por
              comparacion con el mercado. Si tu cuota actual queda muy por debajo, probablemente te
              falte margen, tiempo o proteccion frente a incidencias.
            </p>
            <p>
              La idea no es fijar una mensualidad exacta al centimo, sino ayudarte a llegar a una
              cifra que puedas defender con mas criterio delante de un cliente.
            </p>
          </div>

          <div className="conversion-steps" aria-label="Como aprovechar mejor el resultado">
            <article className="conversion-step">
              <h3>1. Contrasta</h3>
              <p>Compara la cuota calculada con tu plan actual y detecta si te deja margen real.</p>
            </article>

            <article className="conversion-step">
              <h3>2. Ajusta</h3>
              <p>Prueba cambios en horas, buffer o margen para encontrar tu minimo razonable.</p>
            </article>

            <article className="conversion-step">
              <h3>3. Vende mejor</h3>
              <p>Usa la cuota recomendada como base para presentar un plan mensual mas defendible.</p>
            </article>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container text-block">
          <span className="eyebrow">Guia SEO</span>
          <h2>Guias para fijar mejor tu cuota mensual</h2>
          <p>
            Si prefieres entender primero la logica y despues tocar numeros, aqui tienes dos guias
            practicas para fijar mejor un mantenimiento web mensual y bajar WordPress a una cuota
            mas defendible.
          </p>
          <div className="feature-grid" aria-label="Guias destacadas">
            <article className="feature-card">
              <h3>Cuanto cobrar mantenimiento web mensual</h3>
              <p>
                Entiende la logica general para fijar una cuota mensual sin cobrar el mantenimiento
                a ojo.
              </p>
              <div className="guide-cta">
                <Link href="/cuanto-cobrar-mantenimiento-web-mensual" className="primary-button">
                  Leer la guia
                </Link>
              </div>
            </article>

            <article className="feature-card">
              <h3>Precio de mantenimiento WordPress</h3>
              <p>
                Baja un servicio WordPress a horas reales, incidencias, herramientas y soporte
                continuo antes de cerrar una cuota.
              </p>
              <div className="guide-cta">
                <Link href="/precio-mantenimiento-wordpress" className="primary-button">
                  Leer la guia
                </Link>
              </div>
            </article>
          </div>
        </div>
      </section>

      <section className="section alt">
        <div className="container text-block">
          <span className="eyebrow">Otra herramienta</span>
          <h2>Si antes necesitas aterrizar tu base mensual, usa Cuanto Facturar</h2>
          <p>
            Esta herramienta te ayuda a transformar tus numeros en una cuota mensual por cliente. Si
            primero quieres aclarar cuanto necesitas facturar como autonomo o freelance, puedes
            apoyarte tambien en <a href="https://www.cuantofacturar.es">Cuanto Facturar</a>.
          </p>
          <p>
            Y si el cliente todavia esta en fase de captacion o lanzamiento, puedes contrastar ese
            trabajo puntual con <a href="https://www.cuantocobrarlandingpage.es">Cuanto Cobrar
            Landing Page</a> antes de pasar a una cuota mensual.
          </p>
          <p>
            Para ver todas las herramientas conectadas entre si, tienes tambien{' '}
            <a href="https://www.paneldeherramientas.es">Panel de Herramientas</a>.
          </p>
        </div>
      </section>

      <FAQ />
      <Footer />
    </main>
  );
}
