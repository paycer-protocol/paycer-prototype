import { formatUnits } from '@ethersproject/units'
import { useERC20Balances } from 'react-moralis'

export interface UseTokenInterface {
  tokenAddress: string
  tokenDecimals: number
  tokenBalance: number
  tokenBalanceFormatted: number
  tokenSymbol: string
  totalSupply: number
  allowance: number
}

export default function useToken(symbol: string): UseTokenInterface {
  const tokenBalances = useERC20Balances()

  let tokenAddress = ''
  let tokenBalance = 0
  let tokenDecimals = 0
  let tokenBalanceFormatted = 0
  let tokenSymbol = ''

  if (tokenBalances && tokenBalances?.data) {
    const token = tokenBalances.data.find(t => t.symbol === symbol)
    tokenAddress = token.token_address
    tokenSymbol = token.symbol
    tokenBalance = token.balance
    tokenBalanceFormatted = Number(formatUnits(token.balance, Number(token.decimals)))
    tokenDecimals = Number(token.decimals)
  }

  return {
    tokenAddress,
    tokenDecimals,
    tokenSymbol,
    tokenBalanceFormatted,
    totalSupply: 0,
    tokenBalance,
    allowance: 0
  }
}
