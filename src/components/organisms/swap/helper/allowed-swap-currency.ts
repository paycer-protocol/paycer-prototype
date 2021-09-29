import { marketPairs } from '@config/swap-market-pairs'
import { TokenType } from '../../../../types/investment'

const useAllowedSwapCurrency = <T>(token: TokenType)  => {
    const allowedCurrencies = marketPairs.find((market) => market.base.symbol === token.symbol);

    if (allowedCurrencies) {
        return allowedCurrencies.markets
    }

    return []

}

export default useAllowedSwapCurrency
