import React from 'react'
import { useFormikContext } from 'formik'
import { SwapVert } from '@styled-icons/material/SwapVert'
import styled from 'styled-components'
import Icon from '@components/atoms/icon'
import useWallet from '@hooks/use-wallet'
import useNetwork from '@hooks/use-network'
import { SwapProps } from '@components/organisms/swap/swap-form/types'

export const Circle = styled.div`
  height: 34px;
  width: 34px;  border: 1px solid #324b68!important;
  &:hover {
    border-color: #446791!important;
  }
`

export default function FlipSwap() {
  const { values, setValues, setFieldValue } = useFormikContext<SwapProps>()
  const wallet = useWallet()
  const network = useNetwork()

  const handleFlip = async () => {
    const {
      token0,
      token0Value,
      token1,
      token1Value,
      token0Markets,
      token1Markets,
      tradePair,
    } = values

    if (!token0 && !token1) {
      return
    }

    const nextValues = {
      ...values,
      ...{
        token0: token1,
        token1: token0,
        token0Value: token1Value,
        token1Value: token0Value,
        token1Markets: token0Markets,
        token0Markets: token1Markets,
        tradePair: {
          fromTokenAddress: token1.chainAddresses[network.chainId],
          toTokenAddress: token0.chainAddresses[network.chainId],
          amount: tradePair.amount,
        },
        networkSettings: {
          providerUrl: network.rpcUrls[0],
          walletAddress: wallet.address,
          networkProvider: network.provider,
          chainId: network.chainId,
          nameNetwork: network.chainName,
          multicallContractAddress: network.multicallAddress,
          nativeCurrency: network.nativeCurrency,
          nativeWrappedTokenInfo: network.nativeWrappedTokenInfo
        }
      }
    }

    try {
      if (token0 && token1) {
        setFieldValue('isLoading', true)
        setValues(nextValues)
        const nextTradeContext = await values.initFactory(nextValues)
        setFieldValue('tradeContext', nextTradeContext)
        setFieldValue('isLoading', false)
      } else {
        setValues(nextValues)
      }
    } catch (e) {
      console.log(e)
      setFieldValue('isLoading', false)
    }
  }

  return (
    <Circle
      onClick={() => handleFlip()}
      className="cursor-pointer d-flex rounded-circle justify-content-center bg-dark align-items-center"
    >
      <Icon
        component={SwapVert}
        size={20}
        color="#FFF"
      />
    </Circle>
  )
}
