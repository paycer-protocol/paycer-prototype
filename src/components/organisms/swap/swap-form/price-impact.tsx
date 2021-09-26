import React from 'react'
import { useFormikContext } from 'formik'
import { t } from '@lingui/macro'
import { SwapProps } from "@components/organisms/swap/types";

export default function PriceImpact() {
    const {
        values
    } = useFormikContext<SwapProps>()

    const calculatePriceImpact = () => {
        return values.priceImpact
    }

    return (
        <div className="d-flex justify-content-between font-size-lg fw-lighter">
            <div>{t`Price impact`}</div>
            <div>{calculatePriceImpact()}%</div>
        </div>
    )
}
