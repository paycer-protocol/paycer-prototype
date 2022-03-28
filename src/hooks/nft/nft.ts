import { BigNumber } from "ethers";

export default interface Nft {
    id: BigNumber;
    name: string;
    description: string;
    owner: string;
    image: string;
    attributes: {
        displayType?: string;
        traitType: string;
        value: string | number | boolean;
    }[];
}