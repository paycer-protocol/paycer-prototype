import React from 'react'
import { Trans } from '@lingui/macro'
import { useFormikContext } from 'formik'
import { InvestFormFields } from '../types'

export default function DailyRewards() {
  const { values } = useFormikContext<InvestFormFields>()

  return (
    <div className="d-flex flex-column">
      <span className="text-muted">
          <Trans>Daily rewards</Trans>
      </span>
      <span>+ {values.dailyRewards} {values.rewardSymbol}</span>
    </div>
  )
}
