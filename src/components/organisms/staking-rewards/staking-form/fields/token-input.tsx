import React from 'react'
import { t } from '@lingui/macro'
import Currency from '@components/atoms/form/currency'
import { useFormikContext } from 'formik'
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
                let stakedBalance = 0 as number as number
                let tokenBalance = Number(e.target.rawValue.split(' ')[1]) as number
                let tokenDiff = 0 as number

                // plus
                if (tokenBalance > initialValues.tokenBalance) {
                    tokenDiff = tokenBalance - initialValues.tokenBalance
                    stakedBalance = initialValues.stakedBalance - tokenDiff
                // minus
                } else {
                    tokenDiff = initialValues.tokenBalance - tokenBalance
                    stakedBalance = initialValues.stakedBalance + tokenDiff
                }

                const totalBalance = initialValues.stakedBalance + initialValues.tokenBalance
                const stakeRange = stakedBalance * 100 / totalBalance

                stakedBalance = stakedBalance < 0 ? 0 : stakedBalance
                stakedBalance = stakedBalance >= totalBalance ? totalBalance : stakedBalance

                tokenBalance = tokenBalance < 0 ? 0 : tokenBalance
                tokenBalance = tokenBalance >= totalBalance ? totalBalance : tokenBalance

                setFieldValue('stakedBalance', stakedBalance)
                setFieldValue('tokenBalance', tokenBalance)
                setFieldValue('stakeRange', stakeRange)
            }}
        />
    )
}
