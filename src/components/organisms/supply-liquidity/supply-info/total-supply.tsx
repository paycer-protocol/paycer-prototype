import React from 'react'
import useToken from "@hooks/use-token";
import { useFormikContext } from 'formik'
import { SupplyProps } from '../types'
import {t} from '@lingui/macro'
import CurrencyIcon from '@components/atoms/currency-icon'
import {FormattedNumber} from '../../../atoms/number/formatted-number'

const TotalSupply = () => {
    const { values } = useFormikContext<SupplyProps>()

    const token0Data = useToken(values.token0.symbol)
    const token1Data = useToken(values.token1.symbol)

    return (
        <>
            <div className="text-muted mb-3">
                {t`Total Pool Supply`}
            </div>
            <div className="d-flex">
                <div className="d-flex me-4 align-items-center">
                    <CurrencyIcon
                        symbol={values.token0.symbol}
                        className="me-2"
                        width={15}
                        height={15}
                    />
                    <FormattedNumber
                        value={token0Data.totalSupply}
                        minimumFractionDigits={2}
                        maximumFractionDigits={0}
                    />
                </div>
                <div className="d-flex align-items-center">
                    <CurrencyIcon
                        symbol={values.token1.symbol}
                        className="me-2"
                        width={15}
                        height={15}
                    />
                    <FormattedNumber
                        value={token1Data.totalSupply}
                        minimumFractionDigits={2}
                        maximumFractionDigits={0}
                    />
                </div>

            </div>

        </>
    )
}

export default TotalSupply