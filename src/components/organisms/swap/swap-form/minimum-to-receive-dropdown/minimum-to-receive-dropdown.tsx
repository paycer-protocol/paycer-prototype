import React, {useState} from 'react'
import styled from 'styled-components'
import { useFormikContext } from 'formik'
import { t } from '@lingui/macro'
import { SwapProps } from '../types'
import Input from '@components/atoms/form/input'
import calculateMinimumToReceive from '../../helper/minimum-to-receive'
import Icon from '@components/atoms/icon'
import { ArrowDropDown, ArrowDropUp } from '@styled-icons/material'
import CurrencyIcon from "@components/atoms/currency-icon";
import {FormattedNumber} from "../../../../atoms/number/formatted-number";

export const Header = styled.div`
  .card-body { padding: 12px 15px 10px 15px;  }
`
export const Content = styled.div`
    z-index: 2; 
    border-top-left-radius: 0; 
    border-top-right-radius: 0;
    margin-top: -4px;
    .card-body { padding: 15px 15px 10px 15px;  }
`


const MinimumToReceiveDropdown = () => {
    const { values, setFieldValue } = useFormikContext<SwapProps>()
    const [open, setOpen] = useState(false)

    return (
        <div className="position-relative">
            <Header className={`cursor-pointer card shadow-none mb-0  ${open ? 'bg-dark border-bottom-0' : ''}`}>
                <div className="card-body">
                    <div onClick={() => setOpen(!open)} className="d-flex align-items-center justify-content-between w-100">
                        <div className="me-2 text-muted">1 {values.token0.symbol} = {values.exchangeRate} {values.token1.symbol}</div>
                        <Icon
                            component={open ? ArrowDropUp : ArrowDropDown}
                            size={25}
                            style={{position: 'relative', top: '-1px'}}
                        />
                    </div>
                </div>
            </Header>
            {open &&
            <Content className="cursor-pointer card shadow-none mb-2 bg-dark border-top-0 position-absolute w-100">
                <div className="card-body">
                    <div className="d-flex justify-content-between border-bottom mb-4 pb-4">
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
            calculateMinimumToReceive(values.token0Value, values.exchangeRate, slippageTolerance, values.feeFactor, setFieldValue)
            }}
            />
            &nbsp;&nbsp;%
            </div>
            </div>
            </div>
                    <div className="d-flex justify-content-between mb-2">
                        <span className="text-muted">{t`Minimum received`}</span>
                        <span className="d-flex align-items-center">
                            <FormattedNumber
                                value={values.minimumToReceive}
                                minimumFractionDigits={2}
                                maximumFractionDigits={4}
                            />
                            <CurrencyIcon
                                symbol={values.token1.symbol}
                                className="ms-2 position-relative"
                                style={{top: '-1px'}}
                                width={13}
                                height={13}
                            />
                        </span>
                     </div>
                    <div className="d-flex justify-content-between mb-2">
                        <span className="text-muted">{t`Price impact`}</span>
                        <span>{values.priceImpact}&nbsp;%</span>
                    </div>
                    <div className="d-flex justify-content-between mb-2">
                        <span className="text-muted">{t`Fee`}</span>
                        <span className="d-flex align-items-center">
                            <FormattedNumber
                                value={values.token0Value * values.feeFactor}
                                minimumFractionDigits={2}
                                maximumFractionDigits={4}
                            />
                            <CurrencyIcon
                                symbol={values.token0.symbol}
                                className="ms-2 position-relative"
                                style={{top: '-1px'}}
                                width={13}
                                height={13}
                            />
                        </span>
                    </div>
                </div>
            </Content>
            }
        </div>
    )
}

export default MinimumToReceiveDropdown
