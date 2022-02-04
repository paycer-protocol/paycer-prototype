import React from 'react'
import useToken from "@hooks/use-token";
import { useFormikContext } from 'formik'
import { SupplyProps } from '../types'
import {t} from "@lingui/macro";
import CurrencyIcon from "@components/atoms/currency-icon";
import {FormattedNumber} from "../../../../atoms/number/formatted-number";

const TotalSupply = () => {
    const { values } = useFormikContext<SupplyProps>()

    const token0Data = useToken(values.token0.symbol)
    const token1Data = useToken(values.token1.symbol)

    return (
        <>
            <h5 className="text-uppercase text-muted mb-3">
                {t`Total Pool Supply`}
            </h5>
            <div className="d-flex mb-2">
                <CurrencyIcon
                    symbol={values.token0.symbol}
                    className="me-2"
                    width={20}
                    height={20}
                />
                <FormattedNumber
                    value={token0Data.totalSupply}
                    minimumFractionDigits={2}
                    maximumFractionDigits={0}
                />
            </div>
            <div className="d-flex">
                <CurrencyIcon
                    symbol={values.token1.symbol}
                    className="me-2"
                    width={20}
                    height={20}
                />
                <FormattedNumber
                    value={token1Data.totalSupply}
                    minimumFractionDigits={2}
                    maximumFractionDigits={0}
                />
            </div>
        </>
    )
}

export default TotalSupply