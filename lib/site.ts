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
  brevoKitFormAction:
    'https://2caafd8d.sibforms.com/serve/MUIFAKJQegV7o9QbywL0B6sVP3BgGTFpNCUG1g6u2ktnFf8dguSPi1KRKd1VNhC0zGtjJJ_pc5hDsTPcNt-VJIk68J_NRGEuKAsLO2C0FTWhterAcDg_RZZ2HhcveG4jr6FXrMud1muQyyl44eJPmC29NQ7P8axNYFRufbEwnQ2BzbolM5LNa561XOUPCAs5SqrH5LQ6F4ViSvYUww==',
  country: 'Espana',
  themeColor: '#07110e',
  backgroundColor: '#fbfaf5',
} as const;

export function getSiteUrl() {
  return new URL(siteConfig.url);
}
