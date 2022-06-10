import { useDapp } from '@context/dapp-context';
import { useEffect, useState } from 'react';
import { useMoralisWeb3Api } from 'react-moralis';
import { strategyProvider } from '../providers/strategies';
import InvestAbi from '../deployments/Invest.json';
import Moralis from "moralis";
import { BigNumber } from 'ethers';
import { formatUnits } from 'ethers/lib/utils';

export default function useInvestmentStrategies() {
  const { currentNetworkId, isWeb3Enabled } = useDapp();
  const [strategies, setStrategies] = useState<typeof strategyProvider[number][] | undefined>(undefined);

  useEffect(() => {
    if (!isWeb3Enabled) return;
    (async () => {
      const baseStrategies = strategyProvider;
      const acc = <typeof strategies>[];
      for (const baseStrategy of Object.values(baseStrategies)) {
        const totalValue = await Moralis.executeFunction({
          contractAddress: baseStrategy.chainAddresses[currentNetworkId],
          abi: InvestAbi,
          functionName: 'totalValue',
        });
        const poolRewardsContractAddress = await Moralis.executeFunction({
          contractAddress: baseStrategy.chainAddresses[currentNetworkId],
          abi: InvestAbi,
          functionName: 'poolRewards',
        });
        console.log(poolRewardsContractAddress);
        acc.push({
          ...baseStrategy,
          totalValue: formatUnits(totalValue as unknown as BigNumber, baseStrategy.decimals),
        })
      }
      setStrategies(acc);
    })();
  }, [isWeb3Enabled]);

  return strategies;
}