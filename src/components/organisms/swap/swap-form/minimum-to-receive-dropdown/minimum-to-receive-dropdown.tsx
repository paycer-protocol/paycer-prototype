import React from 'react'
import { useFormikContext } from 'formik'
import { t } from '@lingui/macro'
import { SwapProps } from '../types'
import Input from '@components/atoms/form/input'
import DropdownComponent from '@components/atoms/dropdown/dropdown'
import calculateMinimumToReceive from '../../helper/minimum-to-receive'
import * as Styles from './Styles'
import Icon from '@components/atoms/icon'
import { ArrowDropDown } from '@styled-icons/material-outlined'

const MinimumToReceiveDropdown = () => {
    const { values, setFieldValue } = useFormikContext<SwapProps>()

    return (
        <DropdownComponent>
            <Styles.StyledDropdownToggle className="d-flex align-items-center">
                <div>{values.minimumToReceive} {values.token1.symbol}</div>
                <Icon
                    component={ArrowDropDown}
                    size={23}
                />
            </Styles.StyledDropdownToggle>
            <Styles.StyledDropdownMenu>
                <div className="d-flex justify-content-between mb-3">
                    <span>{t`Exchangerate`}</span>
                    <span>1 {values.token0.symbol} = {values.exchangeRate} {values.token1.symbol}</span>
                </div>

                <div className="d-flex justify-content-between mb-3">
                    <span>{t`Fee`}</span>
                    <span>{values.token0Value * values.feeFactor} {values.token0.symbol}</span>
                </div>

                <div className="d-flex justify-content-between mb-3">
                    <span className="w-50 d-flex align-items-center">{t`Slippage tolerance`}</span>
                    <div className="w-50 d-flex justify-content-between ">
                        <div className="w-75">
                            <Input
                                name="slippageTolerance"
                                style={{ padding: '4px 10px'}}
                                type="number"
                                value={values.slippageTolerance}
                                onChange={(e) => {
                                    let slippageTolerance = e.target.value
                                    // limit to 100 force 100
                                    if (slippageTolerance > 100) {
                                        slippageTolerance = 100
                                    }
                                    if (slippageTolerance === 0) {
                                        return
                                    }
                                    setFieldValue('slippageTolerance', slippageTolerance)
                                    calculateMinimumToReceive(values.token0Value, values.exchangeRate, slippageTolerance, values.feeFactor, setFieldValue)
                                }}
                            />
                        </div>
                        <div className="mt-2 w-25 d-flex justify-content-center">%</div>
                    </div>
                </div>
            </Styles.StyledDropdownMenu>
        </DropdownComponent>
    )
}

export default MinimumToReceiveDropdown
