import React from 'react'
import Currency from '@components/atoms/form/currency'
import { useFormikContext } from 'formik'
import calculateWillReceive from '../../helper/calculate-will-receive'
import { InvestFormProps } from "@components/organisms/token-sale/invest-form/types";
import {preSaleReferralBonusPercantage} from "@config/token-sale";

export default function Token0Input() {
    const { values, setFieldValue, setFieldError } = useFormikContext<InvestFormProps>()

    return (
      <Currency
        name="token0Value"
        className="w-100"
        required
        disabled={!values.token0Balance}
        max={values.token0Balance}
        currency={values.token0.symbol}
        decimals={4}
        onChange={(e) => {
            const value  = Number(e.target.rawValue.split(' ')[1])
            // force max balance if input too high TODO: Doesnt update the input display value correctly after it was forced to the users total balance for some reason...
            const token0Value = value > values.token0Balance ? values.token0Balance : value
            const referralBonus = (token0Value / preSaleReferralBonusPercantage)
            calculateWillReceive(values.token0, token0Value, referralBonus, setFieldValue)
            setFieldValue('referralBonus', referralBonus)
            setFieldValue('token0Value', token0Value)
        }}
      />
    )
}

