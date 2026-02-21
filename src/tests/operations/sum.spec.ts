import { describe, expect, it } from 'vitest';
import { sum } from '../../operations/sum.js';

describe('sum', () => {
	it('Calculates a sum of values correctly', () => {
		expect(sum([1, 2, 3])).toBe(6);
		expect(sum([0, 5, 4])).toBe(9);
		expect(sum([2.5, 3.4, 0.12])).toBeCloseTo(6.02);
		expect(sum([-1, 4, -2])).toBe(1);
	});

	it('Calculates a sum of single value correctly', () => {
		expect(sum([4])).toBe(4);
		expect(sum([0])).toBe(0);
		expect(sum([-3])).toBe(-3);
		expect(sum([-3.2])).toBe(-3.2);
	});

	it('Calculates a sum of no values correctly', () => {
		expect(sum([])).toBe(0);
	});
});
