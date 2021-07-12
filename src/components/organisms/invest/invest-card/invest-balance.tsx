import React from 'react'
import Input from '@components/atoms/form/input'
import { useFormikContext } from 'formik'
import { InvestFormFields } from './types'

export default function InvestBalance() {
    const {
        values,
        setFieldValue
    } = useFormikContext<InvestFormFields>()

    return (
        <Input
            name="investBalance"
            type="number"
            label="Invest"
            required
            onChange={(e) => {
                let nextInvestBalance = e.target.value as number
                let nextWalletBalance = values.walletBalance
                let nextInvestFee = values.investFee

                setFieldValue('investBalance', nextInvestBalance)
                setFieldValue('walletBalance', nextWalletBalance)
                setFieldValue('investFee', nextInvestFee)
            }}
        />
    )
}
