import { readFileSync } from 'node:fs';
import { renderToStaticMarkup } from 'react-dom/server';
import Guide, { metadata } from '@/app/cuanto-cobrar-mantenimiento-web-mensual/page';
import Kit from '@/app/kit-mantenimiento-web/page';
import Home from '@/app/page';
import { calculateMaintenanceRetainer } from '@/lib/calculator';
import { formatCurrency } from '@/lib/format';
import { packageExampleInputs, packageExampleQuotes } from '@/lib/packageExamples';
import { siteConfig } from '@/lib/site';

function content(element: React.ReactElement) {
  const container = document.createElement('div');
  container.innerHTML = renderToStaticMarkup(element);
  return container;
}

describe('reproducible maintenance guide', () => {
  it('documents the same exact monetary result as the interactive engine', () => {
    expect(packageExampleQuotes.professional).toMatchObject({
      baseHourlyRate: 31.88,
      bufferedIncludedHours: 5,
      maintenanceFloorRetainer: 179.38,
      recommendedMonthlyRetainer: 206.28,
      vatAmount: 43.32,
      totalWithVAT: 249.60,
      clientsNeededForTarget: 14,
      maxClientsByHours: 16,
      hoursNeededForTarget: 70,
    });
    const rendered = content(<Guide />);
    for (const amount of [179.38, 206.28, 43.32, 249.60]) {
      expect(rendered.textContent).toContain(formatCurrency(amount));
    }
    expect(rendered.querySelectorAll('.guide-example-inputs > div')).toHaveLength(8);
  });

  it('calculates a larger scope with the existing engine instead of doubling prices', () => {
    const larger = calculateMaintenanceRetainer({
      ...packageExampleInputs.professional,
      includedHoursPerClient: 6,
    });
    expect(larger).toMatchObject({
      bufferedIncludedHours: 7.5,
      recommendedMonthlyRetainer: 297.92,
      maxClientsByHours: 10,
    });
    const rendered = content(<Guide />);
    expect(rendered.querySelector('#capacidad')?.textContent).toContain(formatCurrency(larger.recommendedMonthlyRetainer));
    expect(rendered.querySelector('#limites')?.textContent).toContain('no garantiza rentabilidad');
  });

  it('keeps its canonical URL, real responsibility and actual revision date', () => {
    expect(metadata.alternates?.canonical).toBe('/cuanto-cobrar-mantenimiento-web-mensual');
    const rendered = content(<Guide />);
    const schema = JSON.parse(rendered.querySelector('#mantenimiento-web-article-schema')!.textContent!);
    expect(schema.dateModified).toBe('2026-10-18');
    expect(schema.author).toEqual({ '@type': 'Person', name: siteConfig.ownerName });
    expect(rendered.querySelector('time')?.dateTime).toBe(schema.dateModified);
    expect(rendered.querySelector('.guide-byline')?.textContent).toContain(siteConfig.ownerName);
    expect(rendered.querySelectorAll('main')).toHaveLength(1);
    expect(rendered.querySelectorAll('h1')).toHaveLength(1);
  });

  it('uses visible FAQ answers as its structured data, including generated prices', () => {
    const rendered = content(<Guide />);
    const schema = JSON.parse(rendered.querySelector('#mantenimiento-web-faq-schema')!.textContent!);
    const answers = Array.from(rendered.querySelectorAll('.faq-item p')).map((item) => item.textContent);
    expect(schema.mainEntity.map((item: { acceptedAnswer: { text: string } }) => item.acceptedAnswer.text)).toEqual(answers);
    expect(answers[0]).toContain(formatCurrency(packageExampleQuotes.professional.recommendedMonthlyRetainer));
  });

  it('provides content and usable section links in server-rendered HTML', () => {
    const rendered = content(<Guide />);
    for (const link of rendered.querySelectorAll<HTMLAnchorElement>('.guide-jump-links a')) {
      expect(rendered.querySelector(link.hash)).not.toBeNull();
    }
    expect(rendered.querySelector('#metodo')?.textContent).toContain('precisión interna');
    expect(rendered.querySelector('#limites')?.textContent).toContain('no calcula tramos');
    expect(rendered.querySelector('#ejemplo-calculado')?.textContent).toContain('ficticios');
    expect(rendered.querySelector('a[href="https://wordpress.org/documentation/article/updating-wordpress/"]')).not.toBeNull();
    expect(rendered.querySelector('a[href="/kit-mantenimiento-web"]')).not.toBeNull();
    expect(rendered.querySelectorAll('form')).toHaveLength(0);
  });

  it('shows a compact, consistent example and a public resource on the homepage', () => {
    const rendered = content(<Home />);
    const example = rendered.querySelector('.maintenance-example-metrics');
    expect(example?.textContent).toContain(formatCurrency(packageExampleQuotes.professional.recommendedMonthlyRetainer));
    expect(example?.querySelectorAll(':scope > div')).toHaveLength(3);
    expect(rendered.querySelector('a[href="/kit-mantenimiento-web"]')?.textContent).toContain('sin dejar tu email');
    expect(rendered.querySelector('a[href="/cuanto-cobrar-mantenimiento-web-mensual#metodo"]')).not.toBeNull();
  });

  it('offers a direct public download with an operational task and extra approval record', () => {
    const rendered = content(<Kit />);
    const download = rendered.querySelector<HTMLAnchorElement>('a[download]');
    expect(download?.getAttribute('href')).toContain('/recursos/kit-mantenimiento-web.txt');
    const template = readFileSync('public/recursos/kit-mantenimiento-web.txt', 'utf8');
    for (const section of ['FICHA DEL SERVICIO', 'REGISTRO MENSUAL', 'PROPUESTA DE EXTRA', 'CIERRE DEL PERIODO']) {
      expect(template).toContain(section);
    }
    expect(template).toContain('No anotes contraseñas');
    expect(template).toContain('entorno aislado');
    expect(rendered.textContent).toContain('sin registro ni email');
  });
});
