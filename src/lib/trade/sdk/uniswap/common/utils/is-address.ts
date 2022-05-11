import { ethers } from 'ethers';
import { removeEthFromContractAddress } from '../tokens/eth';

export function isAddress(address: string): boolean {
  //@ts-ignore
  return ethers.utils.isAddress(removeEthFromContractAddress(address));
}
