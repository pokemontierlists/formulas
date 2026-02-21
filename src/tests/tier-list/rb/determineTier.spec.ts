import { describe, expect, it } from 'vitest';
import { determineTier, Tiers } from '../../../tier-list/rb/tier.js';

describe('determineTier (RB)', () => {
	it.each([
		[3.58, 2.94, 1.29, Tiers.B],
		[4.01, 2.94, 1.29, Tiers.A],
		[1.1, 2.94, 1.29, Tiers.C],
	])('Calculates final rank correctly based on provided values',
    (finalScore: number, mean: number, stdev: number, expectedTier: Tiers) => {
		const result = determineTier(finalScore, mean, stdev);
		expect(result).toBe(expectedTier);
	});
});
