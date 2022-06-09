import React from 'react'
import {t} from '@lingui/macro'
import { useFormikContext } from 'formik'
import { SwapProps } from '../types'
import Input from '@components/atoms/form/input'

export default function SlippageTollerance() {
    const { values, setValues, setFieldValue } = useFormikContext<SwapProps>()

    return (
        <div className="d-flex justify-content-between w-100">
            <label className="text-muted mb-2 w-100">{t`Slippage tollerance`}</label>
            <Input
                name="slippage"
                style={{ padding: '4px 10px' }}
                className="card bg-transparent mb-0"
                type="number"
            />
        </div>

    )
}

