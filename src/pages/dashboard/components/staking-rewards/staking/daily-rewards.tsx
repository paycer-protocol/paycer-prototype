import React from 'react'
import { Trans } from '@lingui/macro'
import { useFormikContext } from 'formik'
import { FormattedNumber } from '@components/atoms/number'
import { StakingProps } from '../types'

export default function DailyRewards() {
    const { values } = useFormikContext<StakingProps>()

    return (
        <div className="d-flex flex-column">
              <span className="text-muted">
                  <Trans>Daily rewards</Trans>
              </span>
            <span>
              +&nbsp;
                <FormattedNumber
                    value={values.stakedBalance * values.rewardRate / 100 / 365}
                    minimumFractionDigits={2}
                    maximumFractionDigits={4}
                />
                &nbsp;{values.rewardSymbol}
            </span>
        </div>
    )
}
