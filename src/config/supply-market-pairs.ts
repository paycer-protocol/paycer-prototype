import { tokenProvider } from '@providers/tokens'

export default {
    pDAI_yvDAI: {
        pairs: [tokenProvider.pDAI, tokenProvider.yvDAI],
        apy: 5.6,
        value: 'pDAI_yvDAI',
        label: 'pDAI/yvDAI'
    },
    PCR_DAI: {
        pairs: [tokenProvider.PCR, tokenProvider.DAI],
        apy: 7.6,
        value: 'PCR_DAI',
        label: 'PCR/DAI'
    },
    LUSD_USDC: {
        pairs: [tokenProvider.LUSD, tokenProvider.USDC],
        apy: 8.6,
        value: 'LUSD_USDC',
        label: 'LUSD/USDC'
    },
}



