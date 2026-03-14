import { LibBig } from '../lib-big.js';

/**
 * Calculates the arithmetic mean of the dataset.
 * @param values an array of Big instances, representing the dataset
 * @returns the arithmetic mean of the dataset as a Big instance. If the array is empty, returns 0.
 */
export function mean(values: LibBig[]): LibBig {
  const valuesCount = values.length;
  if (valuesCount === 0) return new LibBig(0);

  const total = values.reduce(
    (acc, current) => acc.plus(current), 
    new LibBig(0)
  );

  return total.div(valuesCount);
}