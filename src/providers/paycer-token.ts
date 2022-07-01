import { ChainId } from '@usedapp/core';
import MaticContract from '../deployments/matic/PaycerToken.json';
import MumbaiContract from '../deployments/mumbai/PaycerToken.json';
import KovanContract from '../deployments/kovan/PaycerToken.json';
import MainContract from '../deployments/mainnet/PaycerToken.json';

export default {
  [ChainId.Polygon]: {
    contract: MaticContract,
  },
  [ChainId.Mumbai]: {
    contract: MumbaiContract,
  },
  [ChainId.Kovan]: {
    contract: KovanContract,
  },
  [ChainId.Mainnet]: {
    contract: MainContract,
  },
};
