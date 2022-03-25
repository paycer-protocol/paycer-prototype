import useOwnedNfts from "@hooks/nft/use-owned-nfts";
import { Trans } from "@lingui/macro";
import NftTile from "./nft-tile";

const NftList = () => {
    const nfts = useOwnedNfts();

    if (nfts === undefined) return <div>Loading</div>;

    return (
        <div>
            <h2 className="display-4"><Trans>Your NFTs</Trans></h2>
            <div className="row">
                {
                    nfts.map((nft) => (
                        <div className="col-xl-4">
                            <NftTile nft={nft} />
                        </div>
                    ))
                }
            </div>
        </div>
    );
};

export default NftList;