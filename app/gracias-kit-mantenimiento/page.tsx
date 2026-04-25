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
            Ya hemos recibido tu solicitud. Acabas de desbloquear el kit con checklist mensual,
            estructura de cuota y ejemplo de alcance para vender mejor mantenimiento recurrente.
          </p>
          <div className="disclaimer-box">
            <strong>Nota:</strong> tambien deberias recibir un email con el acceso directo al kit.
            Si no lo ves, revisa spam o promociones.
          </div>
          <div className="guide-cta">
            <Link href="/kit-mantenimiento-web" className="primary-button">
              Abrir el kit
            </Link>
            <Link href="/" className="primary-button">
              Volver a la calculadora
            </Link>
            <Link href="/recursos/kit-mantenimiento-web.txt" className="primary-button">
              Descargar version en texto
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
