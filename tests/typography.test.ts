import { readFileSync } from 'node:fs';
import { join } from 'node:path';

describe('typography', () => {
  it('uses distinct body and display typefaces through next/font', () => {
    const fonts = readFileSync(join(process.cwd(), 'lib/fonts.ts'), 'utf8');
    const layout = readFileSync(join(process.cwd(), 'app/layout.tsx'), 'utf8');
    const styles = readFileSync(join(process.cwd(), 'app/globals.css'), 'utf8');

    expect(fonts).toContain('Instrument_Sans');
    expect(fonts).toContain('Source_Serif_4');
    expect(layout).toContain('className={fontVariables}');
    expect(styles).toContain('font-family: var(--font-body');
    expect(styles).toContain('font-family: var(--font-display');
  });
});
