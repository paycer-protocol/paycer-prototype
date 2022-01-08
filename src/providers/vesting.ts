import MumbaiPrivateVestingContract from '../deployments/mumbai/vesting/private/Vesting.json'
import { ChainId } from '@usedapp/core'

/*TODO DEPLOY TO ALL NETWORKS */
export default {
    [ChainId.Mumbai]: {
        private: {
            contract: MumbaiPrivateVestingContract
        },
        pre: {
            contract: MumbaiPrivateVestingContract
        },
        public: {
            contract: MumbaiPrivateVestingContract
        }
    },

}