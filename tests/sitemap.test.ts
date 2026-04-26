import sitemap from '@/app/sitemap';

describe('sitemap', () => {
  it('includes the main indexable routes and excludes conversion-only pages', () => {
    const paths = sitemap().map((entry) => new URL(entry.url).pathname);

    expect(paths).toContain('/');
    expect(paths).toContain('/cuanto-cobrar-mantenimiento-web-mensual');
    expect(paths).toContain('/kit-mantenimiento-web');
    expect(paths).toContain('/paquetes-mantenimiento-web');
    expect(paths).toContain('/precio-mantenimiento-wordpress');
    expect(paths).not.toContain('/gracias-kit-mantenimiento');
  });
});
