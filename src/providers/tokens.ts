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
      [ChainId.Kovan]: '0xa1890D349D63b69b4CF96F8e462284D4D9d64a0C',
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
