import React, {useState} from 'react'
import { useFormikContext} from 'formik'
import { SwapProps } from '../../types'
import calculateMinimumToReceive from '@components/organisms/swap/helper/minimum-to-receive'
import TokenSelectModal from '@components/organisms/swap/swap-form/token-select-modal'
import { marketPairs } from '@config/market-pairs'
import TokenToggle from './token-toggle'

export default function Token1Select() {
    const { values, setFieldValue } = useFormikContext<SwapProps>()
    const [showModal, setShopModal] = useState(false)

    const handleChange = (token) => {
        setFieldValue('token1', token)
        setShopModal(false)

        let token1Value
        if (values.exchangeRate) {
            token1Value = (values.token1Value / values.exchangeRate) * values.exchangeRate
        } else {
            token1Value = values.token0Value * values.exchangeRate
        }

        setFieldValue('token1Value', token1Value)

        calculateMinimumToReceive(
          values.token0Value,
          values.exchangeRate,
          values.slippageTolerance,
          values.feeFactor,
          setFieldValue
        )
    }

    return (
      <>
        <TokenToggle
          token={values.token1}
          onClick={() => setShopModal(true)}
        />
        <TokenSelectModal
          show={showModal}
          tokens={marketPairs.find((market) => market.base.symbol === values.token0.symbol)?.markets.filter(({ symbol }) => symbol !== values.token1.symbol) || []}
          onHide={() => setShopModal(false)}
          onClick={handleChange}
        />
      </>
    )
}
