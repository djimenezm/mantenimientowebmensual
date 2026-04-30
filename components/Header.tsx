/* eslint-disable @next/next/no-html-link-for-pages */

export default function Header() {
  return (
    <header className="site-header">
      <div className="container header-inner">
        <a href="/" className="brand">
          Cuanto Cobrar Mantenimiento Web
        </a>

        <nav className="nav" aria-label="Navegacion principal">
          <a href="/#calculadora">Calculadora</a>
          <a href="/cuanto-cobrar-mantenimiento-web-mensual">Guia</a>
          <a href="/que-incluye-mantenimiento-web">Que incluye</a>
          <a href="/mantenimiento-wordpress-basico-profesional-avanzado">WordPress</a>
          <a href="/horas-incluidas-mantenimiento-web">Horas</a>
          <a href="/mantenimiento-web-para-pymes">Pymes</a>
          <a href="/mantenimiento-web-vs-bolsa-horas">Bolsa horas</a>
          <a href="/paquetes-mantenimiento-web">Paquetes</a>
          <a href="/contrato-mantenimiento-web-mensual">Contrato</a>
          <a href="/#como-funciona">Como funciona</a>
          <a href="/#faq">FAQ</a>
        </nav>
      </div>
    </header>
  );
}
