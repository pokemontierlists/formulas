import { describe, it, expect } from "vitest";
import { stdev } from "../../aggregates/stdev.js";

describe('stdev', () => {
  it('Returns 0 for an empty array', () => {
    // Math.sqrt(0) is 0
    expect(stdev([])).toBe(0);
  });

  it('Returns 0 for an array where all values are identical', () => {
    expect(stdev([10, 10, 10])).toBe(0);
  });

  it('Returns the correct standard deviation for a set of numbers', () => {
    const data = [2, 4, 4, 4, 5, 5, 7, 9];
    // From previous test: Variance = 4
    // Standard Deviation = sqrt(4) = 2
    expect(stdev(data)).toBe(2);
  });

  it('Handles decimal results using toBeCloseTo', () => {
    const data = [10, 12, 23, 23, 16, 23, 21, 16];
    // Mean = 18
    // Sum of squares = 192
    // Population Variance = 192 / 8 = 24
    // Stdev = sqrt(24) ≈ 4.898979
    expect(stdev(data)).toBeCloseTo(4.898979, 4);
  });

  it('Returns the absolute value of the difference for two numbers', () => {
    const data = [10, 20];
    // Mean = 15. Diff from mean = 5. Variance = (25 + 25) / 2 = 25.
    // Stdev = 5.
    expect(stdev(data)).toBe(5);
  });
});