import { describe, expect, it } from 'vitest';
import {
  DEFAULT_FORM_VALUES,
  getNormalizedPastedValue,
  normalizeFieldValue,
  validateForm,
} from '@/lib/calculatorForm';

const numericValues = {
  targetMonthlyNet: DEFAULT_FORM_VALUES.targetMonthlyNet,
  monthlyFixedCosts: DEFAULT_FORM_VALUES.monthlyFixedCosts,
  billableHoursPerMonth: DEFAULT_FORM_VALUES.billableHoursPerMonth,
  includedHoursPerClient: DEFAULT_FORM_VALUES.includedHoursPerClient,
  incidentBufferPercent: DEFAULT_FORM_VALUES.incidentBufferPercent,
  directMonthlyClientCosts: DEFAULT_FORM_VALUES.directMonthlyClientCosts,
  taxReservePercent: DEFAULT_FORM_VALUES.taxReservePercent,
  profitMarginPercent: DEFAULT_FORM_VALUES.profitMarginPercent,
};

describe('calculator form values', () => {
  it('requires positive billable and included hours', () => {
    expect(validateForm(numericValues)).toEqual({});
    expect(validateForm({ ...numericValues, billableHoursPerMonth: '0' }))
      .toHaveProperty('billableHoursPerMonth');
    expect(validateForm({ ...numericValues, includedHoursPerClient: '0' }))
      .toHaveProperty('includedHoursPerClient');
  });

  it('keeps invalid text and normalizes a pasted amount', () => {
    expect(normalizeFieldValue('directMonthlyClientCosts', 'invalid')).toBe('invalid');
    expect(getNormalizedPastedValue('directMonthlyClientCosts', '2.500,50 €')).toBe('2500.5');
    expect(getNormalizedPastedValue('directMonthlyClientCosts', 'invalid')).toBeNull();
  });

  it('rejects percentages above their own limits', () => {
    expect(validateForm({ ...numericValues, incidentBufferPercent: '101' }))
      .toHaveProperty('incidentBufferPercent');
    expect(validateForm({ ...numericValues, taxReservePercent: '100' }))
      .toHaveProperty('taxReservePercent');
  });
});
