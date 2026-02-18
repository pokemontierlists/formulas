import { describe, expect, it } from 'vitest';
import { variance } from '../../aggregates/variance.js';

describe('variance', () => {
	it('Returns 0 for an empty array', () => {
		expect(variance([])).toBe(0);
	});

	it('Returns 0 for an array with a single value', () => {
		expect(variance([10])).toBe(0);
	});

	it('Returns the correct variance for a simple set of numbers', () => {
		const data = [2, 4, 4, 4, 5, 5, 7, 9];
		// Mean = 5
		// Squared differences: (2-5)^2=9, (4-5)^2=1, (4-5)^2=1, (4-5)^2=1, (5-5)^2=0, (5-5)^2=0, (7-5)^2=4, (9-5)^2=16
		// Sum = 32. Count = 8. Variance = 32 / 8 = 4.
		expect(variance(data)).toBe(4);
	});

	it('should handle negative numbers correctly', () => {
		const data = [-2, 2];
		// Mean = 0
		// Squared differences: (-2-0)^2 = 4, (2-0)^2 = 4
		// Sum = 8. Count = 2. Variance = 4.
		expect(variance(data)).toBe(4);
	});

	it('Returns 0 when all values are the same', () => {
		expect(variance([5, 5, 5, 5])).toBe(0);
	});

	it('Handles floating point numbers', () => {
		const result = variance([1.5, 2.5, 3.5]);
		// Mean = 2.5
		// Sum of squares: (1.5-2.5)^2 + (2.5-2.5)^2 + (3.5-2.5)^2 = 1 + 0 + 1 = 2
		// Variance = 2 / 3 = 0.666...
		expect(result).toBeCloseTo(0.666666666);
	});
});
