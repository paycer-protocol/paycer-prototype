import { TokenType } from '../../../../types/investment'

export interface MarketPair {
  token0: TokenType,
  token1: TokenType
}

export interface SupplyProps {
  token0Value: number
  token1Value: number
  marketPair: MarketPair
}


