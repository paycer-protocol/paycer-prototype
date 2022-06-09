import {TokenType} from '../../../types/investment'

export interface SwapProps {
    fromToken: TokenType
    fromTokenValue: number
    fromTokenMarkets: TokenType[]
    toToken: TokenType
    toTokenValue: number
    toTokenMarkets: TokenType[]
    slippage: number
    quote: number
    fee: number
}

export interface SwapTokenInputProps {
    readOnly?: boolean
}
