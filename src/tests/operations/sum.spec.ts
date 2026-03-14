import { describe, expect, it } from 'vitest';
import Big from 'big.js';
import { sum } from '../../operations/sum.js';

describe('sum', () => {
  it('Calculates a sum of values correctly', () => {
    expect(sum([new Big(1), new Big(2), new Big(3)]).toString()).toBe('6');
    expect(sum([new Big(0), new Big(5), new Big(4)]).toString()).toBe('9');
    
    expect(sum([new Big(2.5), new Big(3.4), new Big(0.12)]).toString()).toBe('6.02');
    
    expect(sum([new Big(-1), new Big(4), new Big(-2)]).toString()).toBe('1');
  });

  it('Calculates a sum of single value correctly', () => {
    expect(sum([new Big(4)]).toFixed()).toBe('4');
    expect(sum([new Big(0)]).toFixed()).toBe('0');
    expect(sum([new Big(-3)]).toFixed()).toBe('-3');
    expect(sum([new Big(-3.2)]).toFixed()).toBe('-3.2');
  });

  it('Calculates a sum of no values correctly', () => {
    const result = sum([]);
    expect(result).toBeInstanceOf(Big);
    expect(result.toString()).toBe('0');
  });
});