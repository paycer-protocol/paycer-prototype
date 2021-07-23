import React from 'react'
import { Trans } from '@lingui/macro'
import { useFormikContext } from 'formik'
import { FormattedNumber } from '@components/atoms/number'
import { InvestFormFields } from '../types'
import {normalizeFilename} from "../../../../helper/filename";

export default function InvestFee() {
  const { values, initialValues, dirty } = useFormikContext<InvestFormFields>()

  let fee = 0 as number
  let diff = 0 as number

  if (values.investBalance > initialValues.investBalance) {
      diff = values.investBalance - initialValues.investBalance
      fee = diff * values.investFee / 100;
  } else {
      diff = initialValues.investBalance - values.investBalance
      fee = diff * values.withdrawFee / 100;
  }

  if (fee === 0 || !dirty) {
    return null
  }


  return (
    <div className="text-center">
      <small className="text-muted me-2"><Trans>Fee</Trans></small>
      <small>
          +&nbsp;
          <FormattedNumber
              value={fee}
              minimumFractionDigits={2}
              maximumFractionDigits={4}
          />
          &nbsp;{values.feeSymbol}
          <img width="28" className="ms-2" style={{marginTop: '-4px'}} src={`assets/icons/${normalizeFilename(values.feeSymbol)}.svg`} alt={values.feeSymbol} />
      </small>
    </div>
  )
}
