import { max } from '../../aggregates/max.js';
import { mean } from '../../aggregates/mean.js';
import { stdev } from '../../aggregates/stdev.js';
import { sum } from '../../operations/sum.js';

export function calculateFinalScore(score: number, modifiersTotal: number) {
	return score + modifiersTotal;
}

export function calculateRawMatchupWeight(bestScores: number[]) {
	const deviation = stdev(bestScores);

	const maxScore = max(bestScores);
	const averageScore = mean(bestScores);

	return deviation * Math.max(1, maxScore - averageScore);
}

export function normalizeRawWeight(weight: number, rawWeights: number[]) {
	return weight / sum(rawWeights);
}

export function calculateMatchupScore(
	baseScore: number,
	normalizedMatchupWeight: number,
	healingItemsModifier: number,
) {
	return baseScore * normalizedMatchupWeight * healingItemsModifier;
}
