import { ChainId } from '@usedapp/core';
import StakingAbi from '../deployments/Staking.json';

export default {
  abi: StakingAbi,
  [ChainId.Mumbai]: '0x5C86297b9759B1994Ab2fAeeE411817c50190Ac5',
  [ChainId.Polygon]: '0x9F73a9D1777DAb73eb41A29782858f86aA4624B6',
};
