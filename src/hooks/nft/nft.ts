import { BigNumber } from "ethers";

export default interface Nft {
    id: BigNumber;
    name: string;
    description: string;
    image: string;
}