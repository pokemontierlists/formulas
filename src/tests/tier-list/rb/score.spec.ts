import { describe, expect, it } from 'vitest';
import { LibBig } from '../../../lib-big.js';
import {
	calculateFinalScore,
	calculateMatchupScore,
	calculateRawMatchupWeight,
	normalizeRawWeight,
} from '../../../tier-list/rb/score.js';

describe('score formulas (RB)', () => {
	describe('calculateFinalScore', () => {
		it.each([
			[3.15, 0.25, '3.4'],
			[2.77, 0.35, '3.12'],
			[3.64, 0.45, '4.09'],
			[1.06, 0, '1.06'],
		])('Calculates correct final score: %s + %s', (score, modifiers, expected) => {
			const result = calculateFinalScore(
				new LibBig(score),
				new LibBig(modifiers),
			);
			expect(result.toString()).toBe(expected);
		});
	});

	describe('calculateMatchupScore', () => {
		it.each([
			[5, 0.134821800674769, 1, '0.674109003373845'], // Note: native 0.67 was likely a rounded expectation
			[2.5, 0.099517674324276, 1, '0.24879418581069'],
			[5, 0, 1, '0'],
			[3, 0.117114534688113, 0.9, '0.3162092436579051'],
		])('Calculates correct matchup score', (base, weight, mod, expected) => {
			const result = calculateMatchupScore(
				new LibBig(base),
				new LibBig(weight),
				new LibBig(mod),
			);
			// Using startsWith because of the high precision of big.js vs previous rounded number
			expect(result.toString().startsWith(expected.substring(0, 10))).toBe(
				true,
			);
		});
	});

	describe('calculateRawMatchupWeight', () => {
		const brockScores = [5, 2, 5, 0];
		const mistyScores = [5, 1, 5, 1.5];
		const brunoScores = [5, 5, 5, 5];

		it.each([
			[brockScores, '4.242640687119285'],
			[mistyScores, '3.53121543124673'],
			[brunoScores, '0'],
		])('Calculates weight: %s', (scores, expected) => {
			const result = calculateRawMatchupWeight(
				scores.map((s) => new LibBig(s)),
			);
			expect(result.toString().startsWith(expected.substring(0, 10))).toBe(
				true,
			);
		});
	});

	describe('normalizeRawWeight', () => {
		const rawWeights = [
			'4.24264068711929',
			'3.53121543124673',
			'3.53553390593274',
			'1.91213231759729',
			'1.4320549046737',
			'0.64951905283833',
			'1.68286400222953',
			'2.24755726776316',
			'0.0',
			'1.55960669621382',
			'2.54950975679639',
			'0.0',
			'2.68254448646709',
			'3.13167256380277',
			'2.31165525111337',
		];

		const expectedWeights = [
			'0.134821800674769',
			'0.112214268923742',
			'0.112351500562307',
			'0.060763364422908',
			'0.045507558888834',
			'0.020640288616025',
			'0.053477721024117',
			'0.071422432467464',
			'0',
			'0.04956087461433',
			'0.081017819230544',
			'0',
			'0.085245370684745',
			'0.099517674324276',
			'0.073459325565938',
		];

		const bigRawWeights = rawWeights.map((w) => new LibBig(w));

		it.each(
			rawWeights.map((w, i) => [w, expectedWeights[i]]),
		)('Normalizes %s to %s', (rawWeight, expected) => {
			const result = normalizeRawWeight(new LibBig(rawWeight), bigRawWeights);
			expect(result.toString()).toBe(expected);
		});
	});
});
