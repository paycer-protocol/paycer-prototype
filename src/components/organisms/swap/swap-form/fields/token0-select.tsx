import React, { useState } from 'react'
import { useFormikContext } from 'formik'
import { SwapProps } from '../types'
import TokenSelectModal from '@components/organisms/swap/swap-form/token-select-modal'
import TokenToggle from './token-toggle'
import { t } from '@lingui/macro'
import { marketPairs, swapTokens } from '@config/market-pairs'

export default function Token0Select() {
    const { values, setFieldValue } = useFormikContext<SwapProps>()
    const [showModal, setShowModal] = useState(false)




    const handleChange = (token, balance) => {

        setFieldValue('minimumToReceive', 0)

        const token1Markets = marketPairs.find(m => m.base.symbol === token.symbol).markets
        setFieldValue('token1Markets', token1Markets)
        setFieldValue('token0Markets', swapTokens)
        setFieldValue('token1', token1Markets[0])
        setFieldValue('token0', token)
        setFieldValue('token0Balance', balance)

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
