import { describe, expect, it } from 'vitest';
import { stdev } from '../../aggregates/stdev.js';
import { LibBig } from '../../lib-big.js';

describe('stdev', () => {
	it('Returns 0 for an empty array', () => {
		const result = stdev([]);
		expect(result).toBeInstanceOf(LibBig);
		expect(result.toString()).toBe('0');
	});

	it('Returns 0 for an array where all values are identical', () => {
		const data = [10, 10, 10].map((n) => new LibBig(n));
		expect(stdev(data).toString()).toBe('0');
	});

	it('Returns the correct standard deviation for a set of numbers', () => {
		const data = [2, 4, 4, 4, 5, 5, 7, 9].map((n) => new LibBig(n));
		expect(stdev(data).toString()).toBe('2');
	});

	it('Handles decimal results using string matching', () => {
		const data = [10, 12, 23, 23, 16, 23, 21, 16].map((n) => new LibBig(n));
		const result = stdev(data).toString();

		expect(result.startsWith('4.898979')).toBe(true);
	});

	it('Returns the absolute value of the difference for two numbers', () => {
		const data = [new LibBig(10), new LibBig(20)];
		expect(stdev(data).toString()).toBe('5');
	});
});
