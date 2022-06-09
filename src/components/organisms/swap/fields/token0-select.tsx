import React, { useState } from 'react'
import { useFormikContext } from 'formik'
import {t} from '@lingui/macro'
import { connectors } from '@providers/connectors'
import TokenSelectModal from '@components/molecules/token-select-modal'
import WalletProvider from '@components/organisms/web3/wallet-provider'
import { swapTokens } from '@config/market-pairs'
import { SwapProps, SwapTokenInputProps } from '../types'
import TokenToggle from '@components/molecules/token-toggler'
import { useDapp } from '@context/dapp-context'

export default function Token0Select(props: SwapTokenInputProps) {
    const { readOnly } = props
    const { values, setValues, setFieldValue } = useFormikContext<SwapProps>()
    const [showModal, setShowModal] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')
    const { isAuthenticated, walletAddress} = useDapp()

    const handleChange = async (token) => {
        setErrorMessage('')


    }

    return (
      <>
        <TokenToggle
          token={values.fromToken}
          onClick={() => setShowModal(true)}
          placeholder={t`Select a token`}
          label={t`Swap from`}
          readOnly={readOnly}
        />
          {isAuthenticated && (
            <TokenSelectModal
              show={showModal}
              tokens={values.fromTokenMarkets}
              activeToken={values.fromToken}
              onHide={() => setShowModal(false)}
              onClick={handleChange}
              errorMessage={errorMessage}
            />
          )}
          {!isAuthenticated && showModal && (
            <WalletProvider
              providers={connectors}
              onHide={() => setShowModal(false)}
            />
          )}
      </>
    )
}
