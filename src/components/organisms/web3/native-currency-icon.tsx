import Icon from '@components/atoms/icon'
import { ChainId } from '@usedapp/core'
import { Bnb, Eth } from '@styled-icons/crypto'
import React from "react";
import useWallet from "@components/organisms/web3/hooks/useWallet";

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
  const wallet = useWallet()
  const iconComponent = NativeCurrencyMap[chainId || wallet.chainId] || NativeCurrencyMap.default

  return (
    <Icon
      component={iconComponent}
      size={size}
      {...restProps}
    />
  )
}
