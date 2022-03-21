import {TokenType} from '../../../types/investment'
import {
    NetworkSettingsInterface,
    TradeContext,
    TradePairInterface,
    TradeSettingsInterface
} from '../../../lib/trade'
export interface SwapProps {
    isLoading: boolean
    token0: any
    token0Value: number
    token0Markets: TokenType[]

    token1: any
    token1Value: number
    token1ValueByUserInput: number
    token1Markets: TokenType[]

    tradePair: TradePairInterface
    tradeSettings: TradeSettingsInterface
    tradeContext: TradeContext
    quoteChangedStatus: number
    quoteChangedSignificantly: boolean
    quoteChangedSignificantlyTresholdPercentage: number
    initFactory: (values: SwapProps, setFieldValue, setValues) => any
    networkSettings: NetworkSettingsInterface

}

export interface SwapTokenInputProps {
    readOnly?: boolean
}
