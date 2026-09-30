import { describe, expect, it } from 'vitest';
import { formatNumber } from '@/lib/format';

describe('formatNumber', () => {
  it('formats fractional hours using the Spanish decimal separator', () => {
    expect(formatNumber(2.5, 2)).toBe('2,5');
    expect(formatNumber(25.18, 2)).toBe('25,18');
  });
});
