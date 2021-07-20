import { ChainId } from '@usedapp/core'

export interface ITokenProvider {
  [symbol: string]: {
    symbol: string
    decimals: number
    chainAddresses: {
      [ChainId.Mainnet]: string
      [ChainId.Ropsten]: string
      [ChainId.Kovan]: string
      [ChainId.Rinkeby]: string
      [ChainId.Goerli]: string
      [ChainId.BSC]: string
      [ChainId.xDai]: string
      [ChainId.Polygon]: string
      [ChainId.Mumbai]: string
      [ChainId.Hardhat]: string
    }
  }
}

export const tokenProvider: ITokenProvider = {
  PCR: {
    symbol: 'PCR',
    decimals: 18,
    chainAddresses: {
      [ChainId.Mainnet]: '',
      [ChainId.Ropsten]: '',
      [ChainId.Kovan]: '0x7fc6761b9119f3d1448e1eed559b3a9b7205085c',
      [ChainId.Rinkeby]: '',
      [ChainId.Goerli]: '',
      [ChainId.BSC]: '',
      [ChainId.xDai]: '',
      [ChainId.Polygon]: '',
      [ChainId.Mumbai]: '',
      [ChainId.Hardhat]: '0x4826533B4897376654Bb4d4AD88B7faFD0C98528',
    }
  }
}
