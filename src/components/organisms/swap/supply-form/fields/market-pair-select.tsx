import React, {useState} from 'react'
import { useFormikContext } from 'formik'
import { SupplyProps } from '../types'
import { marketPairs } from '@config/market-pairs'
import MarketPairSelectModal from "@components/organisms/swap/supply-form/market-pair-select-modal";
import MarketPairSelectToggle from "@components/organisms/swap/supply-form/fields/market-pair-select-toggle";

export default function MarketPairSelect() {
    const { values, setFieldValue } = useFormikContext<SupplyProps>()
    const [showModal, setShowModal] = useState(false)


    const handleChange = (marketPair) => {
        setFieldValue('marketPair', marketPair)
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
