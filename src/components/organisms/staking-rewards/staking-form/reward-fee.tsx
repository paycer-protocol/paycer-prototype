import React from 'react'
import { Trans } from '@lingui/macro'
import { useFormikContext } from 'formik'
import { FormattedNumber } from '@components/atoms/number'
import { BigNumber } from '@ethersproject/bignumber'
import { StakingProps } from '../types'

export default function RewardFee() {
  const { values, initialValues, dirty } = useFormikContext<StakingProps>()

  let fee = 0
  let diff = BigNumber.from(0)

  if (values.stakedBalance.gt(initialValues.stakedBalance)) {
    diff = values.stakedBalance.sub(initialValues.stakedBalance)
    fee = diff.toNumber() * values.depositFee / 100
  } else {
    diff = initialValues.stakedBalance.sub(values.stakedBalance)
    fee = diff.toNumber() * values.withdrawFee / 100
  }

  if (fee <= 0 || !dirty) {
    return null
  }

  return (
    <div className="text-center">
      <small className="text-muted me-2">
        <Trans>Fee</Trans>
      </small>
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
