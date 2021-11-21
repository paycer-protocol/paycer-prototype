import React, {useEffect, useState} from 'react'
import { useFormikContext } from 'formik'
import { TokenSale } from '@config/token-sale'
import { InvestFormProps } from '../types'
import TokenSelectModal from '@components/organisms/token-sale/invest-form/token-select-modal'
import TokenToggle from '../token-toggle'
import useToken from "@hooks/use-token";

export default function TokenSelect() {
    const { values, setFieldValue } = useFormikContext<InvestFormProps>()
    const [showModal, setShowModal] = useState(false)
    const token0Balance = useToken(values.token0.symbol).tokenBalance()

    const handleChange = (token) => {
        setFieldValue('token0Balance', token0Balance)
        setFieldValue('token0', token)
        setFieldValue('token0Value', 0)
        setFieldValue('willReceive', 0)
        setShowModal(false)
    }

    useEffect(() => {
        setFieldValue('token0Balance', token0Balance)
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
