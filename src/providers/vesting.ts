import KovanVestingContract from '../deployments/kovan/Vesting.json'
import { ChainId } from '@usedapp/core'

/*TODO DEPLOY TO ALL NETWORKS */
export default {
    [ChainId.Kovan]: {
        contract: KovanVestingContract
    },
    [ChainId.Mainnet]: {
        contract: KovanVestingContract
    }
}