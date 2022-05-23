// @ts-nocheck
import BigNumber from 'bignumber.js';
// @ts-nocheck
import { BigNumber as EthersBigNumber } from 'ethers';
// @ts-nocheck
import { hexlify as EthersHexlify } from 'ethers-utils';

/**
 * Convert to hex
 * @param value The value
 */
export function hexlify(value: BigNumber): string {
  return EthersHexlify(EthersBigNumber.from(value.toFixed()));
}
