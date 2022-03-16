import Button from '@components/atoms/button';
import Image from '@components/atoms/image'
import GradientButton from '@components/atoms/button/gradient-button';
import React from 'react';

const HeroSection = () => {
    return (
        <div className="row">
            <div className="col-xl-6">
                <h1 className="display-1">
                    Collect your Paycer Utility NFT
                </h1>
                <div className="mt-4">
                    <span className="me-4">
                        <GradientButton>MINT YOUR NFT NOW</GradientButton>
                    </span>
                    <Button>MORE INFO</Button>
                </div>
                <p className="mt-4">
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