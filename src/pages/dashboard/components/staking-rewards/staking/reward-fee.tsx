import React from 'react'
import { Trans } from '@lingui/macro'
import { useFormikContext } from 'formik'
import { FormattedNumber } from '@components/atoms/number'
import { StakingProps } from '../types'

export default function RewardFee() {
  const { values, initialValues, dirty } = useFormikContext<StakingProps>()

  if (!dirty) {
      return null
  }

  let fee = 0

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
          &nbsp;{values.rewardSymbol}
      </small>
    </div>
  )
}
