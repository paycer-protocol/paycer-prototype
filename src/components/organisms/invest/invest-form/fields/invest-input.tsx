import React from 'react'
import { useFormikContext } from 'formik'
import { InvestFormFields } from '../../types'
import TokenInput from "@components/molecules/token-input";
import useInvest from "@hooks/use-invest";

export default function InvestInput() {
    const {
        values,
        setFieldValue
    } = useFormikContext<InvestFormFields>()

    const { setInvestFieldValues } = useInvest()

    const handleChange = (value: number) => {
        const investAmount = value > values.balance ? values.balance : value
        setInvestFieldValues(setFieldValue, values, investAmount)
        setFieldValue('investRange', investAmount * 100 / values.balance)
    }

    return (
        <TokenInput
            name="investAmount"
            required
            currency={values.baseSymbol}
            handleChange={handleChange}
            raiseMax
            balance={values.balance}
            decimals={4}
            value={values.investAmount}
        />
    )
}
