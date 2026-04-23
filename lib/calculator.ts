export type CalculatorInput = {
  targetMonthlyNet: number;
  monthlyFixedCosts: number;
  billableHoursPerMonth: number;
  includedHoursPerClient: number;
  incidentBufferPercent: number;
  directMonthlyClientCosts: number;
  taxReservePercent: number;
  profitMarginPercent: number;
  hasIVA: boolean;
};

export type CalculationResult = {
  targetMonthlyNet: number;
  monthlyFixedCosts: number;
  billableHoursPerMonth: number;
  includedHoursPerClient: number;
  bufferedIncludedHours: number;
  incidentBufferPercent: number;
  directMonthlyClientCosts: number;
  taxReservePercent: number;
  profitMarginPercent: number;
  preTaxIncomeTarget: number;
  monthlyRevenueTarget: number;
  baseHourlyRate: number;
  maintenanceFloorRetainer: number;
  recommendedMonthlyRetainer: number;
  vatAmount: number;
  totalWithVAT: number;
  effectiveHourlyRate: number;
};

function roundToTwo(value: number) {
  return Math.round(value * 100) / 100;
}

function safeNumber(value: number, fallback = 0) {
  return Number.isFinite(value) ? value : fallback;
}

export function calculateMaintenanceRetainer({
  targetMonthlyNet,
  monthlyFixedCosts,
  billableHoursPerMonth,
  includedHoursPerClient,
  incidentBufferPercent,
  directMonthlyClientCosts,
  taxReservePercent,
  profitMarginPercent,
  hasIVA,
}: CalculatorInput): CalculationResult {
  const safeTargetMonthlyNet = Math.max(0, safeNumber(targetMonthlyNet));
  const safeMonthlyFixedCosts = Math.max(0, safeNumber(monthlyFixedCosts));
  const safeBillableHoursPerMonth = Math.max(1, Math.round(safeNumber(billableHoursPerMonth, 1)));
  const safeIncludedHoursPerClient = Math.max(0.5, safeNumber(includedHoursPerClient, 0.5));
  const safeIncidentBufferPercent = Math.min(100, Math.max(0, safeNumber(incidentBufferPercent)));
  const safeDirectMonthlyClientCosts = Math.max(0, safeNumber(directMonthlyClientCosts));
  const safeTaxReservePercent = Math.min(99, Math.max(0, safeNumber(taxReservePercent)));
  const safeProfitMarginPercent = Math.min(100, Math.max(0, safeNumber(profitMarginPercent)));

  const taxReserveRate = safeTaxReservePercent / 100;
  const marginRate = safeProfitMarginPercent / 100;

  const preTaxIncomeTarget = safeTargetMonthlyNet / Math.max(0.01, 1 - taxReserveRate);
  const monthlyRevenueTarget = preTaxIncomeTarget + safeMonthlyFixedCosts;
  const baseHourlyRate = monthlyRevenueTarget / safeBillableHoursPerMonth;
  const bufferedIncludedHours = safeIncludedHoursPerClient * (1 + safeIncidentBufferPercent / 100);
  const maintenanceFloorRetainer =
    bufferedIncludedHours * baseHourlyRate + safeDirectMonthlyClientCosts;
  const recommendedMonthlyRetainer = maintenanceFloorRetainer * (1 + marginRate);
  const vatAmount = hasIVA ? recommendedMonthlyRetainer * 0.21 : 0;
  const totalWithVAT = recommendedMonthlyRetainer + vatAmount;
  const effectiveHourlyRate = recommendedMonthlyRetainer / bufferedIncludedHours;

  return {
    targetMonthlyNet: roundToTwo(safeTargetMonthlyNet),
    monthlyFixedCosts: roundToTwo(safeMonthlyFixedCosts),
    billableHoursPerMonth: safeBillableHoursPerMonth,
    includedHoursPerClient: roundToTwo(safeIncludedHoursPerClient),
    bufferedIncludedHours: roundToTwo(bufferedIncludedHours),
    incidentBufferPercent: roundToTwo(safeIncidentBufferPercent),
    directMonthlyClientCosts: roundToTwo(safeDirectMonthlyClientCosts),
    taxReservePercent: roundToTwo(safeTaxReservePercent),
    profitMarginPercent: roundToTwo(safeProfitMarginPercent),
    preTaxIncomeTarget: roundToTwo(preTaxIncomeTarget),
    monthlyRevenueTarget: roundToTwo(monthlyRevenueTarget),
    baseHourlyRate: roundToTwo(baseHourlyRate),
    maintenanceFloorRetainer: roundToTwo(maintenanceFloorRetainer),
    recommendedMonthlyRetainer: roundToTwo(recommendedMonthlyRetainer),
    vatAmount: roundToTwo(vatAmount),
    totalWithVAT: roundToTwo(totalWithVAT),
    effectiveHourlyRate: roundToTwo(effectiveHourlyRate),
  };
}
