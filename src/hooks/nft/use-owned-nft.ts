import nftProvider from '@providers/nft'
import { useEffect, useState } from 'react'
import { useDapp } from '@context/dapp-context'
import Moralis from 'moralis'
import ChainId from '@providers/chain-id'
import { allNetProviders } from '@providers/networks'
import { fetchTokensById, UseNftsProps } from './use-nfts'

async function fetchOwnedTokenId(currentNetworkId: number, owner: string, tokenIndex: string): Promise<string> {
  const { chainId } = allNetProviders[currentNetworkId]
  const { address: contractAddress, abi } = (nftProvider[currentNetworkId] || nftProvider[ChainId.Polygon]).nft

  const tokenIdOptions = {
    abi,
    chain: chainId as any,
    address: contractAddress,
    function_name: 'tokenOfOwnerByIndex',
    params: {
      owner,
      index: tokenIndex,
    },
  }

  const tokenId = await Moralis.Web3API.native.runContractFunction(tokenIdOptions)

  return tokenId
}

export default function useOwnedNft(tokenIndex): UseNftsProps {
  const { currentNetworkId, walletAddress: owner, isAuthenticated, isWeb3Enabled } = useDapp()

  const [status, setStatus] = useState<UseNftsProps>({ status: 'loading' })

  useEffect(() => {
    if (!owner || !isAuthenticated || !isWeb3Enabled) return
    setStatus({ status: 'loading' })
    fetchOwnedTokenId(currentNetworkId, owner, tokenIndex)
      .then((tokenId) => fetchTokensById(currentNetworkId, [tokenId]))
      .then((nfts) => setStatus({ status: 'success', nfts }))
      .catch((err) => {
        setStatus({ status: 'error' })
        console.error(err)
      })
  }, [currentNetworkId, isAuthenticated, isWeb3Enabled, owner])

  return status
}
