import React from 'react'
import Currency from '@components/atoms/form/currency'
import { useFormikContext } from 'formik'
import { InvestFormFields } from './types'

export default function InvestBalance() {
    const {
        values,
        setFieldValue
    } = useFormikContext<InvestFormFields>()

    return (
        <Currency
            name="investBalance"
            label="Current Invest"
            required
            currency="USDC"
            onChange={(e) => {
                let nextInvestBalance = e.target.value as number
                let nextWalletBalance = values.walletBalance
                let nextInvestFee = values.investFee

                setFieldValue('investBalance', Math.max(nextInvestBalance, values.walletBalance))
                setFieldValue('walletBalance', nextWalletBalance)
                setFieldValue('investFee', nextInvestFee)
            }}
        />
    )
}
