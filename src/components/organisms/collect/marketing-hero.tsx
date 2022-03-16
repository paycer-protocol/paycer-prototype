import Button from "@components/atoms/button";
import GradientButton from "@components/atoms/button/gradient-button";

const MarketingHero = () => {
    return (
        <div className="row">
            <div className="col-md-6">
                <h1 className="display-3">Earn and collect bonuses through extraordinary Paycer NFTs</h1>
            </div>
            <div className="col-md-6">
                <p>
                    Claim your special NFT utlity token simply by owning and staking Paycer PCR Tokens. There more you stake the more rare your Paycer NFT Tier and the higher your change for exclusiv utilites connected with your nft like higher staking rewards, lower trading fees, free beer and many more. If you don’t already own or stalk PCR Tokens start now buy buying your first PCR tokens.
                </p>

                <Button.Group>
                    <span className="me-3">
                        <GradientButton>CONNECT YOUR METAMASK</GradientButton>
                    </span>
                    <Button>BUY PCR TOKEN</Button>
                </Button.Group>
            </div>
        </div>
    );
};

export default MarketingHero;