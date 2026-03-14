import { describe, expect, it } from 'vitest';
import { variance } from '../../aggregates/variance.js';
import { LibBig } from '../../lib-big.js';

describe('variance', () => {
	it('Returns 0 for an empty array', () => {
		const result = variance([]);
		expect(result).toBeInstanceOf(LibBig);
		expect(result.toString()).toBe('0');
	});

	it('Returns 0 for an array with a single value', () => {
		expect(variance([new LibBig(10)]).toString()).toBe('0');
	});

	it('Returns the correct variance for a simple set of numbers', () => {
		const data = [2, 4, 4, 4, 5, 5, 7, 9].map((n) => new LibBig(n));
		// Calculation: 32 / 8 = 4
		expect(variance(data).toString()).toBe('4');
	});

	it('should handle negative numbers correctly', () => {
		const data = [new LibBig(-2), new LibBig(2)];
		expect(variance(data).toString()).toBe('4');
	});

	it('Returns 0 when all values are the same', () => {
		const data = [5, 5, 5, 5].map((n) => new LibBig(n));
		expect(variance(data).toString()).toBe('0');
	});

	it('Handles floating point numbers', () => {
		const data = [1.5, 2.5, 3.5].map((n) => new LibBig(n));
		const result = variance(data);

		expect(result.toString()).toMatch(/^0\.6666666/);
	});
});
