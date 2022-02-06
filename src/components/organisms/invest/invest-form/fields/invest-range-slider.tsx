import React from 'react'
import Slider from 'rc-slider'
import { useFormikContext } from 'formik'
import { InvestFormFields } from '../../types'

export default function InvestRangeSlider() {
    const { values, initialValues, setFieldValue, dirty } = useFormikContext<InvestFormFields>()

    // todo: price feed missing
    const exchangePrice = 1
    const totalBalance = initialValues.investAmount + (initialValues.investBalance * exchangePrice)

    return (
        <div style={{ width: '100%' }}>
            <Slider
                marks={{
                    0: '0%',
                    25: '25%',
                    50: '50%',
                    75: '75%',
                    100: '100%',
                }}
                min={0}
                max={100}
                step={0.001}
                value={dirty ? values.investRange : undefined}
                defaultValue={values.investBalance * 100 / totalBalance}
                onChange={(value) => {
                    let investAmount = 0 as number
                    let investBalance = 0 as number

                    const walletDiff = totalBalance * value / 100
                    investBalance = walletDiff * exchangePrice
                    investAmount = totalBalance - walletDiff

                    investAmount = investAmount > totalBalance ? totalBalance : investAmount
                    investAmount = investAmount < 0 ? 0 : investAmount

                    investBalance = investBalance > totalBalance ? totalBalance : investBalance
                    investBalance = investBalance < 0 ? 0 : investBalance

                    setFieldValue('investAmount', investAmount)
                    setFieldValue('investBalance', investBalance)
                    setFieldValue('investRange', value)
                    setFieldValue('submitAction', investBalance < initialValues.investBalance ? 'withdraw' : 'invest')
                }}
            />
        </div>
    )
}
