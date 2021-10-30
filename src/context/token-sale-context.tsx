import React, { useContext, useEffect, useState } from 'react'
import api from "../api";
import {toast} from "react-toastify";
import {t} from "@lingui/macro";
import useWallet from "@hooks/use-wallet";

interface TokenSaleDataProps {
  kycStatus?: boolean
  kycApproved?: boolean
  saftStatus?: boolean
  saftApproved?: boolean
  investmentReceived?: boolean
  pcrTokenAmount?: number
  vestingPhase?: number
  tokenAmount?: number
  investSymbol?: string
  investAmount?: number
}


interface TokenSaleProps {
  walletAddress: string
  setWalletAddress: (walletAddress: string) => void
  checkWalletStatus: (walletAddress: string) => void
  tokenSaleData: TokenSaleDataProps,
}

export const TokenSaleContext = React.createContext<TokenSaleProps>({
  walletAddress: '',
  setWalletAddress: (walletAddress: string) => {},
  checkWalletStatus: (walletAddress: string) => {},
  tokenSaleData: {},
})

export const useTokenSale = () => useContext(TokenSaleContext)

export const TokenSaleProvider = ({ children }) => {
  const wallet = useWallet()
  const [walletAddress, setWalletAddress] = useState<string>('')
  const [tokenSaleData, setTokenSaleData] = useState<TokenSaleDataProps>({})

  const checkWalletStatus = async (address: string) => {
    try {
      try {
        const response = await api.fetchTokenSaleInfo(address)
        const payload = response?.data || null

        setTokenSaleData(payload)
      } catch (err) {
        setTokenSaleData(null)
        toast(t`Address not found`)
      }
    } catch (e) {
      throw e
    }
  }

  useEffect(() => {
    setWalletAddress(wallet.address)

    if (wallet.isConnected && wallet.address) {
      checkWalletStatus(wallet.address)
    }
  }, [wallet.isConnected, wallet.address])

  return (
    <TokenSaleContext.Provider
      value={{
        walletAddress,
        setWalletAddress,
        tokenSaleData,
        checkWalletStatus
      }}
    >
  {children}
  </TokenSaleContext.Provider>
)
}
