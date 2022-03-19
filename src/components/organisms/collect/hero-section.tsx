import Button from '@components/atoms/button';
import Image from '@components/atoms/image'
import GradientButton from '@components/atoms/button/gradient-button';
import React from 'react';
import useWallet from '@hooks/use-wallet';

const Stats = () => {
    return (
        <div className="row">
            <div className="col-3 d-flex flex-column"><h1 className="display-4 mb-1">6</h1><span>different Qualities</span></div>
            <div className="col-3 d-flex flex-column"><h1 className="display-4 mb-1">5</h1><span>different NFT Tiers</span></div>
            <div className="col-3 d-flex flex-column"><h1 className="display-4 mb-1">20,000</h1><span>possible combinations</span></div>
            <div className="col-3 d-flex flex-column"><h1 className="display-4 mb-1">40%</h1><span>possible rewards</span></div>
        </div>
    );
};

export interface HeroSectionProps {
    onMintClicked: () => void;
    onMoreInfoClicked: () => void;
}

const HeroSection = (props: HeroSectionProps) => {
    const { isConnected } = useWallet();

    return (
        <div className="row">
            <div className="col-xl-6">
                <h1 className="display-1">
                    {
                        isConnected
                            ? 'Collect your Paycer Utility NFT'
                            : 'Earn even more Paycer'
                    }
                </h1>
                <div className="mt-5">
                    <span className="me-4">
                        {
                            isConnected
                                ? <GradientButton onClick={props.onMintClicked}>Mint your NFT now</GradientButton>
                                : <GradientButton>Connect your MetaMask to start</GradientButton>
                        }
                    </span>
                    <Button onClick={props.onMoreInfoClicked}>More Info</Button>
                </div>
                <p className="mt-5">
                    {
                        isConnected
                            ? 'Simply collect your limited super rare NFT. Your staked PCR Token will be locked for 6 months. Click on Mint your NFT now to start gaining extra profits.'
                            : <Stats />
                    }
                </p>
            </div>
            <div className="col-xl-6 px-5">
                <Image src="/img/nft/nft.png" alt="NFT" />
            </div>
        </div>
    );
};

export default HeroSection;