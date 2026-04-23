import { describe, expect, it } from 'vitest';
import { calculateMaintenanceRetainer } from '@/lib/calculator';

describe('calculateMaintenanceRetainer', () => {
  it('calculates a monthly retainer from the monthly target and service inputs', () => {
    const result = calculateMaintenanceRetainer({
      targetMonthlyNet: 1800,
      monthlyFixedCosts: 300,
      billableHoursPerMonth: 80,
      includedHoursPerClient: 2,
      incidentBufferPercent: 25,
      directMonthlyClientCosts: 15,
      taxReservePercent: 20,
      profitMarginPercent: 15,
      hasIVA: true,
    });

    expect(result.preTaxIncomeTarget).toBe(2250);
    expect(result.monthlyRevenueTarget).toBe(2550);
    expect(result.baseHourlyRate).toBe(31.88);
    expect(result.bufferedIncludedHours).toBe(2.5);
    expect(result.maintenanceFloorRetainer).toBe(94.69);
    expect(result.recommendedMonthlyRetainer).toBe(108.89);
    expect(result.vatAmount).toBe(22.87);
    expect(result.totalWithVAT).toBe(131.76);
    expect(result.effectiveHourlyRate).toBe(43.56);
  });

  it('does not add IVA when the maintenance fee does not repercute it', () => {
    const result = calculateMaintenanceRetainer({
      targetMonthlyNet: 1800,
      monthlyFixedCosts: 300,
      billableHoursPerMonth: 80,
      includedHoursPerClient: 2,
      incidentBufferPercent: 10,
      directMonthlyClientCosts: 0,
      taxReservePercent: 20,
      profitMarginPercent: 0,
      hasIVA: false,
    });

    expect(result.vatAmount).toBe(0);
    expect(result.totalWithVAT).toBe(result.recommendedMonthlyRetainer);
  });

  it('sanitizes invalid values before calculating', () => {
    const result = calculateMaintenanceRetainer({
      targetMonthlyNet: Number.NaN,
      monthlyFixedCosts: -50,
      billableHoursPerMonth: 0,
      includedHoursPerClient: Number.NaN,
      incidentBufferPercent: -20,
      directMonthlyClientCosts: -10,
      taxReservePercent: 120,
      profitMarginPercent: -5,
      hasIVA: false,
    });

    expect(result).toEqual(
      expect.objectContaining({
        targetMonthlyNet: 0,
        monthlyFixedCosts: 0,
        billableHoursPerMonth: 1,
        includedHoursPerClient: 0.5,
        bufferedIncludedHours: 0.5,
        incidentBufferPercent: 0,
        directMonthlyClientCosts: 0,
        taxReservePercent: 99,
        profitMarginPercent: 0,
        preTaxIncomeTarget: 0,
        monthlyRevenueTarget: 0,
        baseHourlyRate: 0,
        maintenanceFloorRetainer: 0,
        recommendedMonthlyRetainer: 0,
        vatAmount: 0,
        totalWithVAT: 0,
        effectiveHourlyRate: 0,
      }),
    );
  });
});
