import Big from 'big.js';

export function sum(values: Big[]): Big {
  return values.reduce((total, current) => total.plus(current), new Big(0));
}