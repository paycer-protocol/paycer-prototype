import { tokenProvider } from '@providers/tokens'
import { MarketPairType } from '../types/market'
import { TokenType } from '../types/investment'

export const initialFromTokenValue = 0.998787

export const swapTokens: TokenType[] = [
  tokenProvider.PCR,
  tokenProvider.DAI,
  tokenProvider.USDC,
  tokenProvider.USDT,
  tokenProvider.BUSD,
  tokenProvider.wBTC,
  tokenProvider.wETH,
]

export const marketPairs: MarketPairType[] = [
  {
    base: tokenProvider.PCR,
    markets: [
      tokenProvider.DAI,
      tokenProvider.USDC,
      tokenProvider.USDT,
      tokenProvider.BUSD,
      tokenProvider.wBTC,
      tokenProvider.wETH,
    ]
  },
  {
    base: tokenProvider.DAI,
    markets: [
      tokenProvider.PCR,
      tokenProvider.USDT,
      tokenProvider.USDC,
      tokenProvider.BUSD,
      tokenProvider.wBTC,
      tokenProvider.wETH,
    ]
  },
  {
    base: tokenProvider.USDC,
    markets: [
      tokenProvider.PCR,
      tokenProvider.DAI,
      tokenProvider.USDT,
      tokenProvider.BUSD,
      tokenProvider.wBTC,
      tokenProvider.wETH,
    ]
  },
  {
    base: tokenProvider.USDT,
    markets: [
      tokenProvider.PCR,
      tokenProvider.DAI,
      tokenProvider.USDC,
      tokenProvider.BUSD,
      tokenProvider.wBTC,
      tokenProvider.wETH,
    ]
  },
  {
    base: tokenProvider.BUSD,
    markets: [
      tokenProvider.PCR,
      tokenProvider.DAI,
      tokenProvider.USDC,
      tokenProvider.USDT,
      tokenProvider.wBTC,
      tokenProvider.wETH,
    ]
  },
  {
    base: tokenProvider.wBTC,
    markets: [
      tokenProvider.PCR,
      tokenProvider.DAI,
      tokenProvider.USDC,
      tokenProvider.USDT,
      tokenProvider.BUSD,
      tokenProvider.wETH,
    ]
  },
  {
    base: tokenProvider.wETH,
    markets: [
      tokenProvider.PCR,
      tokenProvider.DAI,
      tokenProvider.USDC,
      tokenProvider.USDT,
      tokenProvider.BUSD,
      tokenProvider.wBTC,
    ]
  }
]
