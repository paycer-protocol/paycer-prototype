import { useNetwork as useBaseNetwork } from '@usedapp/core';
import { supportedChains, supportedStakingChains } from '@config/network';
import { useDapp } from '@context/dapp-context';
import { mainNetProviders, INetworkProvider } from '../providers';

export default function useNetwork() {
  const { network } = useBaseNetwork();
  const { currentNetworkId } = useDapp();
  const currentNetwork = mainNetProviders[currentNetworkId];

  const supportedChain = supportedChains.includes(currentNetworkId);
  const supportedStakingChain = supportedStakingChains.includes(currentNetworkId);

  return {
    ...currentNetwork,
    ...{
      supportedChain,
      supportedStakingChain,
      chainId: currentNetworkId,
      provider: network.provider,
    },
  };
}
