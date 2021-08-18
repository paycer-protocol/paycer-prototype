import { ChainId } from '@usedapp/core'
import { ITokenProvider } from '../../types/investment'

export const paycerProvider: ITokenProvider = {
  pUSDC: {
    symbol: 'pUSDC',
    name: 'Paycer USDC Pool',
    decimals: 18,
    chainAddresses: {
      [ChainId.Mainnet]: '',
      [ChainId.Kovan]: '',
    }
  },
  pDAI: {
    symbol: 'pDAI',
    name: 'Paycer DAI Pool',
    decimals: 18,
    chainAddresses: {
      [ChainId.Mainnet]: '',
      [ChainId.Kovan]: '',
    }
  },
  pUSDT: {
    symbol: 'pUSDT',
    name: 'Paycer USDT Pool',
    decimals: 18,
    chainAddresses: {
      [ChainId.Mainnet]: '',
      [ChainId.Kovan]: '',
    }
  },
}
