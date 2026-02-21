export function determineTier(
	finalScore: number,
	meanScore: number,
	scoreStdev: number,
): Tiers {
	if (finalScore >= meanScore + 1.5 * scoreStdev) return Tiers.S;
	if (finalScore >= meanScore + 0.5 * scoreStdev) return Tiers.A;
	if (finalScore >= meanScore - 0.5 * scoreStdev) return Tiers.B;
	if (finalScore >= meanScore - 1.5 * scoreStdev) return Tiers.C;
	if (finalScore >= meanScore - 2.5 * scoreStdev) return Tiers.D;

	return Tiers.E;
}

export const Tiers = {
	S: 'S',
	A: 'A',
	B: 'B',
	C: 'C',
	D: 'D',
	E: 'E',
} as const;

export type Tiers = (typeof Tiers)[keyof typeof Tiers];
