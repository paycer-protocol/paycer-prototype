import { useDapp } from '@context/dapp-context';
import { useEffect, useState } from 'react';
import { useMoralisWeb3Api } from 'react-moralis';
import { strategyProvider } from '../providers/strategies';
import InvestAbi from '../deployments/Invest.json';
import Moralis from "moralis";
import { BigNumber } from 'ethers';
import { formatUnits } from 'ethers/lib/utils';

export default function useInvestmentStrategies() {
  const { currentNetworkId } = useDapp();
  const Web3Api = useMoralisWeb3Api()
  const [strategies, setStrategies] = useState<typeof strategyProvider[number][] | undefined>(undefined);

  useEffect(() => {
    (async () => {
      const baseStrategies = strategyProvider;
      const acc = <typeof strategies>[];
      for (const baseStrategy of Object.values(baseStrategies)) {
        const totalValue = await Moralis.executeFunction({
          contractAddress: baseStrategy.chainAddresses[currentNetworkId],
          abi: InvestAbi,
          functionName: 'totalValue',
        });
        acc.push({
          ...baseStrategy,
          totalValue: formatUnits(totalValue as unknown as BigNumber, baseStrategy.decimals),
        })
      }
      setStrategies(acc);
    })();
  }, []);

  return strategies;
}