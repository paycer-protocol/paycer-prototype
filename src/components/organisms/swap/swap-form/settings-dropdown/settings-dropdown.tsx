import React from 'react'
import styled from 'styled-components'
import * as Styles from './Styles'
import { useFormikContext } from 'formik'
import { t } from '@lingui/macro'
import { SwapProps } from '../types'
import Input from '@components/atoms/form/input'
import calculateMinimumToReceive from '../../helper/minimum-to-receive'
import Icon from '@components/atoms/icon'
import DropdownComponent from "@components/atoms/dropdown/dropdown";
import { Settings } from '@styled-icons/fluentui-system-regular'

const SettingsDropdown = () => {
    const { values, setFieldValue } = useFormikContext<SwapProps>()

    return (
        <DropdownComponent className="">
            <Styles.StyledDropdownToggle>
                <div className="cursor-pointer card shadow-none mb-2 bg-transparent">
                    <div className="card-body bg-transparent d-flex justify-content-center p-md-3 p-2">
                        <div className="d-none d-md-block">
                            <Icon component={Settings} size={23} style={{width: '36px'}}/>
                        </div>
                        <div className="d-md-none">
                            <Icon component={Settings} size={24} style={{width: '27px'}}/>
                        </div>
                    </div>
                </div>
            </Styles.StyledDropdownToggle>
            <Styles.StyledDropdownMenu className="bg-dark border">
                <h4 className="mb-4">Transaction-Settings</h4>
                <div className="d-flex justify-content-between">
                    <span className="w-50 d-flex align-items-center text-muted">{t`Slippage tolerance`}</span>
                    <div className="w-50 d-flex justify-content-between ">
                        <div className="w-100 d-flex align-items-center">
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
                                    calculateMinimumToReceive(values.token0Value, values.token1Value, slippageTolerance, values.feeFactor, setFieldValue)
                                }}
                            />
                            &nbsp;&nbsp;%
                        </div>
                    </div>
                </div>
            </Styles.StyledDropdownMenu>
        </DropdownComponent>
    )
}

export default SettingsDropdown
