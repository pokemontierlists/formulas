import Big from 'big.js';
import { describe, expect, it } from 'vitest';
import { MaxByNoValuesError, max, maxBy } from '../../aggregates/max.js';

describe('Max functions', () => {
	describe('max', () => {
		it('Returns the highest value', () => {
			expect(max([new Big(1), new Big(2), new Big(3)]).toString()).toBe('3');
			expect(max([new Big(5), new Big(7), new Big(6)]).toString()).toBe('7');
			expect(max([new Big(10), new Big(9), new Big(8)]).toString()).toBe('10');
		});

		it('Returns correct value if only one number is passed', () => {
			expect(max([new Big(1)]).toString()).toBe('1');
		});

		it('Returns 0 if the array is empty', () => {
			const result = max([]);
			expect(result).toBeInstanceOf(Big);
			expect(result.toString()).toBe('0');
		});
	});

	describe('maxBy', () => {
		describe('General case', () => {
			it('Returns the value with the highest criteria', () => {
				const a = { count: 1 };
				const b = { count: 2 };
				const c = { count: 3 };

				expect(maxBy([a, b, c], (value) => new Big(value.count))).toBe(c);
			});

			it('Returns the first highest criteria if there is a tie', () => {
				const a = { count: 1 };
				const b = { count: 2 };
				const c = { count: 3 };
				const d = { count: 3 };

				expect(maxBy([a, b, c, d], (value) => new Big(value.count))).toBe(c);
			});

			it('Returns correct value if there is only one item', () => {
				const a = { count: 1 };
				expect(maxBy([a], (value) => new Big(value.count))).toBe(a);
			});

			it('Throws correct error if array is empty', () => {
				// Selector must return a Big even in the error case to satisfy TS
				expect(() => maxBy([], (value) => new Big(value as string))).toThrow(
					MaxByNoValuesError,
				);
			});
		});

		describe('Fallback comparator', () => {
			it('Returns the correct value in a tie', () => {
				const a = { count: 3, other: 1 };
				const b = { count: 3, other: 2 };
				const c = { count: 1, other: 9000.1 };

				expect(
					maxBy(
						[a, b, c],
						(value) => new Big(value.count),
						(v1, v2) => v1.other - v2.other,
					),
				).toBe(b);

				expect(
					maxBy(
						[a, b, c],
						(value) => new Big(value.count),
						(v1, v2) => v2.other - v1.other,
					),
				).toBe(a);
			});
		});
	});
});
