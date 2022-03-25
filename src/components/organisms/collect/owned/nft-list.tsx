import useOwnedNfts from "@hooks/nft/use-owned-nfts";
import NftTile from "./nft-tile";

const NftList = () => {
    const nfts = useOwnedNfts();

    if (nfts === undefined) return <div>Loading</div>;

    return (
        <div className="row">
            {
                nfts.map((nft) => (
                    <div className="col-xl-4">
                        <NftTile nft={nft} />
                    </div>
                ))
            }
        </div>
    );
};

export default NftList;