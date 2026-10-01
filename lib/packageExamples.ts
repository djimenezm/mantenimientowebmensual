import { calculateMaintenanceRetainer, type CalculatorInput } from './calculator';

const sharedInputs = {
  targetMonthlyNet: 1800,
  monthlyFixedCosts: 300,
  billableHoursPerMonth: 80,
  taxReservePercent: 20,
  profitMarginPercent: 15,
  hasIVA: true,
};

export const packageExampleInputs = {
  basic: {
    ...sharedInputs,
    includedHoursPerClient: 1.5,
    incidentBufferPercent: 20,
    directMonthlyClientCosts: 10,
  },
  professional: {
    ...sharedInputs,
    includedHoursPerClient: 4,
    incidentBufferPercent: 25,
    directMonthlyClientCosts: 20,
  },
  advanced: {
    ...sharedInputs,
    includedHoursPerClient: 8,
    incidentBufferPercent: 30,
    directMonthlyClientCosts: 35,
  },
  ecommerce: {
    ...sharedInputs,
    includedHoursPerClient: 6,
    incidentBufferPercent: 40,
    directMonthlyClientCosts: 35,
    profitMarginPercent: 25,
  },
} satisfies Record<string, CalculatorInput>;

export const packageExampleQuotes = {
  basic: calculateMaintenanceRetainer(packageExampleInputs.basic),
  professional: calculateMaintenanceRetainer(packageExampleInputs.professional),
  advanced: calculateMaintenanceRetainer(packageExampleInputs.advanced),
  ecommerce: calculateMaintenanceRetainer(packageExampleInputs.ecommerce),
};
