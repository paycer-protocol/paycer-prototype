import StakingAbi from '../deployments/Staking.json'
import { ChainId } from '@usedapp/core'

export default {
    abi: StakingAbi,
    [ChainId.Mumbai]: '0xd62D07B8E29BA0fd9A9299f2D94c604925C5557b',
    [ChainId.Polygon]: '0xe8d4FA6FA3065B4dB116d54644eFF05F2DD9B268'
}
