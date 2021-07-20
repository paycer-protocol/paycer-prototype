import React from 'react'
import { t } from '@lingui/macro'
import Currency from '@components/atoms/form/currency'
import { useFormikContext } from 'formik'
import { BigNumber } from '@ethersproject/bignumber'
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
            label={t`Current Staked`}
            required
            max={10}
            currency={values.rewardSymbol}
            decimals={4}
            onChange={(e) => {
                let stakedBalance = BigNumber.from(e.target.rawValue.split(' ')[1])
                let tokenBalance = BigNumber.from(0)
                let stakedDiff = BigNumber.from(0)

                // plus
                if (stakedBalance.gt(initialValues.stakedBalance)) {
                    stakedDiff = stakedBalance.sub(initialValues.stakedBalance)
                  tokenBalance = initialValues.tokenBalance.sub(stakedDiff)
                // minus
                } else {
                    stakedDiff = initialValues.stakedBalance.sub(stakedBalance)
                    tokenBalance = initialValues.tokenBalance.add(stakedDiff)
                }

                const totalBalance = initialValues.stakedBalance.add(initialValues.tokenBalance)
                const stakeRange = stakedBalance.mul(100).div(totalBalance)

                stakedBalance = stakedBalance.lt(0) ? BigNumber.from(0) : stakedBalance
                stakedBalance = stakedBalance.gt(totalBalance) ? totalBalance : stakedBalance

                tokenBalance = tokenBalance.lt(0) ? BigNumber.from(0) : tokenBalance
                tokenBalance = tokenBalance.gt(totalBalance) ? totalBalance : tokenBalance

                setFieldValue('stakedBalance', stakedBalance)
                setFieldValue('tokenBalance', tokenBalance)
                setFieldValue('stakeRange', stakeRange)
            }}
        />
    )
}
