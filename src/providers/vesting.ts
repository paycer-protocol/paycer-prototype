import { ChainId } from '@usedapp/core'
import VestingAbi from '../deployments/mumbai/VestingAbi.json'

export default {
    [ChainId.Polygon]: {
        abi: VestingAbi.abi,
        private: {
            address: '##todo##'
        },
        pre: {
            address: '##todo##'
        },
        public: {
            address: '##todo##'
        },
        team: {
            address: '##todo##'
        },
        advisor: {
            address: '##todo##'
        }
    },
    [ChainId.Mumbai]: {
        abi: VestingAbi.abi,
        private: {
            address: '0x111d13fBc49A5aB91a721be88008F3090ab727E0'
        },
        pre: {
            address: '0x909fEb2857814565F257314F295a01Fe7e3F3939'
        },
        public: {
            address: '0x8A8555E4a143Dc2f5DfA31D8334585d14C6c326B'
        },
        team: {
            address: '0x45816da4dff59560F229C468ec16eF6A5ea4c58A'
        },
        advisor: {
            address: '0x86bd32443eb7675D00295ff27287762D0e3D243D'
        }
    },
}
