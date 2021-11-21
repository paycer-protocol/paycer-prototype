import { tokenProvider } from '@providers/tokens'
import {tokenPricePreSale, tokenPricePrivateSale} from '@config/token-price'
import { preSaleReferralBonusPercantage } from '@config/token-sale'
import { InvestFormProps } from '@components/organisms/token-sale/invest-form/types'

const calculateWillReceive = (token0, token0Value, referralBonus, setFieldValue)  => {
    let willReceive
    if (token0 === tokenProvider.wETH) {
        // TODO FETCH ETH / DOLLAR EXCHANGE RATE FROM LIVE DATA
        willReceive = (token0Value * 4.36724) / tokenPricePreSale
    } else {
        willReceive = token0Value / tokenPricePreSale
    }

    if (referralBonus) {
        willReceive = referralBonus + willReceive
    }

    setFieldValue('willReceive', willReceive)
}

export default calculateWillReceive