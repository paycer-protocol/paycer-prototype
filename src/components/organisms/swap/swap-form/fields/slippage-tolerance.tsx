import React from 'react'
import { useFormikContext } from 'formik'
import { SwapProps } from '../../types'
import Input from "@components/atoms/form/input";
import {t} from "@lingui/macro";

export default function InvestRangeSlider() {
    const { values, initialValues, setFieldValue, dirty, handleChange } = useFormikContext<SwapProps>()

    return (
        <div className="d-flex justify-content-between">
            <div className="mt-3">{t`Slippage Tolerance`}</div>
            <div className="w-25 d-flex">
                <Input
                    name="slippageTolerance"
                    type="number"
                    value={values.slippageTolerance}
                    onChange={(e) => {

                        const exchangeRateTo = 1.37
                        // TODO CALCULATE TO VALUE LIKE IN FROM INPUT
                        const toValue = values.fromValue * exchangeRateTo

                        let slippageTolerance = e.target.value

                        if (slippageTolerance > 100) {
                            slippageTolerance = 100
                        }

                        setFieldValue('slippageTolerance', slippageTolerance)

                        if (slippageTolerance === 0) {
                            return
                        }

                        const slippageToleranceResult = toValue * slippageTolerance / 100
                        setFieldValue('slippageToleranceResult', slippageToleranceResult)
                        setFieldValue('toValue', toValue - slippageToleranceResult)
                    }}
                />
                <div className="mt-3 ms-3">%</div>
            </div>
        </div>
    )
}
