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

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = getSiteUrl();
  return routes.map((route) => ({
    url: new URL(route, siteUrl).toString(),
  }));
}
