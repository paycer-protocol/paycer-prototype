import KovanPrivateVestingContract from '../deployments/kovan/vesting/private/Vesting.json'
import { ChainId } from '@usedapp/core'

/*TODO DEPLOY TO ALL NETWORKS */
export default {
    [ChainId.Kovan]: {
        private: {
            contract: KovanPrivateVestingContract
        },
        pre: {
            contract: KovanPrivateVestingContract
        },
        public: {
            contract: KovanPrivateVestingContract
        }
    },
    [ChainId.Mainnet]: {
        private: {
            contract: KovanPrivateVestingContract
        },
        pre: {
            contract: KovanPrivateVestingContract
        },
        public: {
            contract: KovanPrivateVestingContract
        }
    }
}