import { readFileSync } from 'node:fs';
import { join } from 'node:path';

describe('homepage accessibility', () => {
  it('keeps the main navigation concise and destinations unique', () => {
    const header = readFileSync(join(process.cwd(), 'components/Header.tsx'), 'utf8');
    const hrefs = Array.from(header.matchAll(/<a href="([^"]+)"/g)).map(([, href]) => href);

    expect(header).toContain('aria-label="Navegación principal"');
    expect(hrefs).toHaveLength(5);
    expect(new Set(hrefs).size).toBe(hrefs.length);
  });

  it('gives the homepage a labelled main region and clear calculator destination', () => {
    const homePage = readFileSync(join(process.cwd(), 'app/page.tsx'), 'utf8');

    expect(homePage).toContain('id="contenido-principal"');
    expect(homePage).toContain('href="#calculadora"');
    expect(homePage).toContain('aria-label="Resultado de la calculadora"');
  });
});
