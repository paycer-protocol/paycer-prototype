import { useCalls } from '@usedapp/core';
import { BigNumber } from '@ethersproject/bignumber';
import { Contract } from '@ethersproject/contracts';
import { useDapp } from '@context/dapp-context';
import { investmentStrategies } from '@config/investment/strategies';
import { formatUnits } from '@ethersproject/units';
import { StrategyType } from '../types/investment';
import InvestAbi from '../deployments/Invest.json';

interface UsePortfolioProps {
  qualifiedStrategies: PortfolioStrategy[]
  totalInvest: number
}

interface PortfolioStrategy extends StrategyType {
  balance?: number
  tvl?: number
}

export default function usePortfolio():UsePortfolioProps {
  const { currentNetworkId, walletAddress } = useDapp();

  const strategyAdressesOfUsersChainId = [];

  investmentStrategies.map((strategy) => {
    strategyAdressesOfUsersChainId.push(strategy.chainAddresses[currentNetworkId]);
  });

  function getBalanceOfAll(tokenAddresses: string[] | undefined): (BigNumber | undefined)[] {
    const calls = tokenAddresses?.map((address) => ({
      contract: new Contract(address, InvestAbi),
      method: 'balanceOf',
      args: [walletAddress],
    })) ?? [];
    // @ts-ignore
    const results = useCalls(calls) ?? [];
    results.forEach((result, idx) => {
      if (result && result.error) {
        console.error(`Error encountered calling 'totalSupply' on ${calls[idx]?.contract.address}: ${result.error.message}`);
      }
    });
    return results.map((result) => result?.value?.[0]);
  }

  const balanceOfAll = getBalanceOfAll(strategyAdressesOfUsersChainId);

  const qualifiedStrategies = [];
  let totalInvest = 0;

  investmentStrategies.map((strategy, key) => {
    // decimals right here should actually be strategy.decimals but somehow the numbers formatted incorrectly in the frontend
    const tokenBalance = BigNumber.isBigNumber(balanceOfAll[key]) ? Number(formatUnits(balanceOfAll[key], 18)) : 0;
    totalInvest += tokenBalance;
    if (tokenBalance > 0) {
      qualifiedStrategies.push({
        ...strategy,
        ...{
          balance: tokenBalance,
          color: strategy.color,
        },
      } as PortfolioStrategy);
    }
  });

  return {
    qualifiedStrategies,
    totalInvest,
  };
}
