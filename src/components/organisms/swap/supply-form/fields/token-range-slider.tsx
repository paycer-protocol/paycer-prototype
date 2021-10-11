import React from 'react'
import Slider from 'rc-slider'
import { useFormikContext } from 'formik'
import { SupplyProps} from "@components/organisms/swap/supply-form/types";
import useToken from "@hooks/use-token";

export default function InvestRangeSlider() {
    const { values, setFieldValue } = useFormikContext<SupplyProps>()

    const token0Balance = useToken(values.marketPair.token0.symbol).tokenBalance()

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
                value={values.token0Value * 100 / token0Balance}
                onChange={(value) => {
                    const amount = token0Balance * value / 100
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
