import React, {useEffect} from 'react'
import { useFormikContext } from 'formik'
import { SwapProps, SwapTokenInputProps } from '../types'
import TokenInput from '@components/molecules/token-input'
import useToken from "@hooks/use-token"
import useSwap from "@hooks/use-swap"
import {formatUnits } from "@ethersproject/units"

export default function Token0Input(props: SwapTokenInputProps) {
    const { readOnly } = props
    const { values, setFieldValue } = useFormikContext<SwapProps>()
    const { tokenBalance: balance } = useToken(values?.fromToken?.symbol)

    const {
        fetchQuote
    } = useSwap()

    const handleChange = async (value: number) => {
        setFieldValue('fromTokenValue', value)
        if (values.toToken && value) {
            setFieldValue('isReloading', true)
            try {
                const result = await fetchQuote({ fromToken: values.fromToken, toToken: values.toToken, amount: value.toString() })
                const toTokenValue = formatUnits(result?.toTokenAmount?.toString(), values.toToken.decimals)
                setFieldValue('fee', value / 100)
                setFieldValue('toTokenValue', toTokenValue)
                setFieldValue('isReloading', false)
            } catch(e) {
                setFieldValue('isReloading', false)
            }
        }
    }

    useEffect(() => {
        if (!values.toToken || !values.fromTokenValue || !values.fromToken || readOnly) {
            return
        }
        const fetch = async () => {
            if (values.isSwapping) {
                return
            }
            try {
                const result = await fetchQuote({ fromToken: values.fromToken, toToken: values.toToken, amount: values.fromTokenValue?.toString() })
                const toTokenValue = formatUnits(result?.toTokenAmount?.toString(), values.toToken.decimals)
                if (toTokenValue !== values.toTokenValue?.toString()) {
                    setFieldValue('toTokenValue', toTokenValue)
                    setFieldValue('fee', values.fromTokenValue / 100)
                    setFieldValue('quoteHasChangedAlert', true)
                }
            } catch(e) {
                console.log(e.message)
            }
        }
        const interval = setInterval(() => {
            fetch()
        }, 5000)
        return () => clearInterval(interval)
    }, [values?.toTokenValue, values?.fromTokenValue, values?.fromToken, values?.toToken, values?.isSwapping])

    return (
        <TokenInput
            name="fromTokenValue"
            disabled={!values?.fromToken && !values?.toToken}
            required
            currency={values?.fromToken?.symbol}
            handleChange={handleChange}
            raiseMax={!readOnly}
            balance={balance}
            decimals={6}
            readOnly={values.isReloading || readOnly}
        />
    )
}

