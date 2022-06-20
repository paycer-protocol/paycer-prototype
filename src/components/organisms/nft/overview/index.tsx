import useOwnedNfts from "@hooks/nft/use-owned-nfts"

export default function NftOverview() {
  const nfts = useOwnedNfts();
  return (
    <div>{JSON.stringify(nfts, undefined, 2)}</div>
  )
}