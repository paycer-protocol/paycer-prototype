import React from 'react'
import Slider from 'rc-slider'
import { useFormikContext } from 'formik'
import fetchTokenBalance from '../../helper/fetch-token-balance'
import { SupplyProps} from "@components/organisms/swap/supply-form/types";

export default function InvestRangeSlider() {
    const { values, setFieldValue } = useFormikContext<SupplyProps>()

    /* TODO GET token0 BALANCE FROM WALLET */
    const tokenBalance = fetchTokenBalance(values.marketPair.token0)

    return (
        <div style={{ width: '100%' }}>
            <Slider
                marks={{
                    0: '0',
                    100: '100%',
                }}
                min={0}
                max={100}
                step={0.001}
                value={values.token0Value * 100 / tokenBalance}
                onChange={(value) => {
                    const amount = tokenBalance * value / 100
                    const token1Value = amount * values.exchangeRate
                    setFieldValue('token0Value', amount)
                    setFieldValue('token1Value', token1Value)
                    /* TODO CALCULATE DAILY REWARDS */
                    setFieldValue('dailyRewards', (amount / 100000000) * 75000)
                }}
            />
        </div>
    )
}
