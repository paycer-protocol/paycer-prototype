import { tokenProvider } from '@providers/tokens'

export default {
    pDAI_yvDAI: {
        pairs: [tokenProvider.pDAI, tokenProvider.yvDAI],
        apy: 5.6
    },
    PCR_DAI: {
        pairs: [tokenProvider.PCR, tokenProvider.DAI],
        apy: 7.6
    },
    LUSD_USDC: {
        pairs: [tokenProvider.LUSD, tokenProvider.USDC],
        apy: 8.6
    },
}



