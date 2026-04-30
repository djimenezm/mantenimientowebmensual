import { siteConfig } from '@/lib/site';

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-inner">
        <div className="footer-copy">
          <p>
            Copyright {new Date().getFullYear()} {siteConfig.name}
          </p>
          <p>Titular: {siteConfig.ownerName}</p>
          <p className="footer-contact-row">
            <a className="footer-contact-link" href={`mailto:${siteConfig.contactEmail}`}>
              Contacto: {siteConfig.contactEmail}
            </a>
          </p>
          <p className="footer-note">
            Herramienta orientativa para cobrar mantenimiento web mensual. No constituye
            asesoramiento fiscal ni legal.
          </p>
        </div>
        <div className="footer-links">
          <a href="/que-incluye-mantenimiento-web">Que incluye</a>
          <a href="/mantenimiento-wordpress-basico-profesional-avanzado">WordPress</a>
          <a href="/horas-incluidas-mantenimiento-web">Horas</a>
          <a href="/mantenimiento-web-para-pymes">Pymes</a>
          <a href="/mantenimiento-web-vs-bolsa-horas">Bolsa horas</a>
          <a href="/paquetes-mantenimiento-web">Paquetes</a>
          <a href="/contrato-mantenimiento-web-mensual">Contrato</a>
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
          <a href="/aviso-legal">Aviso legal</a>
          <a href="/privacidad">Privacidad</a>
          <a href="/cookies">Cookies</a>
        </div>
      </div>
    </footer>
  );
}
