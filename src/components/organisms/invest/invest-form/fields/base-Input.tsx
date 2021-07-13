import React from 'react'
import { useFormikContext } from 'formik'
import Currency from '@components/atoms/form/currency'
import { InvestFormFields } from '../../types'

export default function BaseInput() {
    const {
        values,
        setFieldValue
    } = useFormikContext<InvestFormFields>()

    return (
        <Currency
            name="baseBalance"
            label="Available Balance"
            required
            currency={values.baseSymbol}
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

                let newBaseBalance = e.target.value as number
                let newInvestBalance = values.investBalance
                let nextInvestFee = values.investFee

                setFieldValue('baseBalance', newBaseBalance)
                setFieldValue('investBalance', newInvestBalance)
                setFieldValue('investFee', nextInvestFee)
            }}
        />
    )

}
