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
        [ChainId.Polygon]: '0xa6083abe845fbB8649d98B8586cBF50b7f233612',
        [ChainId.Mainnet]: '0x24FdBF97A95d425E2e53D1d35C4920c82Ba784f1',
        [ChainId.Mumbai]: '0xD8eA7F7D3eebB5193AE76E3280b8650FD1468663',
        [ChainId.BSC]: '0xa9f31589E0a8c0b12068329736ed6385A8F77b62'
      }
    },
    USDC: {
      symbol: 'USDC',
      name: 'USD Coin',
      decimals: 6,
      chainAddresses: {
        [ChainId.Polygon]: '0x2791bca1f2de4661ed88a30c99a7a9449aa84174',
        [ChainId.Mainnet]: '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48',
      }
    },
    DAI: {
      symbol: 'DAI',
      name: 'Dai Stablecoin',
      decimals: 18,
      chainAddresses: {
        [ChainId.Polygon]: '0x8f3cf7ad23cd3cadbd9735aff958023239c6a063',
        [ChainId.Mainnet]: '0x6b175474e89094c44da98b954eedeac495271d0f',
      }
    },
    LUSD: {
      symbol: 'LUSD',
      name: 'LUSD Stablecoin',
      decimals: 18,
      chainAddresses: {
        [ChainId.Mainnet]: '0x5f98805A4E8be255a32880FDeC7F6728C6568bA0',
      }
    },
    USDT: {
      symbol: 'USDT',
      name: 'Tether USD',
      decimals: 6,
      chainAddresses: {
        [ChainId.Polygon]: '0xc2132D05D31c914a87C6611C10748AEb04B58e8F',
        [ChainId.Mainnet]: '0xdac17f958d2ee523a2206206994597c13d831ec7',
      }
    },
    wBTC: {
      symbol: 'wBTC',
      name: 'Wrapped BTC',
      decimals: 8,
      chainAddresses: {
        [ChainId.Polygon]: '0x1bfd67037b42cf73acf2047067bd4f2c47d9bfd6',
        [ChainId.Mainnet]: '0x2260fac5e5542a773aa44fbcfedf7c193bc2c599',
      }
    },
    wETH: {
      symbol: 'wETH',
      name: 'Wrapped Ether',
      decimals: 18,
      chainAddresses: {
        [ChainId.Polygon]: '0x7ceb23fd6bc0add59e62ac25578270cff1b9f619',
        [ChainId.Mainnet]: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
      }
    },
    BUSD: {
      symbol: 'BUSD',
      name: 'BUSD',
      decimals: 18,
      chainAddresses: {
        [ChainId.Polygon]: '0xdab529f40e671a1d4bf91361c21bf9f0c9712ab7',
        [ChainId.Mainnet]: '0x4Fabb145d64652a948d72533023f6E7A623C7C53',
      }
    }
  }
}


