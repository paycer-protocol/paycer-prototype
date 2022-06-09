import React, {useState} from 'react'
import { useFormikContext } from 'formik'
import { connectors } from '@providers/connectors'
import TokenSelectModal from '@components/molecules/token-select-modal'
import WalletProvider from '@components/organisms/web3/wallet-provider'
import { swapTokens } from '@config/market-pairs'
import { SwapProps, SwapTokenInputProps } from '../types'
import TokenToggle from '@components/molecules/token-toggler'
import { t } from '@lingui/macro'
import { useDapp } from '@context/dapp-context'

export default function Token1Select(props: SwapTokenInputProps) {
    const { readOnly } = props
    const {values, setValues, setFieldValue} = useFormikContext<SwapProps>()
    const [showModal, setShowModal] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')
    const { isAuthenticated, walletAddress } = useDapp()

    const handleChange = async (token) => {

    }

    return (
        <>
            <TokenToggle
                token={values.toToken}
                onClick={() => setShowModal(true)}
                placeholder={t`Select a token`}
                label={t`Swap to`}
                readOnly={readOnly}
            />
            {isAuthenticated && (
                <TokenSelectModal
                    show={showModal}
                    tokens={values.toTokenMarkets}
                    activeToken={values.toToken}
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
