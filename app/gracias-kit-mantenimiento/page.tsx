import type { Metadata } from 'next';
import Link from 'next/link';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import { siteConfig } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Gracias por apuntarte al kit',
  description: `Confirmacion de interes en el kit de mantenimiento web de ${siteConfig.name}.`,
  robots: {
    index: false,
    follow: false,
  },
};

export default function GraciasKitMantenimientoPage() {
  return (
    <main>
      <Header />

      <section className="hero">
        <div className="container text-block">
          <span className="eyebrow">Todo correcto</span>
          <h1>Gracias por apuntarte al kit de mantenimiento web</h1>
          <p className="lead">
            Ya hemos recibido tu solicitud. Cuando publiquemos el kit con checklist, estructura de
            cuota mensual y materiales de apoyo, te avisaremos en ese email.
          </p>
          <div className="disclaimer-box">
            <strong>Nota:</strong> si es la primera vez que usas este formulario, puede que el
            servicio de captura pida una confirmacion inicial en el buzon de destino.
          </div>
          <div className="guide-cta">
            <Link href="/" className="primary-button">
              Volver a la calculadora
            </Link>
            <Link href="/precio-mantenimiento-wordpress" className="primary-button">
              Ver la guia de WordPress
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
