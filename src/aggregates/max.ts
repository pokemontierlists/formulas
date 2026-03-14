import Big from 'big.js';
import { errors } from '../constants/errors.js';

export function max(values: Big[]): Big {
  if (values.length === 0) return new Big(0);

  // Big.js doesn't have a static Math.max, so we use the .gt() comparison
  return values.reduce((highest, current) => 
    current.gt(highest) ? current : highest
  );
}

export class MaxByNoValuesError extends Error {
  constructor() {
    super(errors.maxBy.noValues);
  }
}

export function maxBy<T>(
  values: T[],
  by: (value: T) => Big, // Changed return type to Big
  fallbackComparator?: (value1: T, value2: T) => number,
): T {
  const valuesCount = values.length;
  if (valuesCount === 0) throw new MaxByNoValuesError();

  let highest: T = values[0];

  for (let i = 1; i < valuesCount; i++) {
    const highestValue = by(highest);
    const currentValue = by(values[i]);

    // Use .gt() for '>'
    if (currentValue.gt(highestValue)) {
      highest = values[i];
      continue;
    }

    // Use .lt() for '<'
    if (currentValue.lt(highestValue)) continue;

    // If they are equal (implied), use the fallback
    if (!fallbackComparator) continue;

    const comparison = fallbackComparator(highest, values[i]);

    if (comparison < 0) highest = values[i];
  }

  return highest;
}
