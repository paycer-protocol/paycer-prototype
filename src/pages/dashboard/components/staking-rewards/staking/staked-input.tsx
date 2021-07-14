import React from 'react'
import { t } from '@lingui/macro'
import Currency from '@components/atoms/form/currency'
import { useFormikContext } from 'formik'
import { StakingProps } from '../types'

export default function StakedInput() {
    const {
        values,
        initialValues,
        setFieldValue,
    } = useFormikContext<StakingProps>()

    return (
        <Currency
            name="stakedBalance"
            label={t`Current Staked`}
            required
            currency={values.rewardSymbol}
            decimals={4}
            onChange={(e) => {
                let stakedBalance = Number(e.target.rawValue.split(' ')[1]) as number as number
                let unstakedBalance = 0 as number
                let stakedDiff = 0 as number

                // plus
                if (stakedBalance > initialValues.stakedBalance) {
                    stakedDiff = stakedBalance - initialValues.stakedBalance
                    unstakedBalance = initialValues.unstakedBalance - stakedDiff
                // minus
                } else {
                    stakedDiff = initialValues.stakedBalance - stakedBalance
                    unstakedBalance = initialValues.unstakedBalance + stakedDiff
                }

                const totalBalance = initialValues.stakedBalance + initialValues.unstakedBalance
                const stakeRange = stakedBalance * 100 / totalBalance

                stakedBalance = stakedBalance < 0 ? 0 : stakedBalance
                stakedBalance = stakedBalance >= totalBalance ? totalBalance : stakedBalance

                unstakedBalance = unstakedBalance < 0 ? 0 : unstakedBalance
                unstakedBalance = unstakedBalance >= totalBalance ? totalBalance : unstakedBalance

                setFieldValue('stakedBalance', stakedBalance)
                setFieldValue('unstakedBalance', unstakedBalance)
                setFieldValue('stakeRange', stakeRange)
            }}
        />
    )
}
