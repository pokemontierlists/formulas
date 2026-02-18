import { describe, expect, it } from 'vitest';
import { MaxByNoValuesError, max, maxBy } from '../../aggregates/max.js';

describe('Max functions', () => {
	describe('max', () => {
		it('Returns the highest value', () => {
			expect(max([1, 2, 3])).toBe(3);
			expect(max([5, 7, 6])).toBe(7);
			expect(max([10, 9, 8])).toBe(10);
		});

		it('Returns correct value if only one number is passed', () => {
			expect(max([1])).toBe(1);
		});

		it('Returns 0 if the array is empty', () => {
			expect(max([])).toBe(0);
		});
	});

	describe('maxBy', () => {
		describe('General case', () => {
			it('Returns the value with the highest criteria', () => {
				const a = { count: 1 };
				const b = { count: 2 };
				const c = { count: 3 };

				expect(maxBy([a, b, c], (value) => value.count)).toBe(c);
			});

			it('Returns the first highest criteria if there is a tie', () => {
				const a = { count: 1 };
				const b = { count: 2 };
				const c = { count: 3 };
				const d = { count: 3 };

				expect(maxBy([a, b, c, d], (value) => value.count)).toBe(c);
			});

			it('Returns correct value if there is only one item', () => {
				const a = { count: 1 };
				expect(maxBy([a], (value) => value.count)).toBe(a);
			});

			it('Throws correct error if array is empty', () => {
				expect(() => maxBy([], (value) => value)).toThrow(MaxByNoValuesError);
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
						(value) => value.count,
						(v1, v2) => v1.other - v2.other,
					),
				).toBe(b);
				expect(
					maxBy(
						[a, b, c],
						(value) => value.count,
						(v1, v2) => v1.other + v2.other,
					),
				).toBe(a);
			});
		});
	});
});
