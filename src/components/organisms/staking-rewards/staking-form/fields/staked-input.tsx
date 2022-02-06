import React from 'react'
import { t } from '@lingui/macro'
import Currency from '@components/atoms/form/currency'
import { useFormikContext } from 'formik'
import { StakingProps } from '../../types'

export default function StakedInput() {
    const {
        values,
        initialValues,
        setFieldValue,
    } = useFormikContext<StakingProps>()

    return (
        <Currency
            name="stakedBalance"
            className="form-control"
            label={values.stakedBalance !== initialValues.stakedBalance  ? t`Staked after` : t`Current Staked`}
            required
            max={10}
            currency={values.rewardSymbol}
            decimals={2}
            onChange={(e) => {
                let stakedBalance = Number(e.target.rawValue.split(' ')[1])
                let tokenBalance = 0 as number
                let stakedDiff = 0 as number

                // plus
                if (stakedBalance > initialValues.stakedBalance) {
                    stakedDiff = stakedBalance - initialValues.stakedBalance
                    tokenBalance = initialValues.tokenBalance - stakedDiff
                // minus
                } else {
                    stakedDiff = initialValues.stakedBalance - stakedBalance
                    tokenBalance = initialValues.tokenBalance + stakedDiff
                }

                const totalBalance = initialValues.stakedBalance + initialValues.tokenBalance
                const stakeRange = stakedBalance * 100 / totalBalance

                stakedBalance = stakedBalance < 0 ? 0 : stakedBalance
                stakedBalance = stakedBalance > totalBalance ? totalBalance : stakedBalance

                tokenBalance = tokenBalance < 0 ? 0 : tokenBalance
                tokenBalance = tokenBalance > totalBalance ? totalBalance : tokenBalance

                setFieldValue('stakedBalance', stakedBalance)
                setFieldValue('tokenBalance', tokenBalance)
                setFieldValue('stakeRange', stakeRange)
            }}
        />
    )
}
