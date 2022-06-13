import React from 'react'
import {useFormikContext} from 'formik'
import {SwapVert} from '@styled-icons/material/SwapVert'
import styled, { css } from 'styled-components'
import Icon from '@components/atoms/icon'
import {SwapProps} from '@components/organisms/swap/types'
import {CurrencyFieldProps} from "@components/atoms/form/currency";

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

    const handleFlip = async () => {
        const { toToken, toTokenValue, fromToken, fromTokenValue } = values
        if (!toToken && !fromToken) {
            return
        }
        setFieldValue('fromToken', toToken)
        setFieldValue('toToken', fromToken)
        setFieldValue('fromTokenValue', toTokenValue)
        setFieldValue('toTokenValue', fromTokenValue)
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
