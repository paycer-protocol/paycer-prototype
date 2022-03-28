import GradientButton from "@components/atoms/button/gradient-button";
import Card from "@components/molecules/card";
import { Trans } from "@lingui/macro";
import Link from "next/link";


const GetStarted = () => {
    return (
        <div>
            <h2 className="display-5"><Trans>Get started now</Trans></h2>
            <Card>
                <Card.Header>
                    <h1 className="mt-4 mb-2"><Trans>Get your own NFT</Trans></h1>
                </Card.Header>
                <Card.Body>
                    <p className="mb-4">
                        <Trans>Claim your special NFT utlity token simply by owning and staking Paycer PCR Tokens. There more you stake the more rare your Paycer NFT Tier and the higher your change for exclusiv utilites connected with your nft like higher staking rewards</Trans>
                    </p>
                    <Link href="/swap">
                        <GradientButton><Trans>Buy PCR Token</Trans></GradientButton>
                    </Link>
                </Card.Body>
            </Card>
        </div>
    )
};

export default GetStarted;