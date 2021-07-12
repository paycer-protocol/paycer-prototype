import React from 'react'
import { useFormikContext } from 'formik'
import { InvestFormFields } from '../types'

export default function DailyRewards() {
  const { values } = useFormikContext<InvestFormFields>()

  return (
    <div className="d-flex flex-column">
      <span className="text-muted">
          Daily rewards
      </span>
      <span>+ {values.dailyRewards} {values.rewardSymbol}</span>
    </div>
  )
}
