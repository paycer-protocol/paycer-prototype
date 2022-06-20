import useOwnedNfts from "@hooks/nft/use-owned-nfts"
import NftCardList from "./list";

export default function NftOverview() {
  const result = useOwnedNfts();
  return (
    <div>
      {result.status === 'success' && <NftCardList nfts={result.nfts} />}
    </div>
  )
}