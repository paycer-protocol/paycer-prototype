import { ChainId, useContractCall, useEthers, useTokenBalance } from '@usedapp/core'
import { BigNumber } from '@ethersproject/bignumber'
import { formatUnits } from '@ethersproject/units'
import { tokenProvider } from '@providers/tokens'
import { Interface } from '@ethersproject/abi'
import tokenAbi from '@contracts/abi/PaycerToken.json'

export default function useToken(symbol: string) {
  const { account, chainId } = useEthers()
  const token = tokenProvider[symbol]
  const tokenAddress = token.chainAddresses[chainId || ChainId.Mainnet]

  return {
    tokenAddress,
    decimals: token.decimals,
    symbol,
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
    },
  }
}
