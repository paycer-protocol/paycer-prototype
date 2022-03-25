import { ChainId } from "@usedapp/core";

import MumbaiContract from '../deployments/mumbai/NFT.json';

export default <const>{
    [ChainId.Mumbai]: {
        contract: MumbaiContract
    },
}

