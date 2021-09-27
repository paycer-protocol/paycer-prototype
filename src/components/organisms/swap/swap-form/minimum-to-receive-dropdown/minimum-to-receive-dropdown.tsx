import React from 'react'
import { useFormikContext } from 'formik'
import { SwapProps } from '../../types'
import Input from "@components/atoms/form/input";
import {t} from "@lingui/macro";
import DropdownComponent from "@components/atoms/dropdown/dropdown";
import calculateMinimumToReceive from '../../helper/minimum-to-receive'
import * as Styles from './Styles'
const MinimumToReceiveDropdown = () => {
    const { values, initialValues, setFieldValue, dirty, handleChange } = useFormikContext<SwapProps>()

    return (
        <div className="d-flex justify-content-between align-items-center font-size-lg fw-lighter">
            <div>{t`Minimum to receive`}</div>
            <DropdownComponent className="d-inline-block mr-2 mb-2">
                <Styles.StyledDropdownToggle>
                    {values.minimumToReceive} {values.token1}
                </Styles.StyledDropdownToggle>
                <Styles.StyledDropdownMenu>
                    <div className="d-flex justify-content-between mb-3">
                        <span>{t`Exchangerate`}</span>
                        <span>1 {values.token0} = {values.exchangeRate} {values.token1}</span>
                    </div>

                    <div className="d-flex justify-content-between mb-3">
                        <span>{t`Fee`}</span>
                        <span>{values.token0Value * values.feeFactor} {values.token0}</span>
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
        </div>
    )
}

export default MinimumToReceiveDropdown