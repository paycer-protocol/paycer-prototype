import React from 'react'
import { t } from '@lingui/macro'
import Currency from '@components/atoms/form/currency'
import { useFormikContext } from 'formik'
import { BigNumber } from '@ethersproject/bignumber'
import { StakingProps } from '../../types'

export default function TokenInput() {
    const {
        values,
        initialValues,
        setFieldValue,
    } = useFormikContext<StakingProps>()

    return (
        <Currency
            name="tokenBalance"
            label={t`Token balance`}
            required
            currency={values.rewardSymbol}
            decimals={4}
            onChange={(e) => {
                let stakedBalance = BigNumber.from(0)
                let tokenBalance = BigNumber.from(e.target.rawValue.split(' ')[1])
                let tokenDiff = BigNumber.from(0)

                // plus
                if (tokenBalance.gt(initialValues.tokenBalance)) {
                    tokenDiff = tokenBalance.sub(initialValues.tokenBalance)
                    stakedBalance = initialValues.stakedBalance.sub(tokenDiff)
                // minus
                } else {
                    tokenDiff = initialValues.tokenBalance.sub(tokenBalance)
                    stakedBalance = initialValues.stakedBalance.add(tokenDiff)
                }

                const totalBalance = initialValues.stakedBalance.add(initialValues.tokenBalance)
                const stakeRange = stakedBalance.mul(100).div(totalBalance)

                stakedBalance = stakedBalance.lt(0)  ? BigNumber.from(0) : stakedBalance
                stakedBalance = stakedBalance.gt(totalBalance) ? totalBalance : stakedBalance

                tokenBalance = tokenBalance.lt(0)  ? BigNumber.from(0) : tokenBalance
                tokenBalance = tokenBalance.gt(totalBalance) ? totalBalance : tokenBalance

                setFieldValue('stakedBalance', stakedBalance)
                setFieldValue('tokenBalance', tokenBalance)
                setFieldValue('stakeRange', stakeRange)
            }}
        />
    )
}
