import React from 'react'
import { useFormikContext } from 'formik'
import Input from '@components/atoms/form/input'
import { InvestFormFields } from './types'

export default function WalletBalance() {
    const {
        values,
        setFieldValue
    } = useFormikContext<InvestFormFields>()

    return (
        <Input
            name="walletBalance"
            type="number"
            label="Balance"
            required
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
