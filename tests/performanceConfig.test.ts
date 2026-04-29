import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import nextConfig from '@/next.config';

describe('performance config', () => {
  it('inlines tiny global CSS to avoid an extra render-blocking request', () => {
    expect(nextConfig.experimental?.inlineCss).toBe(true);
  });

  it('does not ship Next browser polyfills for legacy browsers', () => {
    const configFile = readFileSync(join(process.cwd(), 'next.config.ts'), 'utf8');
    const noPolyfillsModule = readFileSync(
      join(process.cwd(), 'lib/no-browser-polyfills.ts'),
      'utf8',
    );

    expect(configFile).toContain('next/dist/build/polyfills/polyfill-module');
    expect(configFile).toContain('./lib/no-browser-polyfills.ts');
    expect(noPolyfillsModule.trim()).toBe('export {};');
  });

  it('keeps the homepage lead compact for mobile LCP', () => {
    const homePage = readFileSync(join(process.cwd(), 'app/page.tsx'), 'utf8');
    const globalStyles = readFileSync(join(process.cwd(), 'app/globals.css'), 'utf8');
    const leadMatch = homePage.match(/<p className="lead">([\s\S]*?)<\/p>/);
    const leadText = leadMatch?.[1].replace(/\s+/g, ' ').trim() ?? '';

    expect(leadText.length).toBeLessThanOrEqual(110);
    expect(globalStyles).toMatch(/\.lead\s*{[^}]*font-size:\s*1rem/s);
    expect(globalStyles).toMatch(/\.lead\s*{[^}]*line-height:\s*1\.55/s);
    expect(globalStyles).toMatch(/\.lead\s*{[^}]*max-width:\s*48ch/s);
  });
});
