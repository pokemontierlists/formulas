import { describe, expect, it } from 'vitest';
import { mean } from '../../aggregates/mean.js';
import { LibBig } from '../../lib-big.js';

describe('mean', () => {
	it('Correctly calculates an array of numbers', () => {
		expect(
			mean([new LibBig(4), new LibBig(7), new LibBig(13)]).toString(),
		).toBe('8');
		expect(mean([new LibBig(5), new LibBig(2)]).toString()).toBe('3.5');
		expect(
			mean([
				new LibBig(10),
				new LibBig(10),
				new LibBig(10),
				new LibBig(10),
			]).toString(),
		).toBe('10');
	});

	it('Correctly calculates an array of single number', () => {
		expect(mean([new LibBig(1)]).toString()).toBe('1');
	});

	it('Correctly calculates an empty array', () => {
		const result = mean([]);
		expect(result).toBeInstanceOf(LibBig);
		expect(result.toString()).toBe('0');
	});

	it('Handles repeating decimals based on LibBig config', () => {
		const result = mean([new LibBig(1), new LibBig(0), new LibBig(0)]);
		expect(result.toString()).toMatch(/^0\.3+/);
	});
});
