import { ChainId } from '@usedapp/core'
import { ITokenProvider } from '../../types/investment'

export const paycerProvider: ITokenProvider = {
  USDC: {
    symbol: 'paycerUSDCPool',
    name: 'Paycer USDC Pool',
    decimals: 18,
    chainAddresses: {
      [ChainId.Mainnet]: '',
      [ChainId.Kovan]: '',
    }
  },
  DAI: {
    symbol: 'paycerDAIPool',
    name: 'Paycer DAI Pool',
    decimals: 18,
    chainAddresses: {
      [ChainId.Mainnet]: '',
      [ChainId.Kovan]: '',
    }
  },
  USDT: {
    symbol: 'paycerUSDTPool',
    name: 'Paycer USDT Pool',
    decimals: 18,
    chainAddresses: {
      [ChainId.Mainnet]: '',
      [ChainId.Kovan]: '',
    }
  },
}
