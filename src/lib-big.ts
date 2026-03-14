import Big from "big.js";

export const LibBig = Big();
export type LibBig = InstanceType<typeof LibBig>;;

LibBig.DP = 15;
LibBig.RM = Big.roundHalfUp;