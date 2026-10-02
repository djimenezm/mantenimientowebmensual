import type { MetadataRoute } from 'next';
import { getSiteUrl } from '@/lib/site';

const routes = [
  '/',
  '/contrato-mantenimiento-web-mensual',
  '/cuanto-cobrar-mantenimiento-web-mensual',
  '/horas-incluidas-mantenimiento-web',
  '/kit-mantenimiento-web',
  '/mantenimiento-web-para-pymes',
  '/mantenimiento-web-para-ecommerce',
  '/cuanto-cobrar-mantenimiento-wordpress-mensual',
  '/mantenimiento-wordpress-basico-profesional-avanzado',
  '/mantenimiento-web-vs-bolsa-horas',
  '/paquetes-mantenimiento-web',
  '/precio-mantenimiento-wordpress',
  '/que-incluye-mantenimiento-web',
  '/aviso-legal',
  '/privacidad',
  '/cookies',
];

// Only substantive content updates belong here; deployments do not change these dates.
const lastContentUpdates: Record<string, string> = {
  '/': '2026-10-02',
  '/mantenimiento-web-para-ecommerce': '2026-10-02',
};

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = getSiteUrl();
  return routes.map((route) => ({
    url: new URL(route, siteUrl).toString(),
    ...(lastContentUpdates[route] ? { lastModified: lastContentUpdates[route] } : {}),
  }));
}
