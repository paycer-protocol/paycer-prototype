import Card from "@components/molecules/card";

interface ExplanationCardProps {
    title: string;
    description: string;
}

const ExplanationCard = (props: ExplanationCardProps) => {
    return (
        <div className="col-xl-4">
            <Card>
                <h1 className="text-center mt-4 mb-2">{props.title}</h1>
                <Card.Body className="text-center"><p className="mb-0">{props.description}</p></Card.Body>
            </Card>
        </div>
    );
}

const ExplanationSection = () => {
    return (
        <div className="row">
            <ExplanationCard title="Mixed reward Qualites" description="Claim your special NFT utlity token simply by owning and staking Paycer PCR Tokens. There more you stake the more rare your Paycer NFT Tier and the higher your change for exclusiv utilites connected with your nft like higher staking rewards." />
            <ExplanationCard title="Locked Period" description="Claim your special NFT utlity token simply by owning and staking Paycer PCR Tokens. There more you stake the more rare your Paycer NFT Tier and the higher your change for exclusiv utilites connected with your nft like higher staking rewards" />
            <ExplanationCard title="Value in value Out" description="Claim your special NFT utlity token simply by owning and staking Paycer PCR Tokens. There more you stake the more rare your Paycer NFT Tier and the higher your change for exclusiv utilites connected with your nft like higher staking rewards." />
            <ExplanationCard title="Mixed reward Qualites" description="Claim your special NFT utlity token simply by owning and staking Paycer PCR Tokens. There more you stake the more rare your Paycer NFT Tier and the higher your change for exclusiv utilites connected with your nft like higher staking rewards." />
            <ExplanationCard title="Locked Period" description="Claim your special NFT utlity token simply by owning and staking Paycer PCR Tokens. There more you stake the more rare your Paycer NFT Tier and the higher your change for exclusiv utilites connected with your nft like higher staking rewards" />
            <ExplanationCard title="Value in value Out" description="Claim your special NFT utlity token simply by owning and staking Paycer PCR Tokens. There more you stake the more rare your Paycer NFT Tier and the higher your change for exclusiv utilites connected with your nft like higher staking rewards." />
        </div>
    );
};

export default ExplanationSection;