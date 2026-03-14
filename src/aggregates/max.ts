import Big from 'big.js';
import { errors } from '../constants/errors.js';
import { LibBig } from '../lib-big.js';

export function max(values: LibBig[]): LibBig {
	if (values.length === 0) return new LibBig(0);

	return values.reduce(
		(highest, current) => (current.gt(highest) ? current : highest),
		new LibBig(Number.MIN_SAFE_INTEGER),
	);
}

export class MaxByNoValuesError extends Error {
	constructor() {
		super(errors.maxBy.noValues);
	}
}

export function maxBy<T>(
	values: T[],
	by: (value: T) => LibBig, // Changed return type to Big
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
