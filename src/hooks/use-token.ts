import { useTokenBalance, useEthers } from '@usedapp/core'
import { formatUnits } from '@ethersproject/units'
import { tokenProvider } from '@providers/tokens'

export default function useToken(symbol: string) {
  const { account, chainId } = useEthers()
  const token = tokenProvider[symbol]
  const tokenAddress = token.chainAddresses[chainId]



  return {
    tokenBalance: () => {
      const rawTokenBalance = useTokenBalance(tokenAddress, account)

      return Number(formatUnits(rawTokenBalance || 0, token.decimals))
    }
  }
}
