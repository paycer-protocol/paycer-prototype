import React, { useState } from 'react'
import { useFormikContext } from 'formik'
import { SupplyProps } from '../types'
import TokenSelectModal from '@components/molecules/token-select-modal'
import TokenToggle from './token-toggle'
import {marketPairs, swapTokens} from '@config/market-pairs'

export default function Token1Select() {
    const { values, setFieldValue } = useFormikContext<SupplyProps>()
    const [showModal, setShowModal] = useState(false)

    const handleChange = (token) => {
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
