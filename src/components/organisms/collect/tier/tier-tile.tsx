import GradientButton from "@components/atoms/button/gradient-button";
import Icon from "@components/atoms/icon";
import Card from "@components/molecules/card";
import { Shuffle } from "@styled-icons/material";
import React from "react";
import styled from 'styled-components'
import QualityCircle from "../quality/quality-circle";
import { FEATURE_QUALITIES_FOR_TIER, NFT_QUALITIES_FOR_TIER, NUM_FEATURES_FOR_TIER, Tier, TIER_STAKING_REQUIREMENTS } from "./tier";

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
   tier: Tier,
}

const TierTile = ({ tier }: TierTileProps) => {
    return (
        <Card className="position-relative">
            <Card.Img src="/img/nft/nft.png" className="p-5" />
            <Separator />
            <Card.Body css={{ textAlign: 'center' }}>
                <DetailsRow left={<>Staked</>} right={<>&gt; {TIER_STAKING_REQUIREMENTS[tier].minimum} PCR</>} />
                <DetailsRow left={<>NFT Qualities <Icon component={Shuffle} size={20} /></>} right={<><QualityCircle.Group qualities={NFT_QUALITIES_FOR_TIER[tier]} /></>} />
                <DetailsRow left={<>Features</>} right={<>{NUM_FEATURES_FOR_TIER[tier]}</>} />
                <DetailsRow left={<><Icon component={Shuffle} size={20} /> Feature Qualities</>} right={<><QualityCircle.Group qualities={FEATURE_QUALITIES_FOR_TIER[tier]} /></>} />
                <div className="mt-3">
                    <GradientButton>Mint your NFT</GradientButton>
                </div>
            </Card.Body>
            <Rank>{tier}</Rank>
        </Card>
    );
};

export default TierTile;