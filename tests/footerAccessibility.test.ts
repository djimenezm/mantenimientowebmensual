import { readFileSync } from 'node:fs';
import { join } from 'node:path';

describe('footer accessibility', () => {
  it('makes the contact email visually distinguishable without relying only on color', () => {
    const footer = readFileSync(join(process.cwd(), 'components/Footer.tsx'), 'utf8');
    const styles = readFileSync(join(process.cwd(), 'app/globals.css'), 'utf8');

    expect(footer).toContain('footer-contact-link');
    expect(footer).toContain('Contacto: {siteConfig.contactEmail}');
    expect(styles).toMatch(/\.footer-contact-link\s*{[^}]*text-decoration:\s*underline/s);
    expect(styles).toMatch(/\.footer-contact-link\s*{[^}]*border:\s*1px solid/s);
    expect(styles).toMatch(/\.footer-contact-link\s*{[^}]*background:\s*#eef6ff/s);
  });
});
