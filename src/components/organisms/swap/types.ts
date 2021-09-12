export interface SwapProps {
  fromCurrency: string
  toCurrency: string
  fromValue: number
  toValue: number
}

export const AllowedCurrencys = {
  DAI: ["LUSD", "USDT"],
  LUSD: ["pUSDC", "USDT"],
  PCR: ["pUSDT", "yvUSDT"],
  USDC: ["DAI", "USDT"],
  USDT: ["LUSD", "pDAI"],
  pDAI: ["USDT", "USDT"],
  pUSDC: ["DAI", "yvDAI"],
  pUSDT: ["pUSDC", "yvUSDC"],
  yvDAI: ["pUSDC", "USDT"],
  yvUSDC: ["DAI", "USDT"],
  yvUSDT: ["pUSDC", "USDC"],
}
