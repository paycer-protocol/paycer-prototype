import React, { useState } from 'react'
import { useFormikContext } from 'formik'
import { SwapProps } from '../types'
import TokenSelectModal from '@components/molecules/token-select-modal'
import TokenToggle from './token-toggle'
import {t} from '@lingui/macro'
import {marketPairs, swapTokens} from '@config/market-pairs'

export default function Token1Select() {
    const { values, setFieldValue } = useFormikContext<SwapProps>()
    const [showModal, setShowModal] = useState(false)

    const handleChange = (token) => {
        setFieldValue('minimumToReceive', 0)
        const token1Markets = marketPairs.find(m => m.base.symbol === values.token0.symbol).markets
        setFieldValue('token1Markets', token1Markets)
        setFieldValue('token0Markets', swapTokens)
        setFieldValue('token1', token)
        setShowModal(false)
    }

    return (
        <>
            <TokenToggle
                token={values.token1}
                onClick={() => setShowModal(true)}
                label={t`Swap to`}
            />
            <TokenSelectModal
                show={showModal}
                tokens={values.token1Markets}
                activeToken={values.token1}
                onHide={() => setShowModal(false)}
                onClick={handleChange}
            />
        </>
    )
}
