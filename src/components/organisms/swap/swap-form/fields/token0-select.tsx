import React, { useState } from 'react'
import { useFormikContext } from 'formik'
import { marketPairs } from '@config/market-pairs'
import { SwapProps } from '../types'
import TokenSelectModal from '../token-select-modal'
import TokenToggle from '../token-toggle'

export default function Token0Select() {
    const { values, setFieldValue } = useFormikContext<SwapProps>()
    const [showModal, setShowModal] = useState(false)

    const handleChange = (token) => {
        setFieldValue('token0', token)
        setFieldValue('token1Value', 0)
        setFieldValue('minimumToReceive', 0)

        const markets =  marketPairs
          .find((market) => market.base.symbol === token.symbol)
          .markets

        const allowPair = markets.find(({ symbol }) => symbol === values.token1.symbol)

        if (!allowPair) {
            setFieldValue('token1', markets[0])
        }

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
          tokens={marketPairs.map((market) => market.base).filter(({ symbol }) => symbol !== values.token0.symbol) || []}
          onHide={() => setShowModal(false)}
          onClick={handleChange}
        />
      </>
    )
}
