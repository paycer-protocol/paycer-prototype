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
        const withdrawAmount = value > values.balance ? values.balance : value
        setFieldValues(setFieldValue, values, withdrawAmount)
        setFieldValue('investRange', withdrawAmount * 100 / values.balance)
    }

    return (
        <TokenInput
            name="withdrawAmount"
            required
            currency={values.baseSymbol}
            handleChange={handleChange}
            decimals={4}
            value={values.withdrawAmount}
        />
    )
}
