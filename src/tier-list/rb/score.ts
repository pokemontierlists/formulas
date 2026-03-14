import { LibBig } from "../../lib-big.js";
import { max } from '../../aggregates/max.js';
import { mean } from '../../aggregates/mean.js';
import { stdev } from '../../aggregates/stdev.js';
import { sum } from '../../operations/sum.js';

export function calculateFinalScore(score: LibBig, modifiersTotal: LibBig): LibBig {
  return score.plus(modifiersTotal);
}

export function calculateRawMatchupWeight(bestScores: LibBig[]): LibBig {
  const deviation = stdev(bestScores);
  const maxScore = max(bestScores);
  const averageScore = mean(bestScores);

  // maxScore - averageScore
  const diff = maxScore.minus(averageScore);

  // Math.max(1, diff)
  const multiplier = diff.gt(1) ? diff : new LibBig(1);

  return deviation.times(multiplier);
}

export function normalizeRawWeight(weight: LibBig, rawWeights: LibBig[]): LibBig {
  const totalWeight = sum(rawWeights);
  
  // Guard against division by zero if the array is empty or all zeros
  if (totalWeight.eq(0)) return new LibBig(0);

  return weight.div(totalWeight);
}

export function calculateMatchupScore(
  baseScore: LibBig,
  normalizedMatchupWeight: LibBig,
  healingItemsModifier: LibBig,
): LibBig {
  return baseScore.times(normalizedMatchupWeight).times(healingItemsModifier);
}