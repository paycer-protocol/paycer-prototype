import { TokenType } from '../../../../types/investment'

export interface SwapProps {
  token0: TokenType
  token0Value: number
  token0Markets: TokenType[]
  token0Balance: number
  token1: TokenType
  token1Value: number
  token1Markets: TokenType[]
  token1Balance: number
  minimumToReceive: number
  slippageTolerance: number
  priceImpact: number
  feeFactor: number
  fee: number
  exchangeRate: number
}


