import Nft from "../../../../types/nft";

export interface NftCardProps {
  nft: Nft
}

export default function NftCard({ nft }: NftCardProps) {
  return (
    <div>
      {nft.id}
    </div>
  )
}