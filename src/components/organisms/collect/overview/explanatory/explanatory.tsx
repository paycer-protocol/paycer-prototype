import Card from "@components/molecules/card";
import {t} from "@lingui/macro";

interface ExplanationCardProps {
    title: string
    description: string
}

const ExplanatoryCard = (props: ExplanationCardProps) => {
    return (
        <div className="col-xl-4">
            <Card>
                <h1 className="text-center mt-4 mb-2">{props.title}</h1>
                <Card.Body className="text-center">
                    <p className="mb-0">{props.description}</p>
                </Card.Body>
            </Card>
        </div>
    )
}

const Explanatory = () => {
    return (
        <div className="row">
            <ExplanatoryCard title={t`Mixed reward Qualites`} description={t`Claim your special NFT utlity token simply by owning and staking Paycer PCR Tokens. There more you stake the more rare your Paycer NFT Tier and the higher your change for exclusiv utilites connected with your nft like higher staking rewards.`}  />
            <ExplanatoryCard title={t`Locked Period`} description={t`Claim your special NFT utlity token simply by owning and staking Paycer PCR Tokens. There more you stake the more rare your Paycer NFT Tier and the higher your change for exclusiv utilites connected with your nft like higher staking rewards`}  />
            <ExplanatoryCard title={t`Value in value Out`} description={t`Claim your special NFT utlity token simply by owning and staking Paycer PCR Tokens. There more you stake the more rare your Paycer NFT Tier and the higher your change for exclusiv utilites connected with your nft like higher staking rewards.`}  />
            <ExplanatoryCard title={t`Mixed reward Qualites`} description={t`Claim your special NFT utlity token simply by owning and staking Paycer PCR Tokens. There more you stake the more rare your Paycer NFT Tier and the higher your change for exclusiv utilites connected with your nft like higher staking rewards.`}  />
            <ExplanatoryCard title={t`Locked Period`} description={t`Claim your special NFT utlity token simply by owning and staking Paycer PCR Tokens. There more you stake the more rare your Paycer NFT Tier and the higher your change for exclusiv utilites connected with your nft like higher staking rewards`}  />
            <ExplanatoryCard title={t`Value in value Out`} description={t`Claim your special NFT utlity token simply by owning and staking Paycer PCR Tokens. There more you stake the more rare your Paycer NFT Tier and the higher your change for exclusiv utilites connected with your nft like higher staking rewards.`}  />
        </div>
    )
}

export default Explanatory