import useOwnedNfts from "@hooks/nft/use-owned-nfts";
import { Trans } from "@lingui/macro";
import { Loading } from "react-loading-dot";
import NftTile from "./nft-tile";

const NftList = () => {
    const ownedNfts = useOwnedNfts()
    // @ts-ignore
    if (Array.isArray(ownedNfts.nfts) && !ownedNfts.nfts.length) {
        return null
    }

    let children
    if (ownedNfts.status === 'error') {
        children = ( // TODO:
            <div>
                Error
            </div>
        )
    } else if (ownedNfts.status === 'loading') {
        children = ( // TODO:
            <div>
                Loading
            </div>
        )
    } else {
        children = (
            <div className="row">
                {
                    ownedNfts.nfts.map((nft) => (
                        <div className="col-xl-6">
                            <NftTile nft={nft} />
                        </div>
                    ))
                }
            </div>
        )
    }

    return (
        <div className="mt-6 pt-3">
            <h2 className="display-4 mb-5"><Trans>Your NFTs</Trans></h2>
            { children }
        </div>
    )
}

export default NftList