export interface SwapProps {
  token0: string
  token0Value: number
  token1: string
  token1Value: number
  minimumToReceive: number,
  slippageTolerance: number,
  priceImpact: number,
  exchangeRate: number,
  feeFactor: number,
  fee: number
}


