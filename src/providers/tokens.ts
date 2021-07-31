import { ChainId } from '@usedapp/core'
import { ITokenProvider } from '../types/investment'
import { yVaultProvider, paycerProvider } from '@providers/protocols'

export const tokenProvider: ITokenProvider = {
  ...yVaultProvider,
  ...paycerProvider,
  ...{
    PCR: {
      symbol: 'PCR',
      name: 'Paycer',
      decimals: 18,
      chainAddresses: {
        [ChainId.Mainnet]: '##todo##',
        [ChainId.Kovan]: '0x7fc6761b9119f3d1448e1eed559b3a9b7205085c',
      }
    },
    AAVE: {
      symbol: 'AAVE',
      name: 'Aave',
      decimals: 18,
      chainAddresses: {
        [ChainId.Mainnet]: '0x7Fc66500c84A76Ad7e9c93437bFc5Ac33E2DDaE9',
        [ChainId.Kovan]: '##todo##',
      }
    },
    COMP: {
      symbol: 'COMP',
      name: 'Compound',
      decimals: 18,
      chainAddresses: {
        [ChainId.Mainnet]: '0xc00e94cb662c3520282e6f5717214004a7f26888',
        [ChainId.Kovan]: '0x61460874a7196d6a22d1ee4922473664b3e95270',
      }
    },
    YFI: {
      symbol: 'YFI',
      name: 'yearn.finance',
      decimals: 18,
      chainAddresses: {
        [ChainId.Mainnet]: '0x0bc529c00c6401aef6d220be8c6ea1667f6ad93e',
        [ChainId.Kovan]: '##todo##',
      }
    },
    USDC: {
      symbol: 'USDC',
      name: 'USD Coin',
      decimals: 6,
      chainAddresses: {
        [ChainId.Mainnet]: '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48',
        [ChainId.Kovan]: '##todo##',
      }
    },
    DAI: {
      symbol: 'DAI',
      name: 'Dai Stablecoin',
      decimals: 18,
      chainAddresses: {
        [ChainId.Mainnet]: '0x6b175474e89094c44da98b954eedeac495271d0f',
        [ChainId.Kovan]: '##todo##',
      }
    },
    LUSD: {
      symbol: 'LUSD',
      name: 'LUSD Stablecoin',
      decimals: 18,
      chainAddresses: {
        [ChainId.Mainnet]: '0x5f98805A4E8be255a32880FDeC7F6728C6568bA0',
        [ChainId.Kovan]: '##todo##',
      }
    },
    USDT: {
      symbol: 'USDT',
      name: 'Tether USD',
      decimals: 6,
      chainAddresses: {
        [ChainId.Mainnet]: '0xdac17f958d2ee523a2206206994597c13d831ec7',
        [ChainId.Kovan]: '##todo##',
      }
    }
  }
}
