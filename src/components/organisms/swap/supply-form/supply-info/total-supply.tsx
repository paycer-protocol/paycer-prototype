import React from 'react'
import { useFormikContext } from 'formik'
import { SupplyProps } from '../types'
import {t} from "@lingui/macro";
import * as Styles from '../../Styles'
import CurrencyIcon from "@components/atoms/currency-icon";

const TotalSupply = () => {
    const { values } = useFormikContext<SupplyProps>()

    /* TODO GET FROM BLOCKCHAIN */
    const totalSupplyToken0 = '50M'
    const totalSupplyToken1 = '10.6M'

    return (
        <>
            <Styles.CurrencyInputLabel>
                {t`Total supply`}
            </Styles.CurrencyInputLabel>
            <div className="d-md-flex align-items-center">
                <div className="d-flex mb-3 mb-md-0">
                    <CurrencyIcon
                        symbol={values.marketPair.token0.symbol}
                        className="me-2"
                        width={30}
                        height={30}
                    />
                    <div className="d-flex align-items-center">
                        {totalSupplyToken0}
                        &nbsp;
                        {values.marketPair.token0.symbol}
                    </div>
                </div>
                <div className="me-3 ms-3 d-none d-md-block">/</div>
                <div className="d-flex">
                    <CurrencyIcon
                        symbol={values.marketPair.token1.symbol}
                        className="me-2"
                        width={30}
                        height={30}
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