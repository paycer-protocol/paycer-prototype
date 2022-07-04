import { useDapp } from '@context/dapp-context'
import { useEffect, useMemo, useState } from 'react'
import Moralis from 'moralis'
import nftProvider from '@providers/nft'
import ChainId from '@providers/chain-id'

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
  buy: () => void
} | {
  status: 'inProgress' | 'success' | 'error'
  info: Info
}

export default function useNftSale(): UseNftSaleProps {
  const { currentNetworkId, isAuthenticated, walletAddress } = useDapp()

  const { chainId } = allNetProviers[currentNetworkId]
  const { address: presaleAddress, abi: presaleAbi } = (nftProvider[currentNetworkId] || nftProvider[ChainId.Mumbai]).presale
  const { address: publicSaleAddress, abi: publicSaleAbi } = (nftProvider[currentNetworkId] || nftProvider[ChainId.Mumbai]).publicSale

  const [info, setInfo] = useState<Info | undefined>(undefined)
  useEffect(() => {
    if (!isAuthenticated) return;
    (async () => {
      const options = {
        presaleAbi,
        chain: chainId as any,
        address: presaleAddress,
        function_name: 'tokenURI',
        params: {
          tokenId,
        },
      }
      return Moralis.Web3API.native.runContractFunction(options)
    })()
  }, [chainId, isAuthenticated])

  return {
    info,
  }
}
