import { ChainId, useEthers, ERC20Interface, useContractCalls } from '@usedapp/core'
import { BigNumber } from '@ethersproject/bignumber'
import { formatUnits } from '@ethersproject/units'
import { tokenProvider } from '@providers/tokens'

export interface ITokenDataProvider {
  name: string,
  tokenAddress: string,
  decimals: number,
  symbol: string,
  totalSupply: number,
  allowance: number,
  tokenBalance: number
}

export default function useSupportedToken(): Record<string, ITokenDataProvider> {
  const { account, chainId } = useEthers()

  const calls = []
  Object.keys(tokenProvider).forEach((symbol) => {
    const token = tokenProvider[symbol]
    const tokenAddress = token.chainAddresses[chainId || ChainId.Polygon]

    if (tokenAddress) {
      calls.push({
        abi: ERC20Interface,
        address: tokenAddress,
        method: 'totalSupply',
        args: [],
      })
      calls.push({
        abi: ERC20Interface,
        address: tokenAddress,
        method: 'balanceOf',
        args: [account],
      })
      calls.push({
        abi: ERC20Interface,
        address: tokenAddress,
        method: 'allowance',
        args: [tokenAddress, account],
      })
    }
  })
  const callRes = useContractCalls(calls)
  const res: Record<string, ITokenDataProvider> = {}
  let resIndex = 0

  Object.keys(tokenProvider).forEach((symbol) => {
    const token = tokenProvider[symbol]
    const tokenAddress = token.chainAddresses[chainId || ChainId.Polygon]
    if (tokenAddress) {
      const totalSupply = formatNumber(callRes[resIndex++], token.decimals)
      const tokenBalance = formatNumber(callRes[resIndex++], token.decimals)
      const allowance = formatNumber(callRes[resIndex++], token.decimals)
      res[symbol] = {
        name: token.name,
        tokenAddress,
        decimals: token.decimals,
        symbol,
        totalSupply,
        allowance,
        tokenBalance,
      }
    }
  })
  return res
}

const formatNumber = (value, decimals) => value && BigNumber.isBigNumber(value[0]) ? Number(formatUnits(value[0], decimals)) : 0
