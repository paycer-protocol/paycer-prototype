import React from 'react'
import { useFormikContext } from 'formik'
import { SwapVert } from '@styled-icons/material/SwapVert'
import styled from 'styled-components'
import Icon from '@components/atoms/icon'
import { SwapProps } from '@components/organisms/swap/swap-form/types'

export const Circle = styled.div`
  height: 34px;
  width: 34px;  border: 1px solid #324b68!important;
  &:hover {
    border-color: #446791!important;
  }
`

export default function FlipSwap() {
  const { values, setValues, setFieldValue } = useFormikContext<SwapProps>()

  const handleFlip = async () => {
    const {
      token0,
      token0Value,
      token1,
      token1Value,
      token0Markets,
      token1Markets,
      tradePair,
    } = values

    const nextValues = {
      ...values,
      ...{
        token0: token1,
        token1: token0,
        token0Value: token1Value,
        token1Value: token0Value,
        token1Markets: token0Markets,
        token0Markets: token1Markets,
        tradePair: {
          fromTokenAddress: token1.tokenAddress,
          toTokenAddress: token0.tokenAddress,
          amount: tradePair.amount,
        },
      }
    }


    const nextTradeContext = await values.initFactory(nextValues)
    setValues(nextValues)
    setFieldValue('tradeContext', nextTradeContext)
  }

  return (
    <Circle
      onClick={() => handleFlip()}
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
