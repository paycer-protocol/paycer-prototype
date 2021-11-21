import React from 'react'
import { useFormikContext } from 'formik'
import { SupplyProps } from '../types'
import {t} from "@lingui/macro";
import * as Styles from '../../Styles'
import CurrencyIcon from "@components/atoms/currency-icon";
import {FormattedNumber} from "../../../../atoms/number/formatted-number";

const YourSupply = () => {
    const { values } = useFormikContext<SupplyProps>()

    return (
        <>
            <Styles.CurrencyInputLabel>
                {t`Your supply`}
            </Styles.CurrencyInputLabel>
            <div className="">
                <div className="d-flex align-items-center mb-2">
                    <CurrencyIcon
                        symbol={values.marketPair.token0.symbol}
                        className="me-2"
                        width={20}
                        height={20}
                    />
                    <FormattedNumber
                        value={values.token0Value}
                        minimumFractionDigits={2}
                        maximumFractionDigits={4}
                    />
                    &nbsp;
                    {values.marketPair.token0.symbol}
                </div>
                <div className="d-flex align-items-center">
                    <CurrencyIcon
                        symbol={values.marketPair.token1.symbol}
                        className="me-2"
                        width={20}
                        height={20}
                    />
                    <FormattedNumber
                        value={values.token1Value}
                        minimumFractionDigits={2}
                        maximumFractionDigits={4}
                    />
                    &nbsp;
                    {values.marketPair.token1.symbol}
                </div>
            </div>
        </>
    )
}

export default YourSupply