import { ChainId } from "@usedapp/core";
import MumbaiContract from "../deployments/mumbai/nft";


export default <const>{
  [ChainId.Mumbai]: MumbaiContract,
}