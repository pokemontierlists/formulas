import { LibBig } from '../lib-big.js';
import { mean } from './mean.js';

/**
 * Calculates the variance of the dataset.
 * @param values an array of LibBig instances
 * @returns the variance as a LibBig instance. If the array is empty, returns 0.
 */
export function variance(values: LibBig[]): LibBig {
	const valuesCount = values.length;
	if (valuesCount === 0) return new LibBig(0);

	const average = mean(values);

	const totalSquareDiff = values.reduce((acc, value) => {
		// (value - average) ** 2
		const diff = value.minus(average);
		const squaredDiff = diff.pow(2);
		return acc.plus(squaredDiff);
	}, new LibBig(0));

	// total / valuesCount
	return totalSquareDiff.div(valuesCount);
}
