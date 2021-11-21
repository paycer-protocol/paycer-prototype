import React from 'react'
import Input from '@components/atoms/form/input'
import { useFormikContext } from 'formik'
import { InvestFormProps } from '../types'
import calculateWillReceive from '@components/organisms/token-sale/helper/calculate-will-receive'
import {preSaleReferralBonusPercantage} from "@config/token-sale";

export default function ReferralCodeInput() {
    const { values, setFieldValue, setFieldError } = useFormikContext<InvestFormProps>()

    return (
      <Input
        name="referralCode"
        className="w-100"
        disabled={!values.token0Balance}
        onChange={(e) => {
            const value = e.target.value
            setFieldValue('referralCode', value)
            const referralBonus = (values.token0Value / preSaleReferralBonusPercantage)
            setFieldValue('referralBonus', referralBonus)
            calculateWillReceive(values.token0, values.token0Value, referralBonus, setFieldValue)
        }}
      />
    )
}

