import React from 'react'
import { SwapVert } from '@styled-icons/material'
import styled from 'styled-components'
import Icon from '@components/atoms/icon'
import {FormikValues, useFormikContext} from "formik";
import {SwapProps} from "@components/organisms/swap/swap-form/types";

export const Circle = styled.div`
height: 31px;
width: 31px;  border: 1px solid #324b68!important;
&:hover {
  border-color: #446791!important;
}
`

export default function FlipSwap() {
    const { values, setFieldValue } = useFormikContext<SwapProps>()

    const handleFlip = () => {
        const {
            token0,
            token0Value,
            token1,
            token1Value,
            token0Balance,
            token1Balance,
            token0Markets,
            token1Markets
        } = values
        setFieldValue('token0', token1)
        setFieldValue('token1', token0)
        setFieldValue('token0Value', token1Value)
        setFieldValue('token1Value', token0Value)
        setFieldValue('token1Balance', token0Balance)
        setFieldValue('token0Balance', token1Balance)
        setFieldValue('token1Markets', token0Markets)
        setFieldValue('token0Markets', token1Markets)
    }

  return (
    <Circle onClick={() => handleFlip()} className="cursor-pointer d-flex rounded-circle justify-content-center bg-dark align-items-center">
        <Icon
            component={SwapVert}
            size={20}
            color="#FFF"
        />
    </Circle>
  )
}
