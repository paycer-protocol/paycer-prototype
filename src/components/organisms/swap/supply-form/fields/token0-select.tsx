import React, { useState } from 'react'
import { useFormikContext } from 'formik'
import { SupplyProps } from '../types'
import TokenSelectModal from '@components/molecules/token-select-modal'
import TokenToggle from './token-toggle'
import { marketPairs, swapTokens } from '@config/market-pairs'

export default function Token0Select() {
    const { values, setFieldValue } = useFormikContext<SupplyProps>()
    const [showModal, setShowModal] = useState(false)

    const handleChange = (token) => {
        const token1Markets = marketPairs.find(m => m.base.symbol === token.symbol).markets
        setFieldValue('token1Markets', token1Markets)
        setFieldValue('token0Markets', swapTokens)
        setFieldValue('token1', token1Markets[0])
        setFieldValue('token0', token)
        setShowModal(false)
    }

    return (
      <>
        <TokenToggle
          token={values.token0}
          onClick={() => setShowModal(true)}
        />
        <TokenSelectModal
          show={showModal}
          tokens={values.token0Markets}
          activeToken={values.token0}
          onHide={() => setShowModal(false)}
          onClick={handleChange}
        />
      </>
    )
}
