import { TokenType } from '../../../../types/investment'

export interface SupplyProps {
  token0: TokenType
  token0Value: number
  token0Markets: TokenType[]
  token0Balance: number
  token1: TokenType
  token1Value: number
  token1Markets: TokenType[]
  token1Balance: number
  exchangeRate: number
  apr: number
  dailyRewards: number
}


