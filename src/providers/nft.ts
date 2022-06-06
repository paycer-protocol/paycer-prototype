import ChainId from '../providers/chain-id'
import MumbaiContract from '../deployments/mumbai/nft'
import MaticContract from '../deployments/matic/nft'

export default <const>{
  [ChainId.Mumbai]: MumbaiContract,
  [ChainId.Polygon]: MaticContract,
}