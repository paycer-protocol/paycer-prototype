import { useDapp } from '@context/dapp-context'
import { useEffect, useMemo, useState } from "react";
import Moralis from 'moralis';

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

  const [info, setInfo] = useState<Info | undefined>(undefined);
  useEffect(() => {
    if (!isAuthenticated) return;
    (async () => {
      const options = {
        abi,
        chain: chainId as any,
        address: contractAddress,
        function_name: 'tokenURI',
        params: {
          tokenId,
        },
      }
      return Moralis.Web3API.native.runContractFunction(options)
    })()
  }, [currentNetworkId, isAuthenticated])

  return {
    info,
  }
}