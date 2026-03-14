import { LibBig } from '../lib-big.js';
import { variance } from './variance.js';

/**
 * Calculates the standard deviation of the dataset.
 * @param values an array of LibBig instances
 * @returns The square root of the variance as a LibBig instance.
 */
export function stdev(values: LibBig[]): LibBig {
	const v = variance(values);

	// Since big.js lacks .sqrt(), we convert to number to use Math.sqrt,
	// then wrap it back into LibBig.
	const result = Math.sqrt(Number(v.toString()));

	return new LibBig(result);
}
