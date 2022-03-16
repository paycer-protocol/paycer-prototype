import React from 'react'
import {t} from '@lingui/macro'
import { useFormikContext } from 'formik'
import { SwapProps } from '../types'
import Input from '@components/atoms/form/input'
import useSwap from "@hooks/use-swap";

export default function SlippageTollerance() {
    const { values, setValues, setFieldValue } = useFormikContext<SwapProps>()

    const {
        initFactory
    } = useSwap()

    const handleChange = async (e) => {
        let slippage = e.target.value
        if (slippage > 25) {
            slippage = 25
        }

        if (slippage < 0) {
            slippage = 0
        }

        const nextValues = {
            ...values,
            ...{
                tradeSettings: {
                    ...values.tradeSettings,
                    ... { slippage }
                },
            }
        }

        if (values.token0 && values.token1) {
            setFieldValue('isLoading', true)
            const nextTradeContext = await initFactory(nextValues, setFieldValue, setValues)
            setValues(nextValues)
            setFieldValue('tradeContext', nextTradeContext)
            setFieldValue('isLoading', false)
        } else {
            setValues(nextValues)
        }
    }

    return (
        <div className="d-flex justify-content-between w-100">
            <label className="text-muted mb-2 w-100">{t`Slippage tollerance`}</label>
            <Input
                name="tradeSettings.slippage"
                style={{ padding: '4px 10px' }}
                className="card bg-transparent mb-0"
                type="number"
                value={values.tradeSettings.slippage}
                onChange={handleChange}
            />
        </div>

    )
}

