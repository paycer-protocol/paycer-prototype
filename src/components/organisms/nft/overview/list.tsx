import Nft from "../../../../types/nft";
import NftCard from "./card";

interface NftCardListProps {
  nfts: Nft[]
}

export default function NftCardList({ nfts }: NftCardListProps) {
  return (
    <div className="row">
      {nfts.map((nft) => (
        <div key={nft.id} className="col-12 col-md-6">
          <NftCard nft={nft} />
        </div>
      ))}
    </div>
  )
}