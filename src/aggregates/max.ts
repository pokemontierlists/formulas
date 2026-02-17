import { errors } from "../constants/errors.js";

export function max(values: number[]) {
  if (values.length === 0) return 0;

  return values.reduce((highestValue, currentValue) => Math.max(highestValue, currentValue));
}

export class MaxByNoValuesError extends Error {
  constructor() {
    super(errors.maxBy.noValues);
  }
}

export function maxBy<T>(values: T[], by: (value: T) => number, fallbackComparator?: (value1: T, value2: T) => number) {
  const valuesCount = values.length;
  if (valuesCount === 0) throw new MaxByNoValuesError();

  let highest: T = values[0];

  for (let i = 1; i < valuesCount; i++) {
    const highestValue = by(highest);
    const currentValue = by(values[i]);

    if (currentValue > highestValue) {
      highest = values[i];
      continue;
    }

    if (currentValue < highestValue) continue;

    if (!fallbackComparator) continue;

    const comparison = fallbackComparator(highest, values[i]);

    if (comparison < 0) highest = values[i];
  }

  return highest;
}