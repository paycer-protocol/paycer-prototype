import Moralis from "moralis";
import { useCallback, useState } from "react";
import { useDapp } from "@context/dapp-context";
import Nft from "../../types/nft";
import { fetchTokensById } from "./use-nfts";
import { allNetProviers } from "@providers/networks";
import axios from "axios";

type UseNftUpgradeProps = {
  status: 'idle'
  upgrade: () => void
} | {
  status: 'loading' | 'error'
} | {
  status: 'success'
  nft: Nft
};

export default function useNftUpgrade(tokenId: string): UseNftUpgradeProps {
  const { currentNetworkId, walletAddress: owner, isAuthenticated, isWeb3Enabled } = useDapp()

  const upgrade = useCallback(async () => {
    if (!owner || !isAuthenticated || !isWeb3Enabled) return;
    try {
      setStatus({ status: 'loading' });
      const [baseNft] = await fetchTokensById(currentNetworkId, [tokenId]);

      const ethers = Moralis.web3Library;
      const provider = new ethers.providers.Web3Provider(Moralis.provider);

      const message = `Upgrade Paycer NFT #${tokenId} on chain ${currentNetworkId} to level ${baseNft.metadata.level + 1}`;
      const signature = await provider.getSigner().signMessage(message);

      const result = await axios.post('http://nft-pipeline-456198012.eu-central-1.elb.amazonaws.com/upgrade', {
        chainId: currentNetworkId,
        tokenId,
        signature,
      }, {
        timeout: 1000 * 60 * 60,
      });

      const [upgradedNft] = await fetchTokensById(currentNetworkId, [tokenId]);
      setStatus({ status: 'success', nft: upgradedNft });
    } catch (err) {
      console.error(err);
      setStatus({ status: 'error' });
    }
  }, [currentNetworkId]);


  const [status, setStatus] = useState<UseNftUpgradeProps>({
    status: 'idle',
    upgrade,
  });

  return status;
}