import type { MetadataRoute } from 'next';
import { getSiteUrl } from '@/lib/site';

const routes = [
  '/',
  '/cuanto-cobrar-mantenimiento-web-mensual',
  '/kit-mantenimiento-web',
  '/mantenimiento-web-vs-bolsa-horas',
  '/paquetes-mantenimiento-web',
  '/precio-mantenimiento-wordpress',
  '/que-incluye-mantenimiento-web',
  '/aviso-legal',
  '/privacidad',
  '/cookies',
];

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = getSiteUrl();
  const lastModified = new Date();

  return routes.map((route) => ({
    url: new URL(route, siteUrl).toString(),
    lastModified,
  }));
}
