import sitemap from '@/app/sitemap';

describe('sitemap', () => {
  it('includes the main indexable routes and excludes conversion-only pages', () => {
    const urls = sitemap().map((entry) => new URL(entry.url));
    const paths = urls.map((url) => url.pathname);

    urls.forEach((url) => expect(url.origin).toBe('https://www.mantenimientowebmensual.es'));
    expect(paths).toContain('/');
    expect(paths).toContain('/contrato-mantenimiento-web-mensual');
    expect(paths).toContain('/cuanto-cobrar-mantenimiento-web-mensual');
    expect(paths).toContain('/kit-mantenimiento-web');
    expect(paths).toContain('/mantenimiento-web-vs-bolsa-horas');
    expect(paths).toContain('/paquetes-mantenimiento-web');
    expect(paths).toContain('/precio-mantenimiento-wordpress');
    expect(paths).toContain('/que-incluye-mantenimiento-web');
    expect(paths).not.toContain('/gracias-kit-mantenimiento');
  });
});
