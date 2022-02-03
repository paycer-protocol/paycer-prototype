import React, {useState} from 'react'
import * as Styles from './Styles'
import { useFormikContext } from 'formik'
import { t } from '@lingui/macro'
import { SwapProps } from '../types'
import Icon from '@components/atoms/icon'
import { ArrowDropDown, ArrowDropUp } from '@styled-icons/material'
import CurrencyIcon from "@components/atoms/currency-icon";
import { FormattedNumber } from "../../../../atoms/number/formatted-number";

const SummaryDropdown = () => {
    const { values } = useFormikContext<SwapProps>()
    const [open, setOpen] = useState(false)

    return (
        <div className="position-relative">
            <Styles.Header
                onClick={() => setOpen(!open)}
                className={`cursor-pointer card shadow-none mb-0  ${open ? 'bg-dark border-bottom-0' : ''}`}>

                <div className="card-body">
                    <div className="d-flex align-items-center justify-content-between w-100">
                        <div className="me-2">
                            1 {values.token0.symbol} = {values.token1Price} {values.token1.symbol}
                            <span className="ps-2 text-muted">($1,034)</span>
                        </div>
                        <Icon
                            component={open ? ArrowDropUp : ArrowDropDown}
                            size={24}
                            style={{position: 'relative', top: '-1px'}}
                        />
                    </div>
                </div>

            </Styles.Header>
            <Styles.Content className={`cursor-pointer card shadow-none mb-2 bg-dark position-absolute w-100 border-bottom-0 border-top-0 ${open ? 'is--Open' : ''}`}>
                <div className="card-body">
                    <div className="d-flex justify-content-between mb-3">
                        <span className="text-muted">
                            {t`Minimum received`}
                        </span>
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
                    <div className="d-flex justify-content-between mb-3">
                        <span className="text-muted">
                            {t`Price impact`}
                        </span>
                        <span>
                            {values.priceImpact}&nbsp;%
                        </span>
                    </div>
                    <div className="d-flex justify-content-between">
                        <span className="text-muted">
                            {t`Fee`}
                        </span>
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
            </Styles.Content>
        </div>
    )
}

export default SummaryDropdown
