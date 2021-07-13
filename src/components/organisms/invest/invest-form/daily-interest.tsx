import React from 'react'
import { Trans } from '@lingui/macro'
import { useFormikContext } from 'formik'
import { InvestFormFields } from '../types'

export default function DailyInterest() {
  const { values } = useFormikContext<InvestFormFields>()

  return (
    <div className="d-flex flex-column">
      <span className="text-muted">
          <Trans>Daily interest</Trans>
      </span>
      <span>+ {values.dailyInterest} {values.investSymbol}</span>
    </div>
  )
}
