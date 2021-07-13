import React from 'react'
import { Trans } from '@lingui/macro'
import { InvestProps } from '../types'
import { useFormikContext } from 'formik'
import { InvestFormFields } from '../types'

export default function InvestFee({ feeSymbol }: InvestProps) {
  const { values, initialValues, dirty } = useFormikContext<InvestFormFields>()

  if (!dirty) {
      return null
  }

  let fee = 0
  if (values.submitAction === 'invest') {
      const investAmount = values.investBalance - initialValues.investBalance
      fee = investAmount * values.investFee / 100;
  } else {
      const withdrawAmount = initialValues.investBalance - values.investBalance
      fee = withdrawAmount * values.withdrawFee / 100;
  }


  return (
    <div className="text-center">
      <small className="text-muted me-2"><Trans>Fee</Trans></small>
      <small>+&nbsp;{Number(fee).toFixed(3)}&nbsp;{feeSymbol}</small>
    </div>
  )
}
