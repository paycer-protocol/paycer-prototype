import { TokenType } from './investment'


export interface MarketType {
  token0: TokenType
  token1: TokenType
}

export interface MarketPairsType {
  pairs: MarketType[]
}

export default {}
