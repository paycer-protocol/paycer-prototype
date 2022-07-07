import React, {createContext, useContext, useEffect, useMemo, useState} from 'react'
import Moralis from 'moralis'
import { useWeb3ExecuteFunction, useMoralisWeb3Api, useMoralisWeb3ApiCall } from 'react-moralis'
import { BigNumber } from '@ethersproject/bignumber'
import { formatUnits, parseUnits } from '@ethersproject/units'
import AirdropContractProvider from '@providers/airdrop'
import ChainId from '@providers/chain-id'
import { formatLastRewardtime } from '../helpers/staking-helper'
import { useDapp } from '@context/dapp-context'
import PaycerTokenContractProvider from "@providers/paycer-token";

enum TRANSACTION_STATE {
  "NONE" = 0,
  "APPROVE" = 1,
  "TRANSACTION" = 2
}

interface UseAirdropProps {
  claim: () => Promise<void>
  airdropAmount: number
  inAirdrop: boolean
  isLoading: boolean
  claimIsSuccess: boolean
  transactionState: TRANSACTION_STATE
  contractCallError: Error
  resetStatus: () => void
}

const contextDefaultValues: UseAirdropProps = {
  claim: null,
  airdropAmount: 0,
  inAirdrop: false,
  isLoading: false,
  claimIsSuccess: false,
  transactionState: 0,
  contractCallError: null,
  resetStatus: null,
}

const AirdropContext = createContext<UseAirdropProps>(
    contextDefaultValues
)

export const useAirdrop = () => useContext(AirdropContext)

const AirdropContextProvider = ({ children }) => {

  const { walletAddress, currentNetworkId, currentChainId, isInitialized, currentNetwork, fetchERC20Balances } = useDapp()
  const Web3Api = useMoralisWeb3Api()
  const airdropAddress = AirdropContractProvider[currentNetworkId] || AirdropContractProvider[ChainId.Polygon]

  const [claimIsSuccess, setClaimIsSuccess] = useState<boolean>(false)
  const [airdropAmount, setAirdropAmount] = useState<number>(0)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [transactionState, setTransactionState] = useState<TRANSACTION_STATE>(0)
  const [inAirdrop, setInAirdrop] = useState<boolean>(false)
  const [contractCallError, setContractCallError] = useState<Error | null>(null)

  const { data: claimData, error: claimError, fetch: claim, isFetching: claimIsFetching, isLoading: claimIsLoading } = useWeb3ExecuteFunction()

  const airdropRequestParams = useMemo(() => {
    return (
        {
          contractAddress: airdropAddress,
          abi: AirdropContractProvider.abi,
        }
    )
  }, [currentNetworkId, walletAddress, isInitialized])

  const airdropClaimRequestParams = useMemo(() => {
    return (
        {
          contractAddress: airdropAddress,
          functionName: 'claim',
          abi: AirdropContractProvider.abi
        }
    )
  }, [currentNetworkId, walletAddress, isInitialized])

  const handleClaim = async () => {
    setIsLoading(true)

    try {
      const claimTx = await claim({
        params: airdropClaimRequestParams,
      })

      if (claimTx) {
        //@ts-ignore
        await claimTx.wait()
        setIsLoading(false)
        setAirdropAmount(0)
        fetchERC20Balances()
        setClaimIsSuccess(true)
      }

    } catch (error) {
      if (error.code && error.code === 'TRANSACTION_REPLACED') {
        if (error.cancelled) {
          setContractCallError(new Error('Claim has been canceled.'))
        } else {
          //  was speeded up
          setClaimIsSuccess(true)
        }
      } else {
        setContractCallError(new Error('Claim failed. Please try again.'))
      }
    } finally {
      setIsLoading(false)
    }
  }

  const fetchInAirdrop = () => {
    if (isInitialized && walletAddress) {
      const fetch = async () => {
        const options = {
          chain: currentNetwork.chainName.toLowerCase(),
          address: airdropRequestParams.contractAddress,
          function_name: 'inAirDrop',
          abi: airdropRequestParams.abi,
          params: {address: walletAddress},
        }
        try {
          const response = await Moralis.Web3API.native.runContractFunction(options)
          if (response) {
            //@ts-ignore
            setInAirdrop(response)
          }
        } catch (e) {
          console.log(e)
        }
      }
      fetch()
    }
  }

  const fetchAirdropAmount = () => {
    if (isInitialized && walletAddress) {
      const fetch = async () => {
        const options = {
          chain: currentNetwork.chainName.toLowerCase(),
          address: airdropRequestParams.contractAddress,
          function_name: 'airdropAmount',
          abi: airdropRequestParams.abi,
        }
        try {
          const response = await Moralis.Web3API.native.runContractFunction(options)
          if (response) {
            setAirdropAmount(Number(formatUnits(response, 18)))
          }
        } catch (e) {
          console.log(e)
        }
      }
      fetch()
    }
  }

  useEffect(() => {
    fetchInAirdrop()
  }, [walletAddress, currentNetworkId])

  useEffect(() => {
    if (inAirdrop) {
      fetchAirdropAmount()
    }
  }, [walletAddress, currentNetworkId, inAirdrop])

  useEffect(() => {
    if (claimError) {
      setContractCallError(claimError)
    }
  }, [claimError])


  const resetStatus = () => {
    setClaimIsSuccess(false)
    setContractCallError(null)
    setIsLoading(false)
    setTransactionState(0)
  }

  return (
      <AirdropContext.Provider
          value={{
            inAirdrop,
            airdropAmount,
            claim: handleClaim,
            claimIsSuccess,
            contractCallError,
            isLoading,
            resetStatus,
            transactionState
          }}
      >
        {children}
      </AirdropContext.Provider>
  )
}


export default AirdropContextProvider