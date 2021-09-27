import React from 'react'
import { useFormikContext } from 'formik'
import { t } from '@lingui/macro'
import { SwapProps } from '@components/organisms/swap/types'

export default function PriceImpact() {
    const { values } = useFormikContext<SwapProps>()

    return (
        <div className="d-flex justify-content-between font-size-lg fw-lighter">
            <div>{t`Price impact`}</div>
            <div>{values.priceImpact}%</div>
        </div>
    )
}
