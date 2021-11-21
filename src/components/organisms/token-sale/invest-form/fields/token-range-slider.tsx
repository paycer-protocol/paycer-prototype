import React from 'react'
import Slider from 'rc-slider'
import { useFormikContext } from 'formik'
import calculateWillReceive from '../../helper/calculate-will-receive'
import { InvestFormProps} from '@components/organisms/token-sale/invest-form/types'
import useToken from '@hooks/use-token'

export default function InvestRangeSlider() {
    const { values, setFieldValue } = useFormikContext<InvestFormProps>()

    const token0Balance = useToken(values.token0.symbol).tokenBalance()

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
                    const willReceive = calculateWillReceive(values.token0, amount, values.referralCode)
                    setFieldValue('willReceive', willReceive)
                    setFieldValue('token0Value', amount)
                }}
            />
        </div>
    )
}
