import { describe, expect, it } from 'vitest';
import { determineTier, Tiers } from '../../../tier-list/rb/tier.js';

describe('determineTier (RB)', () => {
	const mean = 2.95;
	const stdev = 1.13;

	it.each([
		[3.4, Tiers.B],
		[4.09, Tiers.A],
		[3.12, Tiers.B],
		[1.06, Tiers.D],
	])('Calculates final rank correctly based on provided values', (finalScore: number, expectedTier: Tiers) => {
		const result = determineTier(finalScore, mean, stdev);
		expect(result).toBe(expectedTier);
	});
});
