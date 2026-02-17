import { variance } from "./variance.js";

export function stdev(values: number[]) {
  return Math.sqrt(variance(values));
}