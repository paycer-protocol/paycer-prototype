import GradientButton from "@components/atoms/button/gradient-button";
import Card from "@components/molecules/card";
import { t } from "@lingui/macro";
import Link from "next/link";


const GetStarted = () => {
    return (
        <div>
            <h2 className="display-5">{t`Get started now`}</h2>
            <Card>
                <Card.Header>
                    <h1 className="mt-4 mb-2">{t`Get your own NFT`}</h1>
                </Card.Header>
                <Card.Body>
                    <p className="mb-4">
                        {t`Claim your special NFT utlity token simply by owning and staking Paycer PCR Tokens. There more you stake the more rare your Paycer NFT Tier and the higher your change for exclusiv utilites connected with your nft like higher staking rewards`}
                    </p>
                    <Link href="/swap">
                        <GradientButton>{t`Buy PCR Token`}</GradientButton>
                    </Link>
                </Card.Body>
            </Card>
        </div>
    )
};

export default GetStarted;