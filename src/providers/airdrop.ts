import AirdropAbi from '../deployments/Airdrop.json'
import { ChainId } from '@usedapp/core'

export default {
    abi: AirdropAbi,
    [ChainId.Mumbai]: '0x5C86297b9759B1994Ab2fAeeE411817c50190Ac5',
    [ChainId.Polygon]: '0x042BB64E0ECD4b590E24B52b4A647F9Bb3eE7b40'
}
