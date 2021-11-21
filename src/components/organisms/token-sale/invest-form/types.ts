import { TokenType } from '../../../../types/investment'

export interface InvestFormProps {
  token0Value: number
  token0: TokenType
  token0Balance: number
  referralCode: string
  willReceive: number
}


