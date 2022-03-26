import Card from "@components/molecules/card";
import useNfts from "@hooks/nft/use-nfts";
import { BigNumber } from "ethers";
import Image from "next/image";
import { useRouter } from "next/router";

const Layout = () => {
    const tokenId = BigNumber.from(useRouter().query.tokenId);
    const nftResult = useNfts([tokenId]);

    // TODO
    if (nftResult.status === 'loading') {
        return (<div>Loading</div>)
    }
    if (nftResult.status === 'error') {
        return (<div>Error</div>)
    }

    const nft = nftResult.nfts[0];

    return (
        <div className="container row">
            <div className="col-6">
                <Card>
                    <Card.Img src={nft.image} className="p-5" />
                </Card>
                <div className="row">
                    <div className="col-4">Owner</div>
                </div>
            </div>
            <div className="col-6">
                <h1 className="display-3">{nft.name}</h1>
                <p>{nft.description}</p>
            </div>
        </div>
    );
};

export default Layout;