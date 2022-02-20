import React, { useState } from 'react'
import { useFormikContext } from 'formik'
import { t } from '@lingui/macro'
import { marketPairs, swapTokens } from '@config/market-pairs'
import TokenSelectModal from '@components/molecules/token-select-modal'
import TokenToggle from './token-toggle'
import { SwapProps } from '../types'

export default function Token0Select() {
    const { values, setValues } = useFormikContext<SwapProps>()
    const [showModal, setShowModal] = useState(false)

    const handleChange = (token) => {
        const token1Markets = marketPairs.find(m => m.base.symbol === token.symbol).markets

        setValues({
            ...values,
            ...{
                minimumToReceive: 0,
                token1Markets: token1Markets,
                token0Markets: swapTokens,
                token1: token1Markets[0],
                token0: token,
            }
        })

        setShowModal(false)
    }

    return (
      <>
        <TokenToggle
          token={values.token0}
          onClick={() => setShowModal(true)}
          label={t`Swap from`}
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
