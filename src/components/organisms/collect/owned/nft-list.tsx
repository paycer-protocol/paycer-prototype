import useOwnedNfts from "@hooks/nft/use-owned-nfts";
import { Trans } from "@lingui/macro";
import { Loading } from "react-loading-dot";
import NftTile from "./nft-tile";

const NftList = () => {
    const ownedNfts = useOwnedNfts();

    let children;
    if (ownedNfts.status === 'error') {
        children = ( // TODO:
            <div>
                Error
            </div>
        );
    } else if (ownedNfts.status === 'loading') {
        children = ( // TODO:
            <div>
                Loading
            </div>
        );
    } else {
        children = (
            <div className="row">
                {
                    ownedNfts.nfts.map((nft) => (
                        <div className="col-xl-4">
                            <NftTile nft={nft} />
                        </div>
                    ))
                }
            </div>
        );
    }

    return (
        <div>
            <h2 className="display-4"><Trans>Your NFTs</Trans></h2>
            { children }
        </div>
    );
};

export default NftList;