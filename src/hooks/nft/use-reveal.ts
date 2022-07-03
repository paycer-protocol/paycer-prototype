import Moralis from 'moralis'
import { useCallback, useEffect, useState } from 'react'
import { allNetProviders } from '@providers/networks'
import nftProvider from '@providers/nft'
import ChainId from '@providers/chain-id'
import { useDapp } from '@context/dapp-context'
import Nft from '../../types/nft'
import useNfts, { fetchTokensById } from './use-nfts'

type UseNftRevealProps = {
  status: 'unknown'
} | {
  status: 'idle'
  reveal: () => void
} | {
  status: 'loading' | 'error'
} | {
  status: 'success'
  nft: Nft
}

enum RevealStatus {
  NoTry = 0,
  WaitingForVRF = 1,
  Revealed = 2,
}

async function fetchTokenRevealStatus(currentNetworkId: number, tokenId: string): Promise<RevealStatus> {
  const { chainId } = allNetProviders[currentNetworkId]
  const { address: contractAddress, abi } = (nftProvider[currentNetworkId] || nftProvider[ChainId.Polygon]).nft
  const options = {
    abi,
    chain: chainId as any,
    address: contractAddress,
    function_name: 'revealStatuses',
    params: {
      '': tokenId,
    },
  }
  const status = (await Moralis.Web3API.native.runContractFunction(options)) as unknown as number
  return status as RevealStatus
}

export default function useNftReveal(tokenId: string): UseNftRevealProps {
  const { currentNetworkId, walletAddress: owner, isAuthenticated, isWeb3Enabled } = useDapp()

  const [revealStatus, setRevealStatus] = useState<RevealStatus | undefined>(undefined)

  useEffect(() => {
    async function callback() {
      if (!owner || !isAuthenticated || !isWeb3Enabled) return
      const status = await fetchTokenRevealStatus(currentNetworkId, tokenId)
      setRevealStatus(status)
    }
    const id = setInterval(callback, 3000)
    callback().catch(console.error)
    return () => clearInterval(id)
  }, [])

  const [executeStatus, setExecuteStatus] = useState<'idle' | 'active' | 'success' | 'error'>('idle')

  const reveal = useCallback(async () => {
    if (!owner || !isAuthenticated || !isWeb3Enabled) return
    if (executeStatus !== 'idle') return

    const { chainId } = allNetProviders[currentNetworkId]
    const { address: contractAddress, abi } = (nftProvider[currentNetworkId] || nftProvider[ChainId.Polygon]).nft
    const options = {
      abi,
      chain: chainId as any,
      contractAddress,
      functionName: 'revealNFT',
      params: {
        tokenId,
      },
    }
    try {
      setExecuteStatus('active')
      const result = await Moralis.executeFunction(options)
      setExecuteStatus('success')
    } catch (err) {
      console.error(err)
      setExecuteStatus('error')
    }
  }, [executeStatus, currentNetworkId])

  const [nft, setNft] = useState<Nft | 'error' | undefined>(undefined)
  useEffect(() => {
    (async () => {
      if (revealStatus == RevealStatus.Revealed) {
        try {
          const [nft] = await fetchTokensById(currentNetworkId, [tokenId])
          setNft(nft)
        } catch (err) {
          console.error(err)
          setNft('error')
        }
      }
    })()
  }, [currentNetworkId, revealStatus])

  if (revealStatus === undefined) return { status: 'unknown' }
  if (executeStatus === 'active') return { status: 'loading' }
  if (executeStatus === 'idle') return { status: 'idle', reveal }
  if (executeStatus === 'error') return { status: 'error' }

  if (nft === 'error') return { status: 'error' }
  if (nft === undefined) return { status: 'loading' }

  if (executeStatus === 'success') return { status: 'success', nft }

  return { status: 'unknown' }
}
