import MumbaiPaycerTokenContract from '../deployments/mumbai/PaycerToken.json'
import KovanPaycerTokenContract from '../deployments/kovan/PaycerToken.json'
import MainPaycerTokenContract from '../deployments/mainnet/PaycerToken.json'
import { ChainId } from '@usedapp/core'

export default {
    [ChainId.Mumbai]: {
        contract: MumbaiPaycerTokenContract
    },
    [ChainId.Kovan]: {
        contract: KovanPaycerTokenContract
    },
    [ChainId.Mainnet]: {
        contract: MainPaycerTokenContract
    }
}
