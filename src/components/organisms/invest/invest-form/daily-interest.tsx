import React from 'react'
import { Trans } from '@lingui/macro'
import { useFormikContext } from 'formik'
import { FormattedNumber } from '@components/atoms/number'
import { InvestFormFields } from '../types'

export default function DailyInterest() {
  const { values } = useFormikContext<InvestFormFields>()

  return (
    <div className="d-flex flex-column">
      <span className="text-muted">
          <Trans>Daily interest</Trans>
      </span>
      <span>
          +&nbsp;
          <FormattedNumber
              value={values.investBalance * values.interestRate / 100 / 365}
              minimumFractionDigits={2}
              maximumFractionDigits={4}
          />
          &nbsp;{values.investSymbol}
      </span>
    </div>
  )
}
