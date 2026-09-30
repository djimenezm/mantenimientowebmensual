/* eslint-disable @next/next/no-html-link-for-pages */

export default function Header() {
  return (
    <header className="site-header">
      <div className="container header-inner">
        <a href="/" className="brand" aria-label="Mantenimiento Web, ir al inicio">
          <span className="brand-mark" aria-hidden="true">M</span>
          <span className="brand-wordmark">
            <strong>Mantenimiento Web</strong>
            <small>Cuotas de mantenimiento</small>
          </span>
        </a>

        <nav className="nav" aria-label="Navegación principal">
          <a href="/#como-funciona">Qué obtienes</a>
          <a href="/que-incluye-mantenimiento-web">Qué incluye</a>
          <a className="nav-secondary" href="/paquetes-mantenimiento-web">Paquetes</a>
          <a className="nav-cta" href="/#calculadora">Calcular ahora <span aria-hidden="true">↗</span></a>
        </nav>
      </div>
    </header>
  );
}
