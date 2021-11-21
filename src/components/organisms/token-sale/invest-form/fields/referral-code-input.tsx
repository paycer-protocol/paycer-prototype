import React from 'react'
import Input from '@components/atoms/form/input'
import { useFormikContext } from 'formik'
import { InvestFormProps } from '../types'
import calculateWillReceive from '@components/organisms/token-sale/helper/calculate-will-receive'

export default function ReferralCodeInput() {
    const { values, setFieldValue, setFieldError } = useFormikContext<InvestFormProps>()

    return (
      <Input
        name="referralCode"
        className="w-100"
        disabled={!values.token0Balance}
        onChange={(e) => {
            const value = e.target.value
            // TODO validate referral code
            setFieldValue('referralCode', value)
            const willReceive = calculateWillReceive(values.token0, values.token0Value, value)
            setFieldValue('willReceive', willReceive)
        }}
      />
    )
}

