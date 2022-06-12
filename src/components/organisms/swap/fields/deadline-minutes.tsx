import React from 'react'
import {t} from '@lingui/macro'
import { useFormikContext } from 'formik'
import { SwapProps } from '../types'
import Input from '@components/atoms/form/input'
import useSwap from "@hooks/use-swap";

export default function DeadlineMinutes() {
    const { values, setValues, setFieldValue } = useFormikContext<SwapProps>()

    const handleChange = async (e) => {
        let deadlineMinutes = e.target.value

        const nextValues = {
            ...values,
            ...{
                tradeSettings: {
                    ...values.tradeSettings,
                    ... { deadlineMinutes }
                },
            }
        }

        if (values.token0 && values.token1) {
            setFieldValue('isReloading', true)
            const nextTradeContext = await values.initFactory(nextValues, setFieldValue, setValues)
            setValues(nextValues)
            setFieldValue('tradeContext', nextTradeContext)
            setFieldValue('isReloading', false)
        } else {
            setValues(nextValues)
        }
    }

    return (
        <div className="d-flex justify-content-between w-100">
            <label className="text-muted mb-2 w-100">{t`Deadline minutes`}</label>
            <Input
                name="tradeSettings.deadlineMinutes"
                className="card bg-transparent mb-0"
                style={{ padding: '4px 10px' }}
                type="number"
                value={values.tradeSettings.deadlineMinutes}
                onChange={handleChange}
            />
        </div>

    )
}

