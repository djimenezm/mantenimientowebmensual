import sitemap from '@/app/sitemap';

describe('sitemap', () => {
  it('only reports documented substantive content updates', () => {
    const updatedRoutes = Object.fromEntries(
      sitemap()
        .filter((entry) => entry.lastModified !== undefined)
        .map((entry) => [new URL(entry.url).pathname, entry.lastModified]),
    );

    expect(updatedRoutes).toEqual({
      '/': '2026-10-02',
      '/mantenimiento-web-para-ecommerce': '2026-10-02',
    });
  });

  it('includes the main indexable routes and excludes conversion-only pages', () => {
    const urls = sitemap().map((entry) => new URL(entry.url));
    const paths = urls.map((url) => url.pathname);

    urls.forEach((url) => expect(url.origin).toBe('https://www.mantenimientowebmensual.es'));
    expect(paths).toContain('/');
    expect(paths).toContain('/contrato-mantenimiento-web-mensual');
    expect(paths).toContain('/cuanto-cobrar-mantenimiento-web-mensual');
    expect(paths).toContain('/horas-incluidas-mantenimiento-web');
    expect(paths).toContain('/kit-mantenimiento-web');
    expect(paths).toContain('/mantenimiento-web-para-pymes');
    expect(paths).toContain('/mantenimiento-web-para-ecommerce');
    expect(paths).toContain('/cuanto-cobrar-mantenimiento-wordpress-mensual');
    expect(paths).toContain('/mantenimiento-wordpress-basico-profesional-avanzado');
    expect(paths).toContain('/mantenimiento-web-vs-bolsa-horas');
    expect(paths).toContain('/paquetes-mantenimiento-web');
    expect(paths).toContain('/precio-mantenimiento-wordpress');
    expect(paths).toContain('/que-incluye-mantenimiento-web');
    expect(paths).not.toContain('/gracias-kit-mantenimiento');
  });
});
