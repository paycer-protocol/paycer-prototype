import React from 'react'
import {useFormikContext} from 'formik'
import {SwapVert} from '@styled-icons/material/SwapVert'
import styled, { css } from 'styled-components'
import Icon from '@components/atoms/icon'
import {SwapProps} from '@components/organisms/swap/types'
import {CurrencyFieldProps} from '@components/atoms/form/currency'
import {formatUnits} from '@ethersproject/units'
import useSwap from '@hooks/use-swap'

interface CircleProps {
    isDisabled?: boolean
}

export const Circle = styled.div<CircleProps>`
  height: 34px;
  width: 34px;  border: 1px solid #324b68!important;
  &:hover {
    border-color: #446791!important;
  }
  ${props => props.isDisabled && css`
    opacity: .5;
  `}
`

export default function FlipSwap() {
    const {values, setValues, setFieldValue} = useFormikContext<SwapProps>()

    const {
        fetchQuote
    } = useSwap()

    const handleFlip = async () => {
        const { toToken: fromToken, toTokenValue: fromTokenValue, fromToken: toToken } = values
        if (!toToken && !fromToken) {
            return
        }

        setFieldValue('fromToken', fromToken)
        setFieldValue('toToken', toToken)

        if (fromTokenValue) {
            try {
                setFieldValue('isReloading', true)
                const result = await fetchQuote({ fromToken, toToken, amount: fromTokenValue.toString() })
                const toTokenValue = formatUnits(result?.toTokenAmount.toString(), toToken.decimals)
                setFieldValue('fee', Number(fromTokenValue) / 100)
                setFieldValue('fromTokenValue', fromTokenValue)
                setFieldValue('toTokenValue', toTokenValue)
            } catch(e) {
                console.log('flipswap')
            } finally {
                setFieldValue('isReloading', false)
            }
        }
    }

    return (
        <Circle
            onClick={() => handleFlip()}
            isDisabled={!values.toToken && !values.fromToken}
            className="cursor-pointer d-flex rounded-circle justify-content-center bg-dark align-items-center"
        >
            <Icon
                component={SwapVert}
                size={20}
                color="#FFF"
            />
        </Circle>
    )
}
