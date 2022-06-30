import ChainId from './chain-id';

interface ExplorerUrlsType {
  [index: number]: string
}

const explorerBlockURLs = (blockNumber: number): ExplorerUrlsType => ({
  [ChainId.Mainnet]: `/block/${blockNumber}`,
  [ChainId.Ropsten]: `/block/${blockNumber}`,
  [ChainId.Kovan]: `/block/${blockNumber}`,
  [ChainId.Rinkeby]: `/block/${blockNumber}`,
  [ChainId.Goerli]: `/block/${blockNumber}`,
  [ChainId.BSC]: `/block/${blockNumber}`,
  [ChainId.xDai]: `/xdai/mainnet/blocks/${blockNumber}`,
  [ChainId.Polygon]: `/blocks/${blockNumber}/transactions`,
  [ChainId.Mumbai]: `/blocks/${blockNumber}/transactions`,
});

export const explorers: ExplorerUrlsType = {
  [ChainId.Mainnet]: 'https://etherscan.io',
  [ChainId.Ropsten]: 'https://ropsten.etherscan.io',
  [ChainId.Kovan]: 'https://kovan.etherscan.io',
  [ChainId.Rinkeby]: 'https://rinkeby.etherscan.io',
  [ChainId.Goerli]: 'https://goerli.etherscan.io',
  [ChainId.BSC]: 'https://bscscan.com',
  [ChainId.xDai]: 'https://blockscout.com/xdai/mainnet',
  [ChainId.Polygon]: 'https://polygon-explorer-mainnet.chainstacklabs.com',
  [ChainId.Mumbai]: 'https://polygon-explorer-mumbai.chainstacklabs.com',
};

/**
 * Return explorer URL for a specific block -or- fall back to empty string.
 *
 * Security: Enforce number type for 'blockNumber' during runtime, as it's coming from a potentially unsafe source.
 * isValid check: 'url' can be 'NaN', a strange effect of 'undefined + undefined' in JavaScript. As 'NaN' is falsy, a simple check is sufficient.
 *
 * @todo P314 | Architectural solution ok (functional logic allowed in 'providers')?
 * @todo P314 | Validation ok? Return empty string -or- rather throw/log error?
 * @throws blockNumber: Non-numeric, tampered with values are rejected.
 */
export const getExplorerBlockUrl = (chainId: ChainId, blockNumberUnsafe: number): string => {
  const blockNumber = Number(blockNumberUnsafe);
  const url: string = explorers[chainId] + explorerBlockURLs(blockNumber)[chainId];
  const isValid: boolean = (chainId && url && !isNaN(blockNumber));

  return isValid ? url : '';
};
