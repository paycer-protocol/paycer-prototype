import React from 'react'
import { useFormikContext } from 'formik'
import { t } from '@lingui/macro'
import { SwapProps } from '@components/organisms/swap/swap-form/types'

export default function PriceImpact() {
    const { values } = useFormikContext<SwapProps>()

    return (
        <div className="d-flex justify-content-between  font-size-smfw-lighter">
            <span>{t`Price impact`}</span>
            <span>{values.priceImpact}%</span>
        </div>
    )
}
