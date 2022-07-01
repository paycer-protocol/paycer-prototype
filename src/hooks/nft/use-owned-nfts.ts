import nftProvider from '@providers/nft'
import { useEffect, useState } from 'react'
import { useDapp } from '@context/dapp-context'
import Moralis from 'moralis'
import ChainId from '@providers/chain-id'
import { allNetProviers } from '@providers/networks'
import { fetchTokensById, UseNftsProps } from './use-nfts'

async function fetchOwnedTokenIds(currentNetworkId: number, owner: string): Promise<string[]> {
  const { chainId } = allNetProviers[currentNetworkId]
  const { address: contractAddress, abi } = (nftProvider[currentNetworkId] || nftProvider[ChainId.Polygon]).nft

  const numTokensOptions = {
    abi,
    chain: chainId as any,
    address: contractAddress,
    function_name: 'balanceOf',
    params: {
      owner,
    },
  }
  const numTokens = Number.parseInt(await Moralis.Web3API.native.runContractFunction(numTokensOptions))

  const tokenIds = (await Promise.all(Array.from({ length: numTokens }, (_, index) => {
    const tokenIdOptions = {
      abi,
      chain: chainId as any,
      address: contractAddress,
      function_name: 'tokenOfOwnerByIndex',
      params: {
        owner,
        index: `${index}`,
      },
    }
    return Moralis.Web3API.native.runContractFunction(tokenIdOptions)
  })))

  return tokenIds
}

export default function useOwnedNfts(): UseNftsProps {
  const { currentNetworkId, walletAddress: owner, isAuthenticated, isWeb3Enabled } = useDapp()

  const [status, setStatus] = useState<UseNftsProps>({ status: 'loading' })

  useEffect(() => {
    if (!owner || !isAuthenticated || !isWeb3Enabled) return
    setStatus({ status: 'loading' })
    fetchOwnedTokenIds(currentNetworkId, owner)
      .then((tokenIds) => fetchTokensById(currentNetworkId, tokenIds))
      .then((nfts) => setStatus({ status: 'success', nfts }))
      .catch((err) => {
        setStatus({ status: 'error' })
        console.error(err)
      })
  }, [currentNetworkId, isAuthenticated, isWeb3Enabled, owner])

  return status
}
