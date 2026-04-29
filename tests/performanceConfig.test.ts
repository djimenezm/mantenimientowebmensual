import nextConfig from '@/next.config';

describe('performance config', () => {
  it('inlines tiny global CSS to avoid an extra render-blocking request', () => {
    expect(nextConfig.experimental?.inlineCss).toBe(true);
  });
});
