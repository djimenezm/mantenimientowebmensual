import type { Metadata } from 'next';
import LegalShell from '@/components/LegalShell';
import { siteConfig } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Política de cookies',
  description: `Informacion sobre el uso de cookies en ${siteConfig.name}.`,
  alternates: {
    canonical: '/cookies',
  },
};

export default function CookiesPage() {
  return (
    <LegalShell>
      <h1>Política de cookies</h1>
      <div className="legal-card">
        <p>
          Contacto: <a href={`mailto:${siteConfig.contactEmail}`}>{siteConfig.contactEmail}</a>
        </p>
      </div>

      <section className="legal-section">
        <h2>Estado actual del sitio</h2>
        <p>
          En esta versión no se utilizan cookies propias de publicidad, perfilado ni medición
          avanzada configuradas por el titular del sitio. La web usa Vercel Web Analytics para
          obtener una medición agregada del uso del sitio, incluidos eventos básicos de uso de la
          calculadora.
        </p>
      </section>

      <section className="legal-section">
        <h2>Cookies técnicas</h2>
        <p>
          El funcionamiento básico de la web puede requerir elementos técnicos imprescindibles del
          navegador, del sistema de caché o del proveedor de hosting para servir la página de forma
          segura y estable. Además, la medición básica implantada con Vercel Analytics está pensada
          para trabajar sin cookies propias del sitio y sin crear perfiles comerciales del usuario.
        </p>
      </section>

      <section className="legal-section">
        <h2>Cambios futuros</h2>
        <p>
          La infraestructura para mostrar publicidad de Google AdSense permanece desactivada. Antes
          de activarla se deberá configurar una plataforma de consentimiento admitida por Google y
          actualizar esta política con los proveedores, finalidades y opciones disponibles.
        </p>
      </section>
    </LegalShell>
  );
}
