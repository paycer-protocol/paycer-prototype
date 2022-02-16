import React from 'react'
import { useFormikContext } from 'formik'
import { InvestFormFields } from '../../types'
import TokenInput from "@components/molecules/token-input";
import setFieldValues from '../../helper/set-field-values'

export default function InvestInput() {
    const {
        values,
        setFieldValue
    } = useFormikContext<InvestFormFields>()

    const handleChange = (value: number) => {
        const amount = value > values.balance ? values.balance : value
        setFieldValues(setFieldValue, values, amount)
        setFieldValue('investRange', amount * 100 / values.balance)
    }

    return (
        <TokenInput
            name="amount"
            required
            currency={values.baseSymbol}
            handleChange={handleChange}
            raiseMax
            balance={values.balance}
            decimals={4}
            value={values.amount}
        />
    )
}
