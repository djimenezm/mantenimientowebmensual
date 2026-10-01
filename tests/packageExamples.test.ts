import { describe, expect, it } from 'vitest';
import { calculateMaintenanceRetainer } from '../lib/calculator';
import { packageExampleInputs, packageExampleQuotes } from '../lib/packageExamples';

describe('editorial maintenance packages', () => {
  it('uses the same calculation as the interactive form', () => {
    for (const plan of ['basic', 'professional', 'advanced', 'ecommerce'] as const) {
      expect(packageExampleQuotes[plan]).toEqual(calculateMaintenanceRetainer(packageExampleInputs[plan]));
      expect(packageExampleQuotes[plan].bufferedIncludedHours)
        .toBeGreaterThan(packageExampleInputs[plan].includedHoursPerClient);
    }
  });

  it('prices the distinct scopes in ascending order', () => {
    expect(packageExampleQuotes.basic.recommendedMonthlyRetainer)
      .toBeLessThan(packageExampleQuotes.professional.recommendedMonthlyRetainer);
    expect(packageExampleQuotes.professional.recommendedMonthlyRetainer)
      .toBeLessThan(packageExampleQuotes.advanced.recommendedMonthlyRetainer);
    expect(packageExampleQuotes.ecommerce.recommendedMonthlyRetainer)
      .toBeGreaterThan(packageExampleQuotes.professional.recommendedMonthlyRetainer);
  });
});
