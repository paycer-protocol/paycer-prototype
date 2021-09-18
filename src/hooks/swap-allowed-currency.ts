import MarketPairs from '@config/market-pairs'

const useSwapAllowedCurrency = <T>(currency: string)  => {

    const allowedCurrencys = MarketPairs[currency];

    if (allowedCurrencys) {
        return allowedCurrencys
    }

    return []

}

export default useSwapAllowedCurrency