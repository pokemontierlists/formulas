import { describe, it, expect } from 'vitest';
import { mean } from '../../aggregates/mean.js';

describe('mean', () => {
  it('Correctly calculates an array of numbers', () => {
    expect(mean([4, 7, 13])).toBe(8);
    expect(mean([5, 2])).toBe(3.5);
    expect(mean([10, 10, 10, 10])).toBe(10);
  });

  it('Correctly calculates an array of single number', () => {
    expect(mean([1])).toBe(1);
  });

  it('Correctly calculates an empty array', () => {
    expect(mean([])).toBe(0);
  });
});