// @ts-nocheck
import { BigNumber } from 'bignumber.js';
// @ts-nocheck
import { BigNumber as EthersBigNumber } from 'ethers';

export function toEthersBigNumber(value: BigNumber): EthersBigNumber {
  return EthersBigNumber.from(value.toFixed());
}
