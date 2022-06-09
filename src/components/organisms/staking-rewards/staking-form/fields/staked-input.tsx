import React from 'react'
import { useFormikContext } from 'formik'
import { StakingProps } from '../../types'
import TokenInput from "@components/molecules/token-input";
import {useDapp} from "@context/dapp-context";

export default function StakedInput() {
    const {
        values,
        initialValues,
        setFieldValue,
    } = useFormikContext<StakingProps>()

    const { pcrBalance } = useDapp()

    const handleChange = (value: number) => {
        let stakedBalance = value
        let tokenBalanceAfter = 0 as number
        let stakedDiff = 0 as number

        // plus
        if (stakedBalance > initialValues.stakedBalance) {
            stakedDiff = stakedBalance - initialValues.stakedBalance
            tokenBalanceAfter = initialValues.tokenBalanceAfter - stakedDiff
        } else {
            stakedDiff = initialValues.stakedBalance - stakedBalance
            tokenBalanceAfter = initialValues.tokenBalanceAfter + stakedDiff
        }

        const totalBalance = initialValues.stakedBalance + initialValues.tokenBalanceAfter
        const stakeRange = stakedBalance * 100 / totalBalance

        stakedBalance = stakedBalance < 0 ? 0 : stakedBalance
        stakedBalance = stakedBalance > totalBalance ? totalBalance : stakedBalance

        tokenBalanceAfter = tokenBalanceAfter < 0 ? 0 : tokenBalanceAfter
        tokenBalanceAfter = tokenBalanceAfter > totalBalance ? totalBalance : tokenBalanceAfter

        setFieldValue('stakedBalance', stakedBalance)
        setFieldValue('tokenBalanceAfter', tokenBalanceAfter)
        setFieldValue('stakeRange', stakeRange)
    }

    return (
        <TokenInput
            name="stakedBalance"
            required
            currency={values.rewardSymbol}
            handleChange={handleChange}
            raiseMax
            autoFocus
            balance={pcrBalance}
            decimals={4}
            value={values.stakedBalance}
        />
    )
}
