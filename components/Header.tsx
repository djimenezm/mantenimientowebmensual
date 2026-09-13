/* eslint-disable @next/next/no-html-link-for-pages */

export default function Header() {
  return (
    <header className="site-header">
      <div className="container header-inner">
        <a href="/" className="brand">
          Mantenimiento Web
        </a>

        <nav className="nav" aria-label="Navegación principal">
          <a href="/#calculadora">Calculadora</a>
          <a href="/#como-funciona">Qué obtienes</a>
          <a href="/que-incluye-mantenimiento-web">Qué incluye</a>
          <a href="/paquetes-mantenimiento-web">Paquetes</a>
        </nav>
      </div>
    </header>
  );
}
