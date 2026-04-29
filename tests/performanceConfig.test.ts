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
});
