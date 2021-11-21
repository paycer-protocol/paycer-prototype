import React from 'react'
import { useFormikContext } from 'formik'
import { SupplyProps } from '../types'
import {t} from "@lingui/macro";
import * as Styles from '../../Styles'
import CurrencyIcon from "@components/atoms/currency-icon";
import {FormattedNumber} from "../../../../atoms/number/formatted-number";

const TotalSupply = () => {
    const { values } = useFormikContext<SupplyProps>()

    /* TODO GET FROM BLOCKCHAIN */
    const totalSupplyToken0 = 50344390
    const totalSupplyToken1 = 10276983

    return (
        <>
            <div className="text-muted text-uppercase h5">
                {t`Total supply`}
            </div>
            <div className="">
                <div className="d-flex mb-2">
                    <CurrencyIcon
                        symbol={values.marketPair.token0.symbol}
                        className="me-2"
                        width={20}
                        height={20}
                    />
                    <div className="d-flex align-items-center">
                        <FormattedNumber
                            value={totalSupplyToken0}
                            minimumFractionDigits={2}
                            maximumFractionDigits={4}
                        />
                        &nbsp;
                        {values.marketPair.token0.symbol}
                    </div>
                </div>
                <div className="d-flex">
                    <CurrencyIcon
                        symbol={values.marketPair.token1.symbol}
                        className="me-2"
                        width={20}
                        height={20}
                    />
                    <div className="d-flex align-items-center">
                        <FormattedNumber
                            value={totalSupplyToken1}
                            minimumFractionDigits={2}
                            maximumFractionDigits={4}
                        />
                        &nbsp;
                        {values.marketPair.token1.symbol}
                    </div>
                </div>
            </div>
        </>
    )
}

export default TotalSupply