import Button from '@components/atoms/button';
import Image from '@components/atoms/image'
import GradientButton from '@components/atoms/button/gradient-button';
import React from 'react';
import useWallet from '@hooks/use-wallet';
import Icon from '@components/atoms/icon';
import { Shuffle } from '@styled-icons/material';
import ConnectWalletButton from './connect-wallet-button';

const Stats = () => {
    return (
        <div className="row">
            <div className="col-3 d-flex flex-column pe-3"><h1 className="display-4 mb-1">6 <Icon component={Shuffle} size={20} /></h1><span>different Qualities</span></div>
            <div className="col-3 d-flex flex-column pe-3"><h1 className="display-4 mb-1">5 <Icon component={Shuffle} size={20} /></h1><span>different NFT Tiers</span></div>
            <div className="col-3 d-flex flex-column pe-3"><h1 className="display-4 mb-1">20,000</h1><span>possible combinations</span></div>
            <div className="col-3 d-flex flex-column pe-3"><h1 className="display-4 mb-1">40%</h1><span>possible rewards</span></div>
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
                                : <ConnectWalletButton />
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
              <video width="100%" height="100%" controls={false} loop autoPlay>
                <source src="/img/nft/animated_medium20220126-24456-1gd6r9n.mp4" type="video/mp4" />
              </video>
            </div>
        </div>
    );
}

export default HeroSection;
