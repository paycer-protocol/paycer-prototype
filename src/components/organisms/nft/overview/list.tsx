import Nft from "../../../../types/nft";
import NftCard from "./card";

interface NftCardListProps {
  nfts: Nft[]
}

export default function NftCardList({ nfts }: NftCardListProps) {
  return (
    <div className="row">
      {nfts.map((nft) => (
        <div className="col-6">
          <NftCard nft={nft} />
        </div>
      ))}
    </div>
  )
}