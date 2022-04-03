import { ChainId } from '@usedapp/core'
import { ITokenProvider } from '../../types/investment'

export const paycerProvider: ITokenProvider = {
  pUSDC: {
    symbol: 'pUSDC',
    name: 'Paycer USDC Pool',
    decimals: 18,
    chainAddresses: {
      [ChainId.Mainnet]: ''
    }
  },
  pDAI: {
    symbol: 'pDAI',
    name: 'Paycer DAI Pool',
    decimals: 18,
    chainAddresses: {
      [ChainId.Mainnet]: ''
    }
  },
  pUSDT: {
    symbol: 'pUSDT',
    name: 'Paycer USDT Pool',
    decimals: 18,
    chainAddresses: {
      [ChainId.Mainnet]: ''
    }
  },
  pwBTC: {
    symbol: 'pwBTC',
    name: 'Paycer WBTC Pool',
    decimals: 18,
    chainAddresses: {
      [ChainId.Mainnet]: ''
    }
  },
  pwETH: {
    symbol: 'pwETH',
    name: 'Paycer wETH Pool',
    decimals: 18,
    chainAddresses: {
      [ChainId.Mainnet]: ''
    }
  },
  pBUSD: {
    symbol: 'pBUSD',
    name: 'Paycer pBUSD Pool',
    decimals: 18,
    chainAddresses: {
      [ChainId.Mainnet]: ''
    }
  },
}
