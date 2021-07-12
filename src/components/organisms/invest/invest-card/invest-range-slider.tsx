import React from 'react'
import Slider from 'rc-slider'
import { useFormikContext } from 'formik'
import { InvestFormFields } from './types'

export default function InvestRangeSlider() {
    const {
        values,
        setFieldValue
    } = useFormikContext<InvestFormFields>()

    return (
        <>
            <Slider
                maximumTrackStyle={{
                    backgroundColor: "#FFFFFF",
                    height: 7,
                }}
                trackStyle={{
                    background: "#6ef2ff",
                    height: 7,
                }}
                handleStyle={{
                    height: 20,
                    width: 20,
                    marginTop: -7,
                    backgroundColor: "#FFFFFF",
                    border: 0
                }}
                min={0}
                max={1000}
                step={1}
                // value={newDeposit ? newDeposit : deposit}
                onChange={(value) => {
                    // TODO: price here missing
                    const tokenPrice = 1
                    const range = value / 10

                    let nextInvestBalance = values.investBalance
                    let nextWalletBalance = values.walletBalance
                    let nextInvestFee = values.investFee

                    // TODO: recalculate all values with BigNumbers

                    setFieldValue('investBalance', nextInvestBalance)
                    setFieldValue('walletBalance', nextWalletBalance)
                    setFieldValue('investFee', nextInvestFee)
                }}
            />
        </>
    )
}
