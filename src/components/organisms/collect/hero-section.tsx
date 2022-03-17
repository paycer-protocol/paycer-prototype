import Button from '@components/atoms/button';
import Image from '@components/atoms/image'
import GradientButton from '@components/atoms/button/gradient-button';
import React from 'react';

export interface HeroSectionProps {
    onMintClicked: () => void;
    onMoreInfoClicked: () => void;
}

const HeroSection = (props: HeroSectionProps) => {
    return (
        <div className="row">
            <div className="col-xl-6">
                <h1 className="display-1">
                    Collect your Paycer Utility NFT
                </h1>
                <div className="mt-5">
                    <span className="me-4">
                        <GradientButton onClick={props.onMintClicked}>Mint your NFT now</GradientButton>
                    </span>
                    <Button onClick={props.onMoreInfoClicked}>More Info</Button>
                </div>
                <p className="mt-5">
                    Simply collect your limited super rare NFT. Your staked PCR Token will be locked for 6 months. Click on Mint your NFT now to start gaining extra profits.
                </p>
            </div>
            <div className="col-xl-6 px-5">
                <Image src="/img/nft/nft.png" alt="NFT" />
            </div>
        </div>
    );
};

export default HeroSection;