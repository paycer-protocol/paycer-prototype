import Button from "@components/atoms/button";
import GradientButton from "@components/atoms/button/gradient-button";
import Icon from "@components/atoms/icon";
import Card from "@components/molecules/card";
import { LoyaltyTier, loyaltyTierLabels, stakingRequirements } from "@config/loyalty-tiers";
import { loyaltyTierFeatureQualities, loyaltyTierFeatures, loyaltyTierNftQualities } from "@config/nft-qualities";
import { Shuffle } from "@styled-icons/material";
import Link from "next/link";
import React, { useState } from "react";
import styled from 'styled-components'
import MintingApproveModal from "../minting/minting-approve-modal";
import QualityCircle from "../quality/quality-circle";

const Separator = styled.div`
    height: 1px;
    background: linear-gradient(270deg, rgba(112, 0, 255, 0) 0%, #7000FF 12.28%, #0035F1 25.31%, #FF9900 41.79%, #E14B4B 58.66%, #75EA8E 75.01%, #F1E265 91.49%, rgba(196, 196, 196, 0) 99.38%);
`;

const DetailsRow = ({ left, right }: { left: React.ReactNode, right: React.ReactNode }) => {
    return (
        <div className="d-flex justify-content-between">
            <div className="pr-3 pb-3">{left}</div>
            <div className="">{right}</div>
        </div>
    );
};

const Rank = styled.div`
    position: absolute;
    top: 0.5rem;
    left: 0.5rem;
    border-radius: 0.3rem;
    padding: 0.5rem 1rem;
    background-color: #1B2E44;
    font-weight: 600;
`;

export interface TierTileProps {
    isConnected: boolean;
    loyaltyTier: LoyaltyTier;
    stakedBalance: number;
}

const TierTile = ({ isConnected, loyaltyTier, stakedBalance }: TierTileProps) => {
    const [mintingApproveModal, setMintingApproveModal] = useState(false);

    let button = <Button disabled>Wallet required</Button>;
    if (isConnected) {
        if (stakedBalance < stakingRequirements[loyaltyTier].minimum) {
            button = <Link href="/swap"><Button>Buy PCR Token</Button></Link>;
        } else if (stakedBalance > stakingRequirements[loyaltyTier].maximum) {
            button = <Button disabled>Below your tier</Button>;
        } else {
            button = (
                <span onClick={() => setMintingApproveModal(true)}>
                    <GradientButton>Mint your NFT</GradientButton>
                </span>
            );
        }
    }


    return (
        <Card className="position-relative">
            <Card.Img src="/img/nft/nft.png" className="p-5" />
            <Separator />
            <Card.Body css={{ textAlign: 'center' }}>
                <DetailsRow left={<>Staked</>} right={<>&gt; {stakingRequirements[loyaltyTier].minimum} PCR</>} />
                <DetailsRow left={<>NFT Qualities <Icon component={Shuffle} size={20} /></>} right={<><QualityCircle.Group qualities={loyaltyTierNftQualities[loyaltyTier]} /></>} />
                <DetailsRow left={<>Features</>} right={<>{loyaltyTierFeatures[loyaltyTier]}</>} />
                <DetailsRow left={<><Icon component={Shuffle} size={20} /> Feature Qualities</>} right={<><QualityCircle.Group qualities={loyaltyTierFeatureQualities[loyaltyTier]} /></>} />
                <div className="mt-3">
                    { button }
                </div>
            </Card.Body>
            <Rank>{loyaltyTierLabels[loyaltyTier]}</Rank>

            <MintingApproveModal show={mintingApproveModal} onHide={() => setMintingApproveModal(false)} />
        </Card>
    );
};

export default TierTile;