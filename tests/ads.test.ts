import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { createAdsConfig, getAdsTxtRecord } from '@/lib/ads';

describe('display advertising', () => {
  it('stays disabled until explicitly enabled with valid public ids', () => {
    expect(createAdsConfig({})).toMatchObject({ enabled: false });
    expect(createAdsConfig({
      NEXT_PUBLIC_ADSENSE_ENABLED: 'true',
      NEXT_PUBLIC_ADSENSE_CLIENT: 'invalid',
      NEXT_PUBLIC_ADSENSE_SLOT_PRIMARY: '1234567890',
    })).toMatchObject({ enabled: false, client: '' });
  });

  it('accepts valid manual placements and generates ads.txt', () => {
    expect(createAdsConfig({
      NEXT_PUBLIC_ADSENSE_ENABLED: 'true',
      NEXT_PUBLIC_ADSENSE_CLIENT: 'ca-pub-1234567890123456',
      NEXT_PUBLIC_ADSENSE_SLOT_PRIMARY: '1234567890',
    })).toMatchObject({ enabled: true });
    expect(getAdsTxtRecord('ca-pub-1234567890123456')).toContain('pub-1234567890123456');
  });

  it('places ads after the calculator in two manual bands', () => {
    const homepage = readFileSync(join(process.cwd(), 'app', 'page.tsx'), 'utf8');
    expect(homepage).toContain('<AdSlot placement="primary" />');
    expect(homepage).toContain('<AdSlot placement="secondary" />');
    expect(homepage.indexOf('<CalculatorForm')).toBeLessThan(homepage.indexOf('<AdSlot'));
  });
});
