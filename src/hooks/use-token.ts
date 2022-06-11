import { formatUnits } from '@ethersproject/units'
import { useERC20Balances } from 'react-moralis'
import {useDapp} from "@context/dapp-context";

export interface UseTokenInterface {
  tokenAddress: string
  tokenDecimals: number
  rawTokenBalance: number
  tokenBalance: number
  tokenSymbol: string
  totalSupply: number
  allowance: number
}

export default function useToken(symbol: string): UseTokenInterface {

  const { data } = useERC20Balances()

  let tokenAddress = ''
  let tokenBalance = 0
  let tokenDecimals = 0
  let rawTokenBalance = 0
  let tokenSymbol = ''

    if (data && symbol) {
      const token = data.find(t => t.symbol === symbol)
      if (token) {
        tokenAddress = token.token_address
        tokenSymbol = token.symbol
        rawTokenBalance = Number(token.balance),
        tokenBalance = Number(formatUnits(token.balance, Number(token.decimals)))
        tokenDecimals = Number(token.decimals)
      }
    }


  return {
    tokenAddress,
    tokenDecimals,
    tokenSymbol,
    tokenBalance,
    totalSupply: 0,
    rawTokenBalance,
    allowance: 0
  }
}
