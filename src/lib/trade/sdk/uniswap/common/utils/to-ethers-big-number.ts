import { BigNumber } from 'bignumber.js';
// @ts-ignore
import { BigNumber as EthersBigNumber } from 'ethers';

export function toEthersBigNumber(value: BigNumber): EthersBigNumber {
  return EthersBigNumber.from(value.toFixed());
}
