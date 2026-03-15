import { describe, expect, it } from 'vitest';
import { max, maxBy } from '../../../../aggregates/max.js';
import { LibBig } from '../../../../lib-big.js';
import { sum } from '../../../../operations/sum.js';
import {
	calculateFinalScore,
	calculateMatchupScore,
	calculateRawMatchupWeight,
	normalizeRawWeight,
} from '../../../../tier-list/rb/score.js';
import { mockGlobalModifiers } from './mock-modifiers.js';
import { mockRoutes } from './mock-routes.js';
import { mockSubroutes } from './mock-subroutes.js';

function groupBy<T, K, E>(
	array: T[],
	keySelector: (item: T) => K,
	elementSelector: (item: T) => E,
): Map<K, E[]> {
	const map = new Map<K, E[]>();

	for (const item of array) {
		const key = keySelector(item);
		const element = elementSelector(item);

		if (!map.has(key)) {
			map.set(key, []);
		}

		map.get(key)?.push(element);
	}

	return map;
}

describe('Full-scale test implementation of the RB tier list model', () => {
	it('Calculates final scores correctly', () => {
		const trainerRawWeights = {
			brock: new LibBig(0),
			misty: new LibBig(0),
			ltSurge: new LibBig(0),
			erika: new LibBig(0),
			silphCoRival: new LibBig(0),
			koga: new LibBig(0),
			sabrina: new LibBig(0),
			blaine: new LibBig(0),
			giovanni: new LibBig(0),
			route22Rival: new LibBig(0),
			lorelei: new LibBig(0),
			bruno: new LibBig(0),
			agatha: new LibBig(0),
			lance: new LibBig(0),
			champion: new LibBig(0),
		};

		// Step 1: filter out all routes that are excluded
		const routesToConsider = mockRoutes.filter((route) => !route.excluded);

		// Step 2: filter out all matchups that are excluded
		const matchups = mockSubroutes.filter(
			(matchup) =>
				!matchup.excluded &&
				routesToConsider
					.map((route) => route.routeId)
					.includes(matchup.routeId),
		);

		// Step 3: calculate trainer weights
		const distinctPokemonByMatchups = Array.from(
			new Set(matchups.map((matchup) => matchup.pokemonId)),
		);

		for (const trainer of Object.keys(
			trainerRawWeights,
		) as (keyof typeof trainerRawWeights)[]) {
			const matchupsAgainstTrainer = matchups.filter(
				(matchup) => matchup.trainer === trainer,
			);

			const bestScores: LibBig[] = [];

			for (const pokemon of distinctPokemonByMatchups) {
				const scores = matchupsAgainstTrainer.filter(
					(matchup) => matchup.pokemonId === pokemon,
				);
				bestScores.push(max(scores.map((score) => new LibBig(score.score))));
			}

			const weight = calculateRawMatchupWeight(bestScores);
			trainerRawWeights[trainer] = weight;
		}

		const normalizedTrainerWeights = Object.entries(trainerRawWeights).reduce(
			(obj, [trainer, weight]) => {
				const result = normalizeRawWeight(
					weight,
					Object.values(trainerRawWeights),
				);
				return { ...obj, [trainer]: result };
			},
			{} as typeof trainerRawWeights,
		);

		// Step 4: Calculate each score with the weights and healing items modifiers
		const calculatedMatchups = matchups.map((matchup) => {
			const healingModifier = matchup.healingItemsCount
				? new LibBig(0.9).mul(matchup.healingItemsCount)
				: 1;
			const trainerWeight =
				normalizedTrainerWeights[
					matchup.trainer as keyof typeof normalizedTrainerWeights
				];

			const score = calculateMatchupScore(
				new LibBig(matchup.score),
				trainerWeight,
				new LibBig(healingModifier),
			);

			return { ...matchup, score };
		});

		// Step 5: apply TM modifier to each score
		const groups = groupBy(
			calculatedMatchups,
			(key) => key.routeId,
			(element) => element,
		);
		const routeScores = groups.entries().map(([key, route]) => ({
			id: key,
			pokemonId: route[0].pokemonId,
			score: sum(
				(groups.get(key) || []).map((group) => new LibBig(group.score)),
			).mul(
				new LibBig(
					mockRoutes.find((route) => route.routeId === key)?.tmsModifier || 0,
				),
			),
		}));

		// Step 6: get highest score for each Pokemon
		const highestScoresPerPokemon = Array.from(
			groupBy(
				Array.from(routeScores),
				(key) => key.pokemonId,
				(element) => element,
			),
		).map((route) => maxBy(route[1], (r) => r.score));

		// Step 7: pipe all modifiers to each Pokemon

		const scoresWithModifiers = highestScoresPerPokemon.map((score) => {
			const modifiers = mockGlobalModifiers.find(
				(g) => g.pokemonId === score.pokemonId,
			);

			const modifiersTotal =
				sum([
					new LibBig(modifiers?.expGroupModifier || 0),
					new LibBig(modifiers?.hms || 0),
				]);

			return {
				...score,
				score: calculateFinalScore(score.score, modifiersTotal),
			};
		});

		// Bulbasaur
		expect(
			scoresWithModifiers[0].score.toString().startsWith('3.3965543975'),
		).toBe(true);

		// Charmander
		expect(
			scoresWithModifiers[1].score.toString().startsWith('3.1157806524'),
		).toBe(true);

		// Squirtle
		expect(
			scoresWithModifiers[2].score.toString().startsWith('4.0856250935'),
		).toBe(true);

		// Caterpie
		expect(
			scoresWithModifiers[3].score.toString().startsWith('1.0621621160'),
		).toBe(true);
	});
});
