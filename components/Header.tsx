import Link from 'next/link';

export default function Header() {
  return (
    <header className="site-header">
      <div className="container header-inner">
        <Link href="/" className="brand">
          Cuanto Cobrar Mantenimiento Web
        </Link>

        <nav className="nav" aria-label="Navegacion principal">
          <Link href="/#calculadora">Calculadora</Link>
          <Link href="/cuanto-cobrar-mantenimiento-web-mensual">Guia</Link>
          <Link href="/#como-funciona">Como funciona</Link>
          <Link href="/#faq">FAQ</Link>
        </nav>
      </div>
    </header>
  );
}
