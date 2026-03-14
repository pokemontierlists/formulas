import { LibBig } from '../lib-big.js';

export function sum(values: LibBig[]): LibBig {
	return values.reduce((total, current) => total.plus(current), new LibBig(0));
}
