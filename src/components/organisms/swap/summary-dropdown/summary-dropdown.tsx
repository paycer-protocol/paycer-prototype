import React, {useState} from 'react'
import styled from 'styled-components'
import {useFormikContext} from 'formik'
import {t} from '@lingui/macro'
import {SwapProps} from '../types'
import Icon from '@components/atoms/icon'
import {ArrowDropDown, ArrowDropUp} from '@styled-icons/material'
import CurrencyIcon from '@components/atoms/currency-icon'
import { FormattedNumber} from '../../../atoms/number/formatted-number'

const Content = styled.div`
    z-index: 2; 
    border-top-left-radius: 0; 
    border-top-right-radius: 0;
    margin-top: -2px;
    max-height: 0;
    transition: max-height 0.15s ease-out;
    overflow: hidden; font-size: 14px;
    &.is--Open {
        max-height: 700px;
        transition: max-height 0.15s ease-in;
    }
`

const SummaryDropdown = () => {
    const { values } = useFormikContext<SwapProps>()
    const [ open, setOpen ] = useState(false)

    return (
        <div className="position-relative">
            <div
                onClick={() => {
                    if (values?.fromToken && values?.toToken) {
                        setOpen(!open)
                    }
                }} className={`cursor-pointer card shadow-none mb-0  ${open ? 'bg-dark border-bottom-0' : ''}`} style={!values?.toToken || !values?.fromToken || !values.fromTokenValue ? {opacity: '0.5'} : null}>
                <div className="card-body p-3 p-md-3">
                    <div className="d-flex align-items-center justify-content-between w-100">
                        {!values?.toToken || !values?.fromToken || !values.fromTokenValue ?
                        <>-</>
                        :
                            <div className="me-2">
                                1 {values?.toToken?.symbol} =&nbsp;
                                <FormattedNumber
                                    value={values.fromTokenValue / values.toTokenValue}
                                    minimumFractionDigits={2}
                                    maximumFractionDigits={4}
                                />
                                &nbsp; {values?.fromToken?.symbol}
                            </div>
                        }
                        <Icon
                            component={open ? ArrowDropUp : ArrowDropDown}
                            size={24}
                            style={{position: 'relative', top: '-1px'}}
                        />
                    </div>
                </div>
            </div>
            <Content
                className={`cursor-pointer card shadow-none mb-2 bg-dark position-absolute w-100 border-bottom-0 border-top-0 ${open ? 'is--Open' : ''}`}>
                <div className="card-body p-3 p-md-3">
                    <div className="d-flex justify-content-between mb-3">
                        <span className="text-muted">
                            {t`Minimum received`}
                        </span>
                        <span className="d-flex align-items-center">
                            <FormattedNumber
                                value={99999999}
                                minimumFractionDigits={2}
                                maximumFractionDigits={4}
                            />
                            &nbsp; { values?.toToken?.symbol }
                        </span>
                    </div>
                    <div className="d-flex justify-content-between">
                        <span className="text-muted">
                            {t`Fee`}
                        </span>
                        <span className="d-flex align-items-center">
                            <FormattedNumber
                                value={values.fee}
                                minimumFractionDigits={2}
                                maximumFractionDigits={4}
                            />
                            &nbsp; { values?.fromToken?.symbol }
                        </span>
                    </div>
                </div>
            </Content>
        </div>
    )
}

export default SummaryDropdown
