import React from 'react'
import { useFormikContext } from 'formik'
import { InvestFormFields } from './types'

export default function DailyInterest() {
  const { values } = useFormikContext<InvestFormFields>()

  return (
    <div className="d-flex flex-column">
      <span className="text-muted">
          Daily interest
      </span>
      <span>+ {values.dailyInterest} {values.investSymbol}</span>
    </div>
  )
}
