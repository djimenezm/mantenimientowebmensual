import { readStyles } from './readStyles';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';

describe('footer accessibility', () => {
  it('makes the contact email visually distinguishable without relying only on color', () => {
    const footer = readFileSync(join(process.cwd(), 'components/Footer.tsx'), 'utf8');
    const styles = readStyles();

    expect(footer).toContain('footer-contact-link');
    expect(footer).toContain('className="footer-contact"');
    expect(footer).toContain('className="footer-contact-label"');
    expect(footer).toContain('aria-label={`Enviar un correo a ${siteConfig.contactEmail}`}');
    expect(styles).toMatch(/\.footer-contact\s*{[^}]*border-left:\s*2px solid/s);
    expect(styles).toMatch(/\.footer-contact-link\s*{[^}]*overflow-wrap:\s*anywhere/s);
    expect(styles).toMatch(/\.footer-contact-link:hover,[\s\S]*text-decoration:\s*underline/s);
  });
});
