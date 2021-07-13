import React, { useState } from 'react'
import Slider from 'rc-slider'
import { useFormikContext } from 'formik'
import { InvestFormFields } from '../../types'

export default function InvestRangeSlider() {
    const { values, initialValues, setFieldValue } = useFormikContext<InvestFormFields>()
    const [prevValue, setPrevValue] = useState<number>(0)

    // todo: price feed missing
    const exchangePrice = 1
    const totalBalance = initialValues.baseBalance + (initialValues.investBalance * exchangePrice)

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
                value={values.investRange}
                defaultValue={values.investBalance * 100 / totalBalance}
                onChange={(value) => {
                    let baseBalance = 0 as number
                    let investBalance = 0 as number
                    let investFee = 0 as number

                    const walletDiff = totalBalance * value / 100
                    investBalance = walletDiff * exchangePrice

                    // plus
                    if (value >= prevValue) {
                        baseBalance = totalBalance - walletDiff
                        investFee = investBalance * values.investFee
                    // minus
                    } else {
                        baseBalance = totalBalance - walletDiff
                        investFee = investBalance * values.withdrawFee
                    }

                    setFieldValue('baseBalance', Math.abs(baseBalance))
                    setFieldValue('investBalance', Math.abs(investBalance))
                    setFieldValue('investFee', Math.abs(investFee))
                    setPrevValue(value)
                }}
            />
        </div>
    )
}
