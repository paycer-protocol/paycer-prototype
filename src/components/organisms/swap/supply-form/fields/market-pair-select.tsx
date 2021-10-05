import React, {useState} from 'react'
import { useFormikContext } from 'formik'
import { SupplyProps } from '../types'
import { marketPairs } from '@config/market-pairs'
import MarketPairSelectModal from "@components/organisms/swap/supply-form/market-pair-select-modal";
import MarketPairSelectToggle from "@components/organisms/swap/supply-form/fields/market-pair-select-toggle";
import fetchTokenBalance from "@components/organisms/swap/helper/fetch-token-balance";

export default function MarketPairSelect() {
    const { values, setFieldValue } = useFormikContext<SupplyProps>()
    const [showModal, setShowModal] = useState(false)


    const handleChange = (marketPair, apy) => {
        setFieldValue('marketPair', marketPair)
        /* TODO GET token0 BALANCE FROM WALLET */
        const token0Balance = fetchTokenBalance(marketPair.token0)
        /* TODO GET token1 BALANCE FROM WALLET */
        const token1Balance = fetchTokenBalance(marketPair.token1)
        setFieldValue('token0Balance', token0Balance)
        setFieldValue('token1Balance', token1Balance)
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
