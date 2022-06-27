import Moralis from "moralis";
import { useCallback, useEffect, useState } from "react";
import { allNetProviers } from '@providers/networks';
import nftProvider from '@providers/nft';
import ChainId from "@providers/chain-id";
import { useDapp } from "@context/dapp-context";
import Nft from "../../types/nft";
import { fetchTokensById } from "./use-nfts";

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
};

enum RevealStatus {
  NoTry = 0,
  WaitingForVRF = 1,
  Revealed = 2,
}

async function fetchTokenRevealStatus(currentNetworkId: number, tokenId: string): Promise<RevealStatus> {
  const chainId = allNetProviers[currentNetworkId].chainId;
  const { address: contractAddress, abi } = (nftProvider[currentNetworkId] || nftProvider[ChainId.Polygon]).nft;
  const options = {
    abi,
    chain: chainId as any,
    address: contractAddress,
    function_name: 'revealStatuses',
    params: {
      '': tokenId,
    },
  }
  const status = (await Moralis.Web3API.native.runContractFunction(options)) as unknown as number;
  return status as RevealStatus;
}

export default function useNftReveal(tokenId: string): UseNftRevealProps {
  const { currentNetworkId, walletAddress: owner, isAuthenticated, isWeb3Enabled } = useDapp()

  const [revealStatus, setRevealStatus] = useState<RevealStatus | undefined>(undefined);

  useEffect(() => {
    async function callback() {
      if (!owner || !isAuthenticated || !isWeb3Enabled) return;
      const status = await fetchTokenRevealStatus(currentNetworkId, tokenId)
      setRevealStatus(status);
    }
    const id = setInterval(callback, 3000);
    callback().catch(console.error);
    return () => clearInterval(id)
  }, [])

  const [executeStatus, setExecuteStatus] = useState<'idle' | 'active' | 'success' | 'error'>('idle')
  const [nft, setNft] = useState<Nft | undefined>(undefined)


  const reveal = useCallback(async () => {
    if (!owner || !isAuthenticated || !isWeb3Enabled) return;
    if (executeStatus !== 'idle') return;

    const chainId = allNetProviers[currentNetworkId].chainId;
    const { address: contractAddress, abi } = (nftProvider[currentNetworkId] || nftProvider[ChainId.Polygon]).nft;
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
      setExecuteStatus('active');
      const result = await Moralis.executeFunction(options);
      const nft = await fetchTokensById(currentNetworkId, [tokenId]);
      setNft(nft[0]);
      setExecuteStatus('success');
    } catch (err) {
      setExecuteStatus('error');
    }
  }, [executeStatus, currentNetworkId]);

  if (revealStatus === undefined) return { status: 'unknown' }
  if (executeStatus === 'active') return { status: 'loading' }
  if (executeStatus === 'idle') return { status: 'idle', reveal }
  if (executeStatus === 'error') return { status: 'error' }
  if (revealStatus !== RevealStatus.Revealed) return { status: 'loading' }
  if (executeStatus === 'success') return { status: 'success', nft }

  return { status: 'unknown' }
}