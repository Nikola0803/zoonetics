import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

function calculate({ wholesaleSpend, discountRate, averageRetailPrice, sellThroughRate, shippingCost, processingRate, otherCosts }) {
  const retailValue = wholesaleSpend / (1 - discountRate);
  const grossSales = retailValue * sellThroughRate;
  const costOfSoldInventory = wholesaleSpend * sellThroughRate;
  const processingFees = grossSales * processingRate;
  const estimatedProfit = grossSales - costOfSoldInventory - shippingCost - processingFees - otherCosts;
  const grossMargin = grossSales > 0 ? estimatedProfit / grossSales : 0;
  const breakEvenSales = discountRate > processingRate ? (shippingCost + otherCosts) / (discountRate - processingRate) : 0;
  const breakEvenUnits = averageRetailPrice > 0 ? Math.ceil(breakEvenSales / averageRetailPrice) : 0;
  const unsoldInventoryValue = retailValue * (1 - sellThroughRate);
  return { retailValue, grossSales, costOfSoldInventory, processingFees, estimatedProfit, grossMargin, breakEvenSales, breakEvenUnits, unsoldInventoryValue };
}

const launch = calculate({ wholesaleSpend: 500, discountRate: 0.25, averageRetailPrice: 100, sellThroughRate: 1, shippingCost: 0, processingRate: 0, otherCosts: 0 });
assert.ok(Math.abs(launch.retailValue - 666.6666667) < 0.001);
assert.ok(Math.abs(launch.estimatedProfit - 166.6666667) < 0.001);
assert.ok(Math.abs(launch.grossMargin - 0.25) < 0.001);
assert.equal(launch.unsoldInventoryValue, 0);

const partial = calculate({ wholesaleSpend: 1500, discountRate: 0.3, averageRetailPrice: 100, sellThroughRate: 0.75, shippingCost: 75, processingRate: 0.029, otherCosts: 100 });
assert.ok(Math.abs(partial.grossSales - 1607.142857) < 0.001);
assert.ok(Math.abs(partial.costOfSoldInventory - 1125) < 0.001);
assert.ok(Math.abs(partial.unsoldInventoryValue - 535.714286) < 0.001);
assert.equal(partial.breakEvenUnits, 7);

const portal = await readFile(new URL("../src/app/trade/portal/page.tsx", import.meta.url), "utf8");
assert.ok(portal.includes('redirect("/account?tab=wholesale")'));
assert.ok(!portal.includes("Approved partner preview"));

const landing = await readFile(new URL("../src/app/trade/page.tsx", import.meta.url), "utf8");
for (const forbidden of ["Passive income", "Financial freedom", "Quit your job", "Guaranteed earnings", "Recruit your team"]) assert.ok(!landing.includes(forbidden));

console.log("EVLV Trade verification passed: formulas, authenticated portal redirect, and copy guard.");
