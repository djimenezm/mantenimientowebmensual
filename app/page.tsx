import Image from 'next/image';
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

        <section className="maintenance-checklist-band" id="kit-mantenimiento-form">
          <div className="container maintenance-checklist-grid">
            <div className="maintenance-checklist-copy">
              <span className="eyebrow">Después del cálculo</span>
              <h2>Define el alcance antes de enviar la cuota.</h2>
              <p>Una checklist breve para separar tareas, urgencias y extras.</p>
            </div>

            <LeadMagnetForm
              source="home"
              title="Recibe la checklist de mantenimiento"
              description="Comprueba que la mensualidad cubre el trabajo real antes de presentarla."
              buttonLabel="Enviar checklist gratis"
            />
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
