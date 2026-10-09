import type { CalculatorInputs, CalculatorResults } from "./types";

export function calculateTradeEconomics(input: CalculatorInputs): CalculatorResults {
  const discountRate = Math.min(Math.max(input.discountRate, 0), 0.95);
  const sellThroughRate = Math.min(Math.max(input.sellThroughRate, 0), 1);
  const processingRate = Math.min(Math.max(input.processingRate, 0), 1);
  const retailValue = input.wholesaleSpend / (1 - discountRate);
  const grossSales = retailValue * sellThroughRate;
  const costOfSoldInventory = input.wholesaleSpend * sellThroughRate;
  const processingFees = grossSales * processingRate;
  const estimatedProfit = grossSales - costOfSoldInventory - input.shippingCost - processingFees - input.otherCosts;
  const grossMargin = grossSales > 0 ? estimatedProfit / grossSales : 0;
  const contributionRate = discountRate - processingRate;
  const fixedCosts = input.shippingCost + input.otherCosts;
  const breakEvenSales = contributionRate > 0 ? fixedCosts / contributionRate : 0;
  const breakEvenUnits = input.averageRetailPrice > 0 ? Math.ceil(breakEvenSales / input.averageRetailPrice) : 0;
  const unsoldInventoryValue = retailValue * (1 - sellThroughRate);

  return { retailValue, grossSales, costOfSoldInventory, processingFees, estimatedProfit, grossMargin, breakEvenSales, breakEvenUnits, unsoldInventoryValue };
}
