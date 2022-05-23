// @ts-nocheck
import BigNumber from 'bignumber.js';
// @ts-nocheck
import { parseEther as EthersParseEther } from 'ethers-utils';

/**
 * Convert a string value to wei
 * @param value The value
 */
export function parseEther(value: BigNumber): BigNumber {
  return new BigNumber(
    EthersParseEther(new BigNumber(value).toFixed()).toHexString()
  );
}
