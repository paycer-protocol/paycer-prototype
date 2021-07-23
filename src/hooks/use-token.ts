import { useTokenBalance, useEthers, useContractCall } from '@usedapp/core'
import { BigNumber } from '@ethersproject/bignumber'
import { formatUnits } from '@ethersproject/units'
import { tokenProvider } from '@providers/tokens'
import { Interface } from '@ethersproject/abi'
import tokenAbi from '@contracts/abi/PaycerToken.json'

export default function useToken(symbol: string) {
  const { account, chainId } = useEthers()
  const token = tokenProvider[symbol]
  const tokenAddress = token.chainAddresses[chainId]

  return {
    tokenAddress,
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

      console.log('allowance', result)

      return BigNumber.isBigNumber(result) ? result.toNumber() : 0
    },
  }
}
