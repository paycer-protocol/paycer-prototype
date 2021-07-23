import { useTokenBalance, useEthers } from '@usedapp/core'
import { BigNumber } from '@ethersproject/bignumber'
import { formatUnits } from '@ethersproject/units'
import { tokenProvider } from '@providers/tokens'

export default function useToken(symbol: string) {
  const { account, chainId } = useEthers()
  const token = tokenProvider[symbol]
  const tokenAddress = token.chainAddresses[chainId]

  return {
    tokenBalance: (): number => {
      const result = useTokenBalance(tokenAddress, account)
      return BigNumber.isBigNumber(result) ? Number(formatUnits(result, token.decimals)) : 0
    }
  }
}
