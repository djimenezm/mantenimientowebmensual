import Image from 'next/image';
import AdSlot from '@/components/AdSlot';
import CalculatorForm from '@/components/CalculatorForm';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import JsonLd from '@/components/JsonLd';
import LeadMagnetForm from '@/components/LeadMagnetForm';
import { siteConfig } from '@/lib/site';

const outcomeItems = [
  'Cuota mínima defendible',
  'Precio mensual recomendado',
  'IVA y margen separados',
] as const;

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
      'Cuota mínima para mantenimiento web mensual',
      'Precio recomendado según horas y margen',
      'IVA y costes directos calculados por separado',
    ],
  };

  return (
    <>
      <Header />
      <main id="contenido-principal" className="maintenance-landing">
        <JsonLd id="webapp-schema" data={webAppSchema} />

        <section className="maintenance-hero" aria-labelledby="maintenance-hero-title">
          <Image
            src="/images/maintenance-hero-v2.webp"
            alt=""
            fill
            priority
            sizes="100vw"
            className="maintenance-hero-image"
          />
          <div className="maintenance-hero-scrim" />
          <div className="container maintenance-hero-content">
            <span className="maintenance-hero-kicker">Calculadora de mantenimiento web</span>
            <h1 id="maintenance-hero-title">El mantenimiento web no es un favor. Ponle precio.</h1>
            <p>Convierte horas, incidencias y margen en una cuota mensual clara.</p>

            <div className="maintenance-hero-actions">
              <a href="#calculadora" className="primary-button">
                Calcular mi cuota
              </a>
              <a href="#como-funciona" className="maintenance-ghost-button">
                Ver qué obtengo
              </a>
            </div>
          </div>
        </section>

        <section
          className="maintenance-calculator-band"
          aria-labelledby="maintenance-calculator-heading"
        >
          <div className="container maintenance-calculator-shell">
            <div className="maintenance-calculator-copy">
              <span className="eyebrow">Calcula antes de ofrecer</span>
              <h2 id="maintenance-calculator-heading">
                Una cuota mensual tiene que proteger tu tiempo.
              </h2>
              <p>Introduce tus números. Obtendrás un mínimo y un precio recomendado.</p>
            </div>

            <CalculatorForm />
          </div>
        </section>

        <section
          className="maintenance-mini-strip"
          id="como-funciona"
          aria-label="Resultado de la calculadora"
        >
          <div className="container maintenance-mini-strip-inner">
            <strong>Obtienes solo lo necesario:</strong>
            <div>
              {outcomeItems.map((item) => (
                <span key={item}>{item}</span>
              ))}
            </div>
          </div>
        </section>

        <AdSlot placement="primary" />

        <section className="maintenance-method-band" aria-labelledby="maintenance-method-heading">
          <div className="container maintenance-method-grid">
            <div>
              <span className="eyebrow">Cómo se calcula</span>
              <h2 id="maintenance-method-heading">Una cuota que incluye el trabajo real.</h2>
            </div>
            <div className="maintenance-method-detail">
              <p>
                Tu objetivo mensual y horas facturables fijan una tarifa base. La cuota suma las
                horas incluidas, una reserva para incidencias, costes directos por cliente y margen.
              </p>
              <p>
                El IVA se muestra aparte. Define qué tareas y tiempos de respuesta cubre la cuota;
                el trabajo fuera de alcance necesita otro precio.
              </p>
              <nav aria-label="Profundiza en la cuota de mantenimiento web">
                <a href="/horas-incluidas-mantenimiento-web">Cómo fijar las horas incluidas</a>
                <a href="/paquetes-mantenimiento-web">Cómo estructurar tus paquetes</a>
              </nav>
            </div>
          </div>
        </section>

        <section className="maintenance-checklist-band" id="kit-mantenimiento-form">
          <div className="container maintenance-checklist-grid">
            <div className="maintenance-checklist-copy">
              <span className="eyebrow">Después del cálculo</span>
              <h2>Define el alcance antes de enviar la cuota.</h2>
              <p>Una lista de comprobación breve para separar tareas, urgencias y extras.</p>
            </div>

            <LeadMagnetForm
              source="home"
              title="Recibe la lista de comprobación de mantenimiento"
              description="Comprueba que la mensualidad cubre el trabajo real antes de presentarla."
              buttonLabel="Enviar lista de comprobación gratis"
            />
          </div>
        </section>

        <AdSlot placement="secondary" />
      </main>
      <Footer />
    </>
  );
}
