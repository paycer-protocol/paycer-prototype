import React from 'react'
import Slider from 'rc-slider'
import { BigNumber } from '@ethersproject/bignumber'
import { useFormikContext } from 'formik'
import { InvestFormFields } from './types'
import {gainsPerYearkMP} from "@config/transaction";

export default function InvestRangeSlider() {
    const {
        values,
        setFieldValue
    } = useFormikContext<InvestFormFields>()

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
                // value={newDeposit ? newDeposit : deposit}
                onChange={(value) => {
                    // TODO: price here missing
                    const tokenPrice = 1

                    let nextInvestBalance = values.investBalance
                    let nextWalletBalance = values.walletBalance
                    let nextInvestFee = values.investFee

                    // TODO: recalculate all values with BigNumbers

                    // setNewDeposit(Number(value).toFixed(4))
                    // setBalance(Number(etherBalance - (newDeposit - deposit)).toFixed(4))
                    // calculateFee(value)
                    //
                    // setGainsPerYear(Number(value * gainsPerYearkMP).toFixed(8))
                    // setGainsPerWeek(Number((value * gainsPerYearkMP) / 365 * 7).toFixed(8))

                    setFieldValue('investBalance', nextInvestBalance)
                    setFieldValue('walletBalance', nextWalletBalance)
                    setFieldValue('investFee', nextInvestFee)
                }}
            />
        </div>
    )
}
