import React from 'react'
import { Bnb, Eth } from '@styled-icons/crypto'
import { ChainId } from '@usedapp/core'
import Icon from '@components/atoms/icon'
import { useWeb3Auth } from '@context/web3-auth-context'

export const NativeCurrencyMap = {
  [ChainId.BSC]: Bnb,
  default: Eth
}

export interface NativeCurrencyIconProps {
  size?: number
  chainId?: number
  className?: any
}

export default function NativeCurrencyIcon({ size = 20, chainId, ...restProps }: NativeCurrencyIconProps) {
  const { currentChainId } = useWeb3Auth()
  const iconComponent = NativeCurrencyMap[chainId || currentChainId] || NativeCurrencyMap.default

  return (
    <Icon
      component={iconComponent}
      size={size}
      {...restProps}
    />
  )
}
