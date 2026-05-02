import type { MetadataRoute } from 'next';
import { getSiteUrl } from '@/lib/site';

const routes = [
  '/',
  '/contrato-mantenimiento-web-mensual',
  '/cuanto-cobrar-mantenimiento-web-mensual',
  '/horas-incluidas-mantenimiento-web',
  '/kit-mantenimiento-web',
  '/mantenimiento-web-para-pymes',
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

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = getSiteUrl();
  const lastModified = new Date();

  return routes.map((route) => ({
    url: new URL(route, siteUrl).toString(),
    lastModified,
  }));
}
