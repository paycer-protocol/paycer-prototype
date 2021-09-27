import MarketPairs from '@config/swap-market-pairs'

const useAllowedSwapCurrency = <T>(currency: string)  => {
    const allowedCurrencies = MarketPairs[currency];

    if (allowedCurrencies) {
        return allowedCurrencies
    }

    return []

}

export default useAllowedSwapCurrency
