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
                // let value = Number(e.target.value).toFixed(4) as any
                //
                // let diff = 0 as any
                //
                // // if its a deposit
                // if (value > deposit) {
                //     diff = value - deposit
                //     const newBalance = Number(parseFloat(etherBalance) - parseFloat(diff)).toFixed(4)
                //     setBalance(newBalance)
                //     // withdraw ...
                // } else {
                //     diff = Number(deposit - value)
                //     const newBalance = Number(parseFloat(etherBalance) + parseFloat(diff)).toFixed(4)
                //     setBalance(newBalance)
                // }
                //
                // calculateFee(value)
                // setNewDeposit(value)


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
