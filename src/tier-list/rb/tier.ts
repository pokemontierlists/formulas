import { LibBig } from "../../lib-big.js";

export const Tiers = {
  S: 'S',
  A: 'A',
  B: 'B',
  C: 'C',
  D: 'D',
  E: 'E',
} as const;

export type Tiers = (typeof Tiers)[keyof typeof Tiers];

/**
 * Determines the tier based on standard deviation distance from the mean.
 */
export function determineTier(
  finalScore: LibBig,
  meanScore: LibBig,
  scoreStdev: LibBig,
): Tiers {
  // S: >= mean + 1.5 * stdev
  if (finalScore.gte(meanScore.plus(scoreStdev.times(1.5)))) return Tiers.S;
  
  // A: >= mean + 0.5 * stdev
  if (finalScore.gte(meanScore.plus(scoreStdev.times(0.5)))) return Tiers.A;
  
  // B: >= mean - 0.5 * stdev
  if (finalScore.gte(meanScore.minus(scoreStdev.times(0.5)))) return Tiers.B;
  
  // C: >= mean - 1.5 * stdev
  if (finalScore.gte(meanScore.minus(scoreStdev.times(1.5)))) return Tiers.C;
  
  // D: >= mean - 2.5 * stdev
  if (finalScore.gte(meanScore.minus(scoreStdev.times(2.5)))) return Tiers.D;

  return Tiers.E;
}