import React, { useState } from 'react'
import Slider from 'rc-slider'
import { useFormikContext } from 'formik'
import { InvestFormFields } from '../types'

export default function InvestRangeSlider() {
    const { values, initialValues, setFieldValue } = useFormikContext<InvestFormFields>()
    const [prevValue, setPrevValue] = useState<number>(0)

    return (
        <div style={{ width: '100%' }}>
            <Slider
                // maximumTrackStyle={{
                //     backgroundColor: "#FFFFFF",
                //     height: 7,
                // }}
                // trackStyle={{
                //     background: "#6ef2ff",
                //     height: 7,
                // }}
                // handleStyle={{
                //     height: 20,
                //     width: 20,
                //     marginTop: -7,
                //     backgroundColor: "#FFFFFF",
                //     border: 0
                // }}
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
                defaultValue={values.investBalance + 100 / values.walletBalance}
                onChange={(value) => {
                    let walletBalance = 0 as number
                    let investBalance = 0 as number
                    let investFee = 0 as number

                    // todo: price feed missing
                    const exchangePrice = 1
                    const walletDiff = initialValues.walletBalance * value / 100
                    const investDiff = walletDiff * exchangePrice

                    // plus
                    if (value > prevValue) {
                        walletBalance = initialValues.walletBalance - walletDiff
                        investBalance = initialValues.investBalance + investDiff
                        investFee = investDiff * values.investFee
                    // minus
                    } else {
                        walletBalance += initialValues.walletBalance - walletDiff
                        investBalance -= initialValues.investBalance - investDiff
                        investFee = investDiff * values.withdrawFee
                    }

                    setFieldValue('walletBalance', walletBalance)
                    setFieldValue('investBalance', investBalance)
                    setFieldValue('investFee', investFee)
                    setPrevValue(value)
                }}
            />
        </div>
    )
}
