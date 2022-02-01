import React from 'react'
import { useFormikContext } from 'formik'
import { SupplyProps } from '../types'
import {t} from "@lingui/macro";
import * as Styles from '../../Styles'
import CurrencyIcon from "@components/atoms/currency-icon";

const TotalSupply = () => {
    const { values } = useFormikContext<SupplyProps>()

    /* TODO GET FROM BLOCKCHAIN */
    const totalSupplyToken0 = 50344390
    const totalSupplyToken1 = 10276983

    return (
        <>
            <Styles.CurrencyInputLabel>
                {t`Total supply`}
            </Styles.CurrencyInputLabel>
            <div className="">
                <div className="d-flex mb-2">
                    <CurrencyIcon
                        symbol={values.marketPair.token0.symbol}
                        className="me-2"
                        width={20}
                        height={20}
                    />
                    <div className="d-flex align-items-center">
                        {totalSupplyToken0}
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
                        {totalSupplyToken1}
                        &nbsp;
                        {values.marketPair.token1.symbol}
                    </div>
                </div>
            </div>
        </>
    )
}

export default TotalSupply