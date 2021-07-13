import React from 'react'
import { Trans } from '@lingui/macro'
import { InvestProps } from '../types'
import { useFormikContext } from 'formik'
import { InvestFormFields } from '../types'

export default function InvestFee({ feeSymbol }: InvestProps) {
  const { values } = useFormikContext<InvestFormFields>()
  const feeRate = values.submitAction === 'invest' ? values.investFee : values.withdrawFee

  return (
    <div className="text-center">
      <small className="text-muted me-2"><Trans>Fee</Trans></small>
      <small>+&nbsp;{feeRate}&nbsp;{feeSymbol}</small>
    </div>
  )
}
