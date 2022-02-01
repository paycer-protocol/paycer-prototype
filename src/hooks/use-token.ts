import { ChainId, useContractCall, useEthers, useTokenBalance, useToken as useDappToken } from '@usedapp/core'
import { BigNumber } from '@ethersproject/bignumber'
import { formatUnits } from '@ethersproject/units'
import { tokenProvider } from '@providers/tokens'
import { Interface } from '@ethersproject/abi'
import tokenAbi from '../deployments/matic/PaycerToken.json'

export default function useToken(symbol: string) {
  const { account, chainId } = useEthers()
  const token = tokenProvider[symbol]
  const tokenAddress = token.chainAddresses[chainId || ChainId.Polygon]
  const tokenInfo = useDappToken(tokenAddress)

  return {
    tokenAddress,
    decimals: token.decimals,
    symbol,
    totalSupply: BigNumber.isBigNumber(tokenInfo?.totalSupply) ? Number(formatUnits(tokenInfo?.totalSupply, tokenInfo?.decimals)) : 0,
    tokenBalance: (): number => {
      const result = useTokenBalance(tokenAddress, account)
      return BigNumber.isBigNumber(result) ? Number(formatUnits(result, token.decimals)) : 0
    },
    allowance: (): number => {
      const [result] = useContractCall({
        abi: new Interface(tokenAbi.abi),
        address: tokenAddress,
        method: 'allowance',
        args: [tokenAddress, account],
      }) ?? []

      return BigNumber.isBigNumber(result) ? result.toNumber() : 0
    }
  }
}
