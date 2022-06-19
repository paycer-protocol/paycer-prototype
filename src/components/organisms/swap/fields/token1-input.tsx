import React, {useEffect} from 'react'
import { useFormikContext } from 'formik'
import { SwapProps, SwapTokenInputProps } from '../types'
import TokenInput from '@components/molecules/token-input'
import useToken from "@hooks/use-token";

export default function Token1Input(props: SwapTokenInputProps) {
    const { values } = useFormikContext<SwapProps>()
    const { tokenBalance: balance, fetchERC20Balances} = useToken(values?.toToken?.symbol)

    useEffect(() => {
        fetchERC20Balances()
    }, [values?.toTokenValue, values?.fromTokenValue, values?.fromTokenValue])

    return (
        <TokenInput
            readOnly
            name="toTokenValue"
            disabled={!values?.fromToken && !values?.toToken}
            required
            currency={values?.toToken?.symbol}
            balance={balance}
            decimals={6}
        />
    )
}
