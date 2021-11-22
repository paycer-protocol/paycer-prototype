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
        [ChainId.Mainnet]: '0x7fc6761b9119f3d1448e1eed559b3a9b7205085c', // todo
        [ChainId.Kovan]: '0x7fc6761b9119f3d1448e1eed559b3a9b7205085c',
        [ChainId.Polygon]: '0x7fc6761b9119f3d1448e1eed559b3a9b7205085c', // todo
        [ChainId.Mumbai]: '0x7fc6761b9119f3d1448e1eed559b3a9b7205085c', // todo
        [ChainId.BSC]: '0x7fc6761b9119f3d1448e1eed559b3a9b7205085c', // todo
      }
    },
    USDC: {
      symbol: 'USDC',
      name: 'USD Coin',
      decimals: 6,
      chainAddresses: {
        [ChainId.Mainnet]: '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48',
        [ChainId.Kovan]: '0xb7a4F3E9097C08dA09517b5aB877F7a917224ede',
      }
    },
    DAI: {
      symbol: 'DAI',
      name: 'Dai Stablecoin',
      decimals: 18,
      chainAddresses: {
        [ChainId.Mainnet]: '0x6b175474e89094c44da98b954eedeac495271d0f',
        [ChainId.Kovan]: '0x4F96Fe3b7A6Cf9725f59d353F723c1bDb64CA6Aa',
      }
    },
    LUSD: {
      symbol: 'LUSD',
      name: 'LUSD Stablecoin',
      decimals: 18,
      chainAddresses: {
        [ChainId.Mainnet]: '0x5f98805A4E8be255a32880FDeC7F6728C6568bA0',
        [ChainId.Kovan]: '0xab47a2a71978af421baa223b41739962c5d61c83',
      }
    },
    USDT: {
      symbol: 'USDT',
      name: 'Tether USD',
      decimals: 6,
      chainAddresses: {
        [ChainId.Mainnet]: '0xdac17f958d2ee523a2206206994597c13d831ec7',
        [ChainId.Kovan]: '0xf3e0d7bf58c5d455d31ef1c2d5375904df525105',
      }
    },
    wBTC: {
      symbol: 'wBTC',
      name: 'Wrapped BTC',
      decimals: 8,
      chainAddresses: {
        [ChainId.Mainnet]: '0x2260fac5e5542a773aa44fbcfedf7c193bc2c599',
        [ChainId.Kovan]: '0x3673628b0a9b27480c57026fcddc9ac16d61a6ea',
      }
    },
    wETH: {
      symbol: 'wETH',
      name: 'Wrapped Ether',
      decimals: 18,
      chainAddresses: {
        [ChainId.Mainnet]: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
        [ChainId.Kovan]: '0xd0a1e359811322d97991e03f863a0c30c2cf029c',
      }
    },
    BUSD: {
      symbol: 'BUSD',
      name: 'BUSD',
      decimals: 18,
      chainAddresses: {
        [ChainId.Mainnet]: '0x4Fabb145d64652a948d72533023f6E7A623C7C53',
        [ChainId.Kovan]: '0x942364e96d4482bbb3b42a5a08310b5894077007',
      }
    },
    ETH: {
      symbol: 'ETH',
      name: 'ETH',
      decimals: 18,
      chainAddresses: {
        [ChainId.Mainnet]: '',
        [ChainId.Kovan]: '',
      }
    }
  }
}


