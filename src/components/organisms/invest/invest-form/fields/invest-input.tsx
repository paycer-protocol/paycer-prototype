import React from 'react'
import { t } from '@lingui/macro'
import Currency from '@components/atoms/form/currency'
import { useFormikContext } from 'formik'
import { InvestFormFields } from '../../types'

export default function InvestInput() {
    const {
        values,
        initialValues,
        setFieldValue
    } = useFormikContext<InvestFormFields>()

    return (
        <Currency
            name="investBalance"
            label={t`Current Invest`}
            required
            currency={values.investSymbol}
            onChange={(e) => {
                // todo: price feed missing
                const exchangePrice = 1
                let baseBalance = 0 as number
                let investBalance = Number(e.target.value.split(' ')[1]) as number
                let investFee = 0 as number
                let investDiff = 0 as number

                // plus
                if (investBalance > initialValues.investBalance) {
                    investDiff = investBalance - initialValues.investBalance
                    baseBalance = initialValues.baseBalance - (investDiff * exchangePrice)
                    investFee = investBalance * values.investFee
                // minus
                } else {
                    investDiff = initialValues.investBalance - investBalance
                    baseBalance = initialValues.baseBalance + (investDiff * exchangePrice)
                    investFee = investBalance * values.withdrawFee
                }

                const totalBalance = initialValues.baseBalance + (initialValues.investBalance * exchangePrice)
                const investRange = investBalance * 100 / totalBalance

                setFieldValue('baseBalance', baseBalance)
                setFieldValue('investBalance', investBalance)
                setFieldValue('investFee', investFee)
                setFieldValue('investRange', investRange)
            }}
        />
    )
}
