import StakingAbi from '../deployments/Staking.json'
import { ChainId } from '@usedapp/core'

export default {
    abi: StakingAbi,
    [ChainId.Mumbai]: '0xfeeC2EA9382802b9055A6526Dd766A953B02eD0a',
    [ChainId.Polygon]: '0x6aa93BA947236A59B808348C433656a7Aa3e0170'
}
