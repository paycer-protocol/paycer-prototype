import GradientButton from "@components/atoms/button/gradient-button";
import { FormattedNumber } from "@components/atoms/number";
import Card from "@components/molecules/card";
import { loyaltyTierLabels } from "@config/loyalty-tiers";
import useMintCount from "@hooks/nft/use-mint-count";
import useNfts from "@hooks/nft/use-nfts";
import useWallet from "@hooks/use-wallet";
import { t } from "@lingui/macro";
import { BigNumber } from "@ethersproject/bignumber";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import Attributes from "./attributes";
import GetStarted from "./get-started";
import Pill from "./pill";

const Layout = () => {
    const wallet = useWallet();
    const tokenId = BigNumber.from(useRouter().query.tokenId);
    const nftResult = useNfts([tokenId]);

    const tierMintCount = useMintCount(nftResult.status === 'success' ? nftResult.nfts[0].tier : undefined);

    // TODO
    if (nftResult.status === 'loading') {
        return (<div>Loading</div>)
    }
    if (nftResult.status === 'error') {
        return (<div>Error</div>)
    }

    const nft = nftResult.nfts[0];
    const features = nft.attributes.length - 1;

    return (
        <div className="row">
            <div className="col-6">
                <div className="pe-2">
                    <Card>
                        <Card.Img src={nft.image} className="p-5" />
                    </Card>
                    <div className="row">
                        <div className="col-4">
                            <h5 className="header-pretitle">{t`Owner`}</h5>
                            <p className="text-truncate text-nowrap">{nft.owner}</p>
                            {nft.owner === wallet.address && <Pill>You</Pill>}
                        </div>
                        <div className="col-4 text-truncate">Owner {nft.owner}</div>
                        <div className="col-4 text-truncate">Owner {nft.owner}</div>
                    </div>
                </div>
            </div>
            <div className="col-6">
                <div className="ps-2">
                    <div className="mb-4">
                        <span className="me-3">
                            <Pill>{loyaltyTierLabels[nft.tier]}</Pill>
                        </span>
                        <span className="me-3">
                            <Pill>#<FormattedNumber value={nft.id.toString()} /></Pill>
                        </span>
                        {/* TODO: Plural */}
                        <Pill><FormattedNumber value={features} /> {t`Features`}</Pill>
                    </div>
                    <h1 className="display-3">{nft.name}</h1>
                    <p>{nft.description}</p>

                    <div><FormattedNumber value={tierMintCount} /> {t`minted`}</div>

                    <Attributes attributes={nft.attributes} />

                    <GetStarted /> 
                </div>
            </div>
        </div>
    );
};

export default Layout;