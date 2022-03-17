import React from 'react'
import {t} from '@lingui/macro'
import { useFormikContext } from 'formik'
import { SwapProps } from '../types'
import useSwap from "@hooks/use-swap";

export default function DisableMultihops() {
    const { values, setValues, setFieldValue } = useFormikContext<SwapProps>()

    const handleChange = async (e) => {
        let disableMultihops = e.target.value
        const nextValues = {
            ...values,
            ...{
                tradeSettings: {
                    ...values.tradeSettings,
                    ... { disableMultihops }
                },
            }
        }

        if (values.token0 && values.token1) {
            setFieldValue('isLoading', true)
            const nextTradeContext = await values.initFactory(nextValues, setFieldValue, setValues)
            setValues(nextValues)
            setFieldValue('tradeContext', nextTradeContext)
            setFieldValue('isLoading', false)
        } else {
            setValues(nextValues)
        }
    }

    return (
    <label className="custom-checkbox me-4">
        <span className="custom-checkbox-label text-muted" style={{fontSize: '14px'}}>{t`Disable Multihops`}</span>
        <input
            name="tradeSettings.disableMultihops"
            style={{ padding: '4px 10px' }}
            type="checkbox"
            onChange={handleChange}
        />
        <span className="checkmark card mb-0" />
    </label>
    )
}

