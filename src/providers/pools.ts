import { ChainId } from '@usedapp/core'
import { tokenProvider, ITokenProvider } from '@providers/tokens'

export interface IPoolProvider {
  [symbol: string]: {
    input: ITokenProvider[0],
    output: ITokenProvider[0],
    poolContract: ITokenProvider[0]
  }
}

export const poolProvider: IPoolProvider = {
  yvUSDC: {
    input: tokenProvider.USDC,
    output: {
      symbol: 'yvUSDC',
      name: 'USDC yVault',
      decimals: 6,
      chainAddresses: {
        [ChainId.Mainnet]: '0x5f18c75abdae578b483e5f43f12a39cf75b973a9',
        [ChainId.Kovan]: '',
      }
    }
  },
  yvDAI: {
    input: tokenProvider.DAI,
    output: {
      symbol: 'yvDAI',
      name: 'DAI yVault',
      decimals: 18,
      chainAddresses: {
        [ChainId.Mainnet]: '0x19d3364a399d251e894ac732651be8b0e4e85001',
        [ChainId.Kovan]: '',
      }
    }
  },
  yvUDST: {
    input: tokenProvider.UDST,
    output: {
      symbol: 'yvDAI',
      name: 'DAI yVault',
      decimals: 18,
      chainAddresses: {
        [ChainId.Mainnet]: '0x19d3364a399d251e894ac732651be8b0e4e85001',
        [ChainId.Kovan]: '',
      }
    }
  },
}
