import React from 'react'
import { t } from '@lingui/macro'
import Currency from '@components/atoms/form/currency'
import { useFormikContext } from 'formik'
import { StakingProps } from '../../types'

export default function UnstakedInput() {
    const {
        values,
        initialValues,
        setFieldValue,
    } = useFormikContext<StakingProps>()

    return (
        <Currency
            name="unstakedBalance"
            label={t`Unsakted Tokens`}
            required
            currency={values.rewardSymbol}
            decimals={4}
            onChange={(e) => {
                let stakedBalance = 0 as number as number
                let unstakedBalance = Number(e.target.rawValue.split(' ')[1]) as number
                let unstakedDiff = 0 as number

                // plus
                if (unstakedBalance > initialValues.unstakedBalance) {
                    unstakedDiff = unstakedBalance - initialValues.unstakedBalance
                    stakedBalance = initialValues.stakedBalance - unstakedDiff
                // minus
                } else {
                    unstakedDiff = initialValues.unstakedBalance - unstakedBalance
                    stakedBalance = initialValues.stakedBalance + unstakedDiff
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
