// @ts-nocheck
import BigNumber from 'bignumber.js';
// @ts-nocheck
import { formatEther as EthersFormatEther } from 'ethers/lib/utils';

/**
 * format ether from wei
 * @param wei The value
 */
export function formatEther(
  // tslint:disable-next-line: no-any
  wei: any
): BigNumber {
  return new BigNumber(EthersFormatEther(new BigNumber(wei).toFixed()));
}
