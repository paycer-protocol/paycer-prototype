import { TokenType } from '../../../../types/investment'

export interface SwapProps {
  token0: TokenType
  token0Value: number
  token0Markets: TokenType[]
  token1: TokenType
  token1Value: number
  token1Markets: TokenType[]
  minimumToReceive: number
  slippageTolerance: number
  priceImpact: number
  feeFactor: number
  fee: number
  token0Price: number
  token1Price: number
}


