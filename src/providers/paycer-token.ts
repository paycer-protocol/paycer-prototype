import MumbaiPaycerTokenContract from '../deployments/mumbai/PaycerToken.json'
import KovanPaycerTokenContract from '../deployments/kovan/PaycerToken.json'
import { ChainId } from '@usedapp/core'

/*TODO DEPLOY TO ALL NETWORKS */
export default {
    [ChainId.Mumbai]: {
        contract: MumbaiPaycerTokenContract
    },
    [ChainId.Kovan]: {
        contract: KovanPaycerTokenContract
    },
    [ChainId.Mainnet]: {
        contract: KovanPaycerTokenContract
    }
}