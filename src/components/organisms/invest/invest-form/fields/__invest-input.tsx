import React from 'react'
import { t } from '@lingui/macro'
import Currency from '@components/atoms/form/currency'
import { useFormikContext } from 'formik'
import { InvestFormFields } from '../../types'

export default function InvestInput() {
    const {
        values,
        initialValues,
        setFieldValue,
    } = useFormikContext<InvestFormFields>()

    return (
        <Currency
            name="investBalance"
            label={t`Current Invest`}
            className="form-control"
            required
            currency={values.investSymbol}
            decimals={4}
            onChange={(e) => {
                // todo: price feed missing
                const exchangePrice = 1
                let investAmount = 0 as number
                let investBalance = Number(e.target.rawValue.split(' ')[1]) as number
                let investDiff = 0 as number

                // plus
                if (investBalance > initialValues.investBalance) {
                    investDiff = investBalance - initialValues.investBalance
                    investAmount = initialValues.investAmount - (investDiff * exchangePrice)
                // minus
                } else {
                    investDiff = initialValues.investBalance - investBalance
                    investAmount = initialValues.investAmount + (investDiff * exchangePrice)
                }

                const totalBalance = initialValues.investAmount + (initialValues.investBalance * exchangePrice)
                const investRange = investBalance * 100 / totalBalance

                investAmount = investAmount > totalBalance ? totalBalance : investAmount
                investAmount = investAmount < 0 ? 0 : investAmount

                investBalance = investBalance < 0 ? 0 : investBalance
                investBalance = investBalance >= totalBalance ? totalBalance : investBalance

                setFieldValue('investAmount', investAmount)
                setFieldValue('investBalance', investBalance)
                setFieldValue('investRange', investRange)
                setFieldValue('submitAction', investBalance < initialValues.investBalance ? 'withdraw' : 'invest')
            }}
        />
    )
}
