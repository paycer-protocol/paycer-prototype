import React from 'react'
import { useFormikContext } from 'formik'
import Currency from '@components/atoms/form/currency'
import { InvestFormFields } from './types'

export default function WalletBalance() {
    const {
        values,
        setFieldValue
    } = useFormikContext<InvestFormFields>()

    return (
        <Currency
            name="walletBalance"
            label="Available Balance"
            required
            currency="ETH"
            onChange={(e) => {
                let newWalletBalance = e.target.value as number
                let newInvestBalance = values.investBalance
                let nextInvestFee = values.investFee

                setFieldValue('walletBalance', newWalletBalance)
                setFieldValue('investBalance', newInvestBalance)
                setFieldValue('investFee', nextInvestFee)
            }}
        />
    )

}
