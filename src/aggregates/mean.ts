/**
 * Calculates the arithmetic mean of the dataset.
 * @param values an array of numbers, representing the dataset
 * @returns the arithmetic mean of the dataset. If the array is empty, returns 0.
 */
export function mean(values: number[]) {
  const valuesCount = values.length;
  if (valuesCount === 0) return 0;

  const total = values.reduce((total, currentValue) => total + currentValue, 0);

  return total / valuesCount;
}