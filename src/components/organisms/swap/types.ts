import { TokenType } from '../../../types/investment'

export interface SwapProps {
  token0: TokenType
  token0Value: number
  token1: TokenType
  token1Value: number
  minimumToReceive: number,
  slippageTolerance: number,
  priceImpact: number,
  exchangeRate: number,
  feeFactor: number,
  fee: number
}


