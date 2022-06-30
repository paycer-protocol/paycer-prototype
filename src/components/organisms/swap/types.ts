import { TokenType } from '../../../types/investment';

export interface SwapProps {
  fromToken: TokenType
  fromTokenValue: number
  fromTokenMarkets: TokenType[]
  toToken: TokenType
  toTokenValue: number
  toTokenMarkets: TokenType[]
  slippage: number
  fee: number
  isReloading: boolean
  isSwapping: boolean
  quoteHasChangedAlert: boolean
}

export interface SwapTokenInputProps {
  readOnly?: boolean
}
