import React from 'react'
import { ArrowSort } from '@styled-icons/fluentui-system-regular'
import styled from 'styled-components'
import Icon from '@components/atoms/icon'
import {FormikValues, useFormikContext} from "formik";
import {SwapProps} from "@components/organisms/swap/swap-form/types";

export const Circle = styled.div`
height: 30px;
width: 30px;
&:hover {
  border-color: #2c4a6e!important;
}
`

const handleFlip = (values: SwapProps) => {
    const {
        token0,
        token0Value,
        token1,
        token1Value
    } = values




}

export default function FlipSwap() {
  const { values, setFieldValue } = useFormikContext<SwapProps>()
  return (
    <Circle onClick={() => handleFlip(values)} className="cursor-pointer d-flex rounded-circle bg-dark border border-secondary-dark justify-content-center align-items-center">
        <Icon
            component={ArrowSort}
            size={14}
        />
    </Circle>
  )
}
