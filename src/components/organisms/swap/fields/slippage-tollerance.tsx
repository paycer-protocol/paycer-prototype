import React from 'react'
import { t } from '@lingui/macro'
import { useFormikContext } from 'formik'
import Input from '@components/atoms/form/input'
import { SwapProps } from '../types'

export default function SlippageTollerance() {
  const { values, setFieldValue } = useFormikContext<SwapProps>()

  const handleChange = async (e) => {
    const slippage = e.target.value
    setFieldValue('slippage', slippage)
  }

  return (
    <div className="d-flex justify-content-between w-100">
      <label className="text-muted mb-2 w-100">{t`Slippage tollerance`}</label>
      <Input
        name="slippage"
        style={{ padding: '4px 10px' }}
        className="card bg-transparent mb-0"
        type="number"
        value={values.slippage}
        onChange={handleChange}
      />
    </div>
  )
}
