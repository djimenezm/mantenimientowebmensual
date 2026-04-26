const productionUrl = 'https://www.mantenimientowebmensual.es';

export const siteConfig = {
  name: 'Cuanto Cobrar Mantenimiento Web',
  shortName: 'Mantenimiento Web',
  title: 'Calculadora para cobrar mantenimiento web mensual',
  description:
    'Calcula cuanto cobrar por mantenimiento web mensual a partir de tu objetivo neto, tus costes fijos, las horas incluidas, el buffer de incidencias y una reserva fiscal orientativa.',
  locale: 'es_ES',
  keywords: [
    'cuanto cobrar mantenimiento web mensual',
    'calculadora mantenimiento web',
    'precio mantenimiento web freelance',
    'cuanto cobrar soporte web mensual',
    'retainer mantenimiento web',
    'mantenimiento web mensual freelance',
  ],
  url: process.env.NODE_ENV === 'development' ? 'http://localhost:3003' : productionUrl,
  ownerName: 'Equipo de Cuanto Cobrar Mantenimiento Web',
  contactEmail: 'hola@mantenimientowebmensual.es',
  country: 'Espana',
  themeColor: '#145da0',
  backgroundColor: '#f6f8fb',
} as const;

export function getSiteUrl() {
  return new URL(siteConfig.url);
}
