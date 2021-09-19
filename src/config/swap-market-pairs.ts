import { tokenProvider } from '@providers/tokens'

export default {
    DAI: [tokenProvider.pDAI, tokenProvider.yvDAI],
    LUSD: [tokenProvider.LUSD, tokenProvider.DAI],
    PCR: [tokenProvider.LUSD, tokenProvider.USDC],
    USDC: [tokenProvider.LUSD, tokenProvider.PCR],
    USDT: [tokenProvider.LUSD, tokenProvider.pUSDC],
    pDAI: [tokenProvider.USDT, tokenProvider.PCR],
    pUSDC: [tokenProvider.LUSD, tokenProvider.pUSDT],
    pUSDT: [tokenProvider.LUSD, tokenProvider.USDT],
    yvDAI: [tokenProvider.LUSD, tokenProvider.PCR],
    yvUSDC: [tokenProvider.LUSD, tokenProvider.yvUSDT],
    yvUSDT: [tokenProvider.yvUSDC, tokenProvider.pUSDT],
}



