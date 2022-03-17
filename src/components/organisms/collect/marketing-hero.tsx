import Button from "@components/atoms/button";
import GradientButton from "@components/atoms/button/gradient-button";
import Link from "next/link";

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
                        <GradientButton>Connect your MetaMask</GradientButton>
                    </span>
                    <Link href="/swap"><Button>Buy PCR Token</Button></Link>
                </Button.Group>
            </div>
        </div>
    );
};

export default MarketingHero;