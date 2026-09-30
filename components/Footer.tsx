/* eslint-disable @next/next/no-html-link-for-pages */

import { siteConfig } from '@/lib/site';

const footerGroups = [
  {
    title: 'Calcular',
    links: [
      { href: '/#calculadora', label: 'Calculadora' },
      { href: '/que-incluye-mantenimiento-web', label: 'Qué incluye' },
      { href: '/precio-mantenimiento-wordpress', label: 'Precio WordPress' },
      { href: '/paquetes-mantenimiento-web', label: 'Paquetes' },
    ],
  },
  {
    title: 'Aplicar',
    links: [
      { href: '/horas-incluidas-mantenimiento-web', label: 'Horas incluidas' },
      { href: '/mantenimiento-web-para-pymes', label: 'Para pymes' },
      { href: '/mantenimiento-web-para-ecommerce', label: 'Para ecommerce' },
      { href: '/contrato-mantenimiento-web-mensual', label: 'Contrato mensual' },
    ],
  },
] as const;

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-invite-band">
        <div className="container footer-invite">
          <div>
            <span className="footer-invite-kicker">Una cuota sostenible</span>
            <p>Calcula el valor de cada mes.</p>
          </div>
          <a href="/#calculadora" className="footer-invite-link">Hacer el cálculo <span aria-hidden="true">↗</span></a>
        </div>
      </div>
      <div className="container footer-shell">
        <div className="footer-main">
          <div className="footer-brand-block">
            <a href="/" className="footer-brand">
              Mantenimiento Web
            </a>
            <p>Calcula una cuota mensual que proteja tu tiempo y tu margen.</p>
            <div className="footer-contact">
              <span className="footer-contact-label">Contacto</span>
              <a
                className="footer-contact-link"
                href={`mailto:${siteConfig.contactEmail}`}
                aria-label={`Enviar un correo a ${siteConfig.contactEmail}`}
              >
                {siteConfig.contactEmail}
              </a>
            </div>
          </div>

          <nav className="footer-nav" aria-label="Enlaces del pie de página">
            {footerGroups.map((group) => (
              <div className="footer-group" key={group.title}>
                <p className="footer-group-title">{group.title}</p>
                {group.links.map((link) => (
                  <a href={link.href} key={link.href}>
                    {link.label}
                  </a>
                ))}
              </div>
            ))}

            <div className="footer-group">
              <p className="footer-group-title">Herramientas</p>
              <a href="https://www.cuantofacturar.es?utm_source=mantenimientowebmensual&utm_medium=ecosystem-footer&utm_campaign=cross_navigation">
                Facturar
              </a>
              <a href="https://www.cuantopresupuestar.es?utm_source=mantenimientowebmensual&utm_medium=ecosystem-footer&utm_campaign=cross_navigation">
                Presupuestar
              </a>
              <a href="https://www.cuantocobrarlandingpage.es?utm_source=mantenimientowebmensual&utm_medium=ecosystem-footer&utm_campaign=cross_navigation">
                Landing pages
              </a>
              <a href="https://www.paneldeherramientas.es?utm_source=mantenimientowebmensual&utm_medium=ecosystem-footer&utm_campaign=cross_navigation">
                Panel
              </a>
            </div>
          </nav>
        </div>

        <div className="footer-bottom">
          <div className="footer-legal-copy">
            <p>© {new Date().getFullYear()} Mantenimiento Web · Titular: {siteConfig.ownerName}</p>
            <p>Herramienta orientativa. No constituye asesoramiento fiscal ni legal.</p>
          </div>
          <nav aria-label="Enlaces legales">
            <a href="/aviso-legal">Aviso legal</a>
            <a href="/privacidad">Privacidad</a>
            <a href="/cookies">Cookies</a>
          </nav>
        </div>
      </div>
    </footer>
  );
}
