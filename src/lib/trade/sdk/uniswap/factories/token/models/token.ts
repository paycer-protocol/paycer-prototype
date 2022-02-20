import { ChainId } from '@usedapp/core'

export interface Token {
  chainId: ChainId;
  contractAddress: string;
  decimals: number;
  symbol: string;
  name: string;
}
