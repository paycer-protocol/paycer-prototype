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
      }
    },
    USDC: {
      symbol: 'USDC',
      name: 'USD Coin',
      decimals: 6,
      chainAddresses: {
        [ChainId.Mainnet]: '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48',
        [ChainId.Kovan]: '0x2F375e94FC336Cdec2Dc0cCB5277FE59CBf1cAe5',
      }
    },
    DAI: {
      symbol: 'DAI',
      name: 'Dai Stablecoin',
      decimals: 18,
      chainAddresses: {
        [ChainId.Mainnet]: '0x6b175474e89094c44da98b954eedeac495271d0f',
        [ChainId.Kovan]: '0x1528F3FCc26d13F7079325Fb78D9442607781c8C',
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
    }
  }
}
