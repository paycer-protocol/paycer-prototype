import MumbaiStakingContract from '../deployments/mumbai/Staking.json'
import KovanStakingContract from '../deployments/kovan/Staking.json'
import { ChainId } from '@usedapp/core'

/*TODO DEPLOY TO ALL NETWORKS */
export default {
    [ChainId.Mumbai]: {
        contract: MumbaiStakingContract
    },
    [ChainId.Kovan]: {
        contract: KovanStakingContract
    },
    [ChainId.Mainnet]: {
        contract: KovanStakingContract
    }
}