import React from 'react'
import { useFormikContext } from 'formik'
import { t } from '@lingui/macro'
import { SwapProps } from "@components/organisms/swap/types";

export default function PriceImpact() {
    const {
        values,
        setFieldValue
    } = useFormikContext<SwapProps>()

    const calculatePriceImpact = () => {
        /*TODO CALCULATE PRICE IMPACT */

        const fromCurrency = values.fromCurrency
        const fromValue = values.fromValue
        const toCurrency = values.toCurrency
        const toValue = values.toValue

        return 100 / 2

    }

    return (
        <div className="d-flex justify-content-between">
            <div>{t`Price impact`}</div>
            <div>{calculatePriceImpact()}%</div>
        </div>
    )
}
