import { tokenProvider } from '@providers/tokens'
import {tokenPricePreSale } from '@config/token-price'
import { preSaleReferralBonusPercantage } from "@config/token-sale";

const setWillReceive = (token0, token0Value, referralCode, setFieldValue)  => {

    if (token0 === tokenProvider.ETH) {
        if (referralCode) {
            const referralBonus = ((token0Value * 4367.24) / 100 * preSaleReferralBonusPercantage) / tokenPricePreSale
            setFieldValue('willReceive', ((token0Value * 4367.24) / tokenPricePreSale) + referralBonus)
            setFieldValue('referralBonus', referralBonus)
        } else {
            setFieldValue('willReceive', (token0Value * 4367.24) / tokenPricePreSale)
            setFieldValue('referralBonus', 0)
        }

    } else {
        if(referralCode) {
            const referralBonus = (token0Value / 100 * preSaleReferralBonusPercantage) / tokenPricePreSale
            setFieldValue('willReceive', (token0Value / tokenPricePreSale) + referralBonus)
            setFieldValue('referralBonus', referralBonus)
        } else {
            setFieldValue('willReceive', token0Value / tokenPricePreSale)
            setFieldValue('referralBonus', 0)
        }

    }
}

export default setWillReceive