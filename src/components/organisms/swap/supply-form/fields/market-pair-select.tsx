import React, { useState, useEffect } from 'react'
import { useFormikContext } from 'formik'
import { SupplyProps } from '../types'
import { marketPairs } from '@config/market-pairs'
import MarketPairSelectModal from "@components/organisms/swap/supply-form/market-pair-select-modal";
import MarketPairSelectToggle from "@components/organisms/swap/supply-form/fields/market-pair-select-toggle";
import useToken from "@hooks/use-token";

export default function MarketPairSelect() {
    const { values, setFieldValue } = useFormikContext<SupplyProps>()
    const [showModal, setShowModal] = useState(false)

    const token0Balance = useToken(values.marketPair.token0.symbol).tokenBalance()
    const token1Balance = useToken(values.marketPair.token1.symbol).tokenBalance()

    useEffect(() => {
        setFieldValue('token0Balance', token0Balance)

        // TODO REMOVE MOCK
        if (values.marketPair.token1.symbol === 'DAI') {
            setFieldValue('token1Balance', 2000000)
        } else {
            setFieldValue('token1Balance', token1Balance)
        }

    }, [values.marketPair]);


    const handleChange = (marketPair, apy) => {
        setFieldValue('marketPair', marketPair)
        setFieldValue('apy', apy)
        setShowModal(false)
    }

    return (
        <>
            <MarketPairSelectToggle
                marketPair={values.marketPair}
                onClick={() => setShowModal(true)}
            />
            <MarketPairSelectModal
                show={showModal}
                marketPairs={marketPairs}
                onHide={() => setShowModal(false)}
                onClick={handleChange}
            />
        </>
    )
}
