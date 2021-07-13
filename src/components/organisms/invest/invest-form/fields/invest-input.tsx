import React from 'react'
import Currency from '@components/atoms/form/currency'
import { useFormikContext } from 'formik'
import { InvestFormFields } from '../../types'

export default function InvestInput() {
    const {
        values,
        setFieldValue
    } = useFormikContext<InvestFormFields>()

    return (
        <Currency
            name="investBalance"
            label="Current Invest"
            required
            currency={values.investSymbol}
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


                let investBalance = e.target.value as number
                let baseBalance = values.baseBalance
                let investFee = values.investFee

                setFieldValue('investBalance', investBalance)
                setFieldValue('baseBalance', baseBalance)
                setFieldValue('investFee', investFee)
            }}
        />
    )
}
