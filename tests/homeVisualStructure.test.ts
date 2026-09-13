import { readFileSync } from 'node:fs';
import { join } from 'node:path';

describe('homepage visual structure', () => {
  it('uses the compact maintenance landing system', () => {
    const homePage = readFileSync(join(process.cwd(), 'app/page.tsx'), 'utf8');
    const styles = readFileSync(join(process.cwd(), 'app/globals.css'), 'utf8');

    expect(homePage).toContain('className="maintenance-landing"');
    expect(homePage).toContain('/images/maintenance-hero-v2.webp');
    expect(homePage).toContain('maintenance-calculator-shell');
    expect(homePage).toContain('maintenance-mini-strip');
    expect(homePage).toContain('maintenance-checklist-band');
    expect(styles).toMatch(/\.maintenance-hero\s*{[^}]*min-height:\s*\d+svh/s);
  });
});
