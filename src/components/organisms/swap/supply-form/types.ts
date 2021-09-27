import { TokenType } from '../../../../types/investment'

export interface MarketPair {
  pairs: TokenType[]
}

export interface SupplyProps {
  token0Value: number
  token1Value: number
  marketPair: MarketPair
}


