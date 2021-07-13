import React from 'react'
import { t } from '@lingui/macro'
import { useFormikContext } from 'formik'
import Currency from '@components/atoms/form/currency'
import { InvestFormFields } from '../../types'

export default function BaseInput() {
    const {
        values,
        initialValues,
        setFieldValue
    } = useFormikContext<InvestFormFields>()

    return (
        <Currency
            name="baseBalance"
            label={t`Available Balance`}
            required
            currency={values.baseSymbol}
            decimals={4}
            onChange={(e) => {
                // todo: price feed missing
                const exchangePrice = 1
                let baseBalance = Number(e.target.value.split(' ')[1]) as number
                let investBalance = 0 as number
                let investFee = 0 as number
                let baseDiff = 0 as number

                // plus
                if (baseBalance > initialValues.baseBalance) {
                    baseDiff = baseBalance - initialValues.baseBalance
                    investBalance = initialValues.investBalance - (baseDiff * exchangePrice)
                    investFee = investBalance * values.investFee
                    // minus
                } else {
                    baseDiff = initialValues.baseBalance - baseBalance
                    investBalance = initialValues.investBalance + (baseDiff * exchangePrice)
                    investFee = investBalance * values.withdrawFee
                }

                const totalBalance = initialValues.baseBalance + (initialValues.investBalance * exchangePrice)
                const investRange = investBalance * 100 / totalBalance

                baseBalance = baseBalance > totalBalance ? totalBalance : baseBalance
                baseBalance = baseBalance < 0 ? 0 : baseBalance

                investBalance = investBalance > totalBalance ? totalBalance : investBalance
                investBalance = investBalance < 0 ? 0 : investBalance

                setFieldValue('baseBalance', baseBalance)
                setFieldValue('investBalance', investBalance)
                setFieldValue('investFee', investFee)
                setFieldValue('investRange', investRange)
            }}
        />
    )

}
