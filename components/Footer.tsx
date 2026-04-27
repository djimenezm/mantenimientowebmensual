import Link from 'next/link';
import { siteConfig } from '@/lib/site';

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-inner">
        <div className="footer-copy">
          <p>
            Copyright {new Date().getFullYear()} {siteConfig.name}
          </p>
          <p>
            Titular: {siteConfig.ownerName} · Contacto:{' '}
            <a href={`mailto:${siteConfig.contactEmail}`}>{siteConfig.contactEmail}</a>
          </p>
          <p className="footer-note">
            Herramienta orientativa para cobrar mantenimiento web mensual. No constituye
            asesoramiento fiscal ni legal.
          </p>
        </div>
        <div className="footer-links">
          <Link href="/que-incluye-mantenimiento-web">Que incluye</Link>
          <Link href="/mantenimiento-wordpress-basico-profesional-avanzado">WordPress</Link>
          <Link href="/horas-incluidas-mantenimiento-web">Horas</Link>
          <Link href="/mantenimiento-web-para-pymes">Pymes</Link>
          <Link href="/mantenimiento-web-vs-bolsa-horas">Bolsa horas</Link>
          <Link href="/paquetes-mantenimiento-web">Paquetes</Link>
          <Link href="/contrato-mantenimiento-web-mensual">Contrato</Link>
          <a href="https://www.cuantofacturar.es?utm_source=mantenimientowebmensual&utm_medium=ecosystem-footer&utm_campaign=cross_navigation">
            Facturar
          </a>
          <a href="https://www.cuantopresupuestar.es?utm_source=mantenimientowebmensual&utm_medium=ecosystem-footer&utm_campaign=cross_navigation">
            Presupuestar
          </a>
          <a href="https://www.cuantocobrarlandingpage.es?utm_source=mantenimientowebmensual&utm_medium=ecosystem-footer&utm_campaign=cross_navigation">
            Landing pages
          </a>
          <a href="https://www.paneldeherramientas.es/precios-freelance?utm_source=mantenimientowebmensual&utm_medium=ecosystem-footer&utm_campaign=pricing_hub">
            Precios freelance
          </a>
          <a href="https://www.paneldeherramientas.es?utm_source=mantenimientowebmensual&utm_medium=ecosystem-footer&utm_campaign=cross_navigation">
            Panel
          </a>
          <Link href="/aviso-legal">Aviso legal</Link>
          <Link href="/privacidad">Privacidad</Link>
          <Link href="/cookies">Cookies</Link>
        </div>
      </div>
    </footer>
  );
}
