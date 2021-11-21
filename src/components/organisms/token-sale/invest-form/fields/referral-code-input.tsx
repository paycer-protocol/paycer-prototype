import React from 'react'
import Input from '@components/atoms/form/input'
import { useFormikContext } from 'formik'
import { InvestFormProps } from '../types'
import setWillReceive from '../../helper/set-will-receive'
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
            setWillReceive(values.token0, values.token0Value, value, setFieldValue)
        }}
      />
    )
}

