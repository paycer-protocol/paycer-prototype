import React, {useEffect, useState} from 'react'
import { useFormikContext } from 'formik'
import { TokenSale } from '@config/token-sale'
import { InvestFormProps } from '../types'
import TokenSelectModal from '@components/organisms/token-sale/invest-form/token-select-modal'
import TokenToggle from '../token-toggle'
import useToken from "@hooks/use-token";
import useWallet from "@hooks/use-wallet";

export default function TokenSelect() {
    const { values, setFieldValue } = useFormikContext<InvestFormProps>()
    const [showModal, setShowModal] = useState(false)
    const wallet = useWallet()
    const token0Balance = useToken(values.token0.symbol).tokenBalance()

    const handleChange = (token) => {
        if (token.symbol === 'ETH') {
            setFieldValue('token0Balance', Number(wallet.etherBalance))
        }

        setFieldValue('token0', token)
        setFieldValue('token0Value', 0)
        setFieldValue('willReceive', 0)
        setShowModal(false)
    }

    useEffect(() => {
        if(values.token0.symbol !== 'ETH') {
            setFieldValue('token0Balance', token0Balance)
        }
    }, [values.token0]);

    return (
        <>
            <TokenToggle
                token={values.token0}
                onClick={() => setShowModal(true)}
            />
            <TokenSelectModal
                show={showModal}
                tokens={TokenSale.map((token) => token).filter(({ symbol }) => symbol !== values.token0.symbol) || []}
                onHide={() => setShowModal(false)}
                onClick={handleChange}
            />
        </>
    )
}
