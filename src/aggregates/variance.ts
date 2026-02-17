import { mean } from "./mean.js";

export function variance(values: number[]) {
  const valuesCount = values.length;
  if (valuesCount === 0) return 0;

  const average = mean(values);

  const result = values.reduce((sum, value) => sum + Math.pow(value - average, 2), 0) / valuesCount;
  return result;
}