import { ChainId } from '@usedapp/core'
import VestingAbi from '../deployments/mumbai/VestingAbi.json'

export default {
    [ChainId.Polygon]: {
        abi: VestingAbi.abi,
        private: {
            address: '0x7Fd3DA382bcF1C1d66813E3a8d1b12eE56368618'
        },
        pre: {
            address: '0xfd7EC62C0d20C799b01E3D61EC53A2780893fc10'
        },
        public: {
            address: '0x35D186198D8429f2ED678bE7C6158f974e7c7BBd'
        },
        team: {
            address: '0xB3e2b6a260B967aCa2875d687eb7099Cd04537DE'
        },
        advisor: {
            address: '0x4702f9794d0B8DEDD55a488D8198a1781396BCE6'
        },
        private_v2: {
            address: '0xdb5Ca1c335e743499f2c6991b157C9b8D7786035'
        },
        pre_v2: {
            address: '0xdCdC0559B6002828f18b29A29f9c899fDFd272dD'
        },
        public_v2: {
            address: '0xD9Dac66F41c76F7A381E85DC5b6265993f5c2033'
        },
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
