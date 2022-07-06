import { useDapp } from '@context/dapp-context'
import { useCallback, useEffect, useState } from 'react'
import Moralis from 'moralis'
import nftProvider from '@providers/nft'
import ChainId from '@providers/chain-id'
import { allNetProviders } from '@providers/networks'

interface TimeRange {
  startTime: Date
  endTime: Date
}

interface Info {
  presale: TimeRange
  publicSale: TimeRange
  currentPhase: 'whitelisting' | 'presale' | 'publicSale' | 'postSale'
}

type UseNftSaleProps = {
  status: 'loading'
} | {
  status: 'idle'
  info: Info
  buyPresale: (amount: number, alloc: number, proof: string[]) => void
  buyPublicSale: (amount: number) => void
} | {
  status: 'inProgress' | 'success' | 'error'
  info: Info
}

export default function useNftSale(): UseNftSaleProps {
  const { currentNetworkId, isAuthenticated, walletAddress } = useDapp()

  const { address: presaleAddress, abi: presaleAbi } = (nftProvider[currentNetworkId] || nftProvider[ChainId.Mumbai]).presale
  const { address: publicSaleAddress, abi: publicSaleAbi } = (nftProvider[currentNetworkId] || nftProvider[ChainId.Mumbai]).publicSale

  const [info, setInfo] = useState<Info | undefined>(undefined)
  useEffect(() => {
    if (!isAuthenticated || !currentNetworkId) return
    const { chainId } = allNetProviders[currentNetworkId];

    (async () => {
      let presaleStartTime: Date
      let presaleEndTime: Date
      let publicSaleStartTime: Date
      let publicSaleEndTime: Date
      {
        const options = {
          abi: presaleAbi,
          chain: chainId as any,
          address: presaleAddress,
          function_name: 'startTime',
          params: {},
        }
        presaleStartTime = new Date(Number.parseInt(await Moralis.Web3API.native.runContractFunction(options)) * 1000)
      }
      {
        const options = {
          abi: presaleAbi,
          chain: chainId as any,
          address: presaleAddress,
          function_name: 'endTime',
          params: {},
        }
        presaleEndTime = new Date(Number.parseInt(await Moralis.Web3API.native.runContractFunction(options)) * 1000)
      }
      {
        const options = {
          abi: publicSaleAbi,
          chain: chainId as any,
          address: publicSaleAddress,
          function_name: 'startTime',
          params: {},
        }
        publicSaleStartTime = new Date(Number.parseInt(await Moralis.Web3API.native.runContractFunction(options)) * 1000)
      }
      {
        const options = {
          abi: publicSaleAbi,
          chain: chainId as any,
          address: publicSaleAddress,
          function_name: 'endTime',
          params: {},
        }
        publicSaleEndTime = new Date(Number.parseInt(await Moralis.Web3API.native.runContractFunction(options)) * 1000)
      }

      let currentPhase: Info['currentPhase']
      if (presaleStartTime.getTime() > Date.now()) currentPhase = 'whitelisting'
      else if (presaleEndTime.getTime() > Date.now()) currentPhase = 'presale'
      else if (publicSaleEndTime.getTime() > Date.now()) currentPhase = 'publicSale'
      else currentPhase = 'postSale'

      setInfo({
        presale: { startTime: presaleStartTime, endTime: presaleEndTime },
        publicSale: { startTime: publicSaleStartTime, endTime: publicSaleEndTime },
        currentPhase,
      })
    })()
  }, [currentNetworkId, isAuthenticated])

  const [status, setStatus] = useState<'idle' | 'inProgress' | 'error' | 'success'>('idle')

  const buyPresale = useCallback(async (amount: number, alloc: number, proof: string[]) => {
    if (!isAuthenticated || !currentNetworkId) return
    if (status !== 'idle') return
    const { chainId } = allNetProviders[currentNetworkId]
    const options = {
      abi: presaleAbi,
      chain: chainId,
      contractAddress: presaleAddress,
      functionName: 'buy',
      params: { amount, alloc, proof },
    }
    try {
      setStatus('inProgress')
      await Moralis.executeFunction(options)
      setStatus('success')
    } catch (err) {
      console.error(err)
      setStatus('error')
    }
  }, [status, currentNetworkId, isAuthenticated])

  const buyPublicSale = useCallback(async (amount: number) => {
    if (!isAuthenticated || !currentNetworkId) return
    if (status !== 'idle') return
    const { chainId } = allNetProviders[currentNetworkId]
    const options = {
      abi: publicSaleAbi,
      chain: chainId,
      contractAddress: publicSaleAddress,
      functionName: 'buy',
      params: { amount },
    }
    try {
      setStatus('inProgress')
      await Moralis.executeFunction(options)
      setStatus('success')
    } catch (err) {
      console.error(err)
      setStatus('error')
    }
  }, [status, currentNetworkId, isAuthenticated])

  if (info === undefined) return { status: 'loading' }

  return {
    status,
    info,
    buyPresale,
    buyPublicSale,
  }
}
