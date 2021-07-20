import { useTokenBalance, useEthers } from '@usedapp/core'
import { BigNumber } from '@ethersproject/bignumber'
import { tokenProvider } from '@providers/tokens'

export default function useToken(symbol: string) {
  const { account, chainId } = useEthers()
  const token = tokenProvider[symbol]
  const tokenAddress = token.chainAddresses[chainId]

  return {
    tokenBalance: (): BigNumber => {
      const rawTokenBalance = useTokenBalance(tokenAddress, account)
      return rawTokenBalance || BigNumber.from(0)
    }
  }
}
