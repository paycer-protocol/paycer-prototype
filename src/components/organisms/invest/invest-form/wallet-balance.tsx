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
                // let value = Number(e.target.value).toFixed(4) as any
                // let diff = 0 as any
                // if (value > etherBalance) {
                //     setBalance(etherBalance)
                // } else {
                //     diff = etherBalance - value
                //     setBalance(Number(parseFloat(etherBalance) - parseFloat(diff)).toFixed(4))
                //     const newDepositVal = Number(parseFloat(deposit) + parseFloat(diff)).toFixed(4)
                //     setNewDeposit(newDepositVal)
                //     calculateFee(newDepositVal)
                // }

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
