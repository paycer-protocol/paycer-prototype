import styled from 'styled-components'
import { t } from "@lingui/macro"
import { NftRarities } from '@config/nft'
import React from "react";
import {infoChartProviders} from "@providers/networks";
import QualityCircle from "@components/organisms/nft/upgrade/overview/quality/quality-circle";

const Background = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(180deg,#0C1121 0%,rgba(12,17,33,0) 100%),linear-gradient(270deg,rgba(112,0,255,0) 0%,#E14B4B 12.28%,#FF9900 25.31%,#ff00d0ad 41.79%,#5043d3 58.66%,#75EA8E 75.01%,#F1E265 91.49%,rgba(196,196,196,0) 99.38%);
    opacity: 0.15;
`

const BottomLine = styled.div`
    height: 1px;
    background: linear-gradient(270deg,rgba(112,0,255,0) 0%,#E14B4B 12.28%,#FF9900 25.31%,#634ec1ad 41.79%,#5043d3 58.66%,#75EA8E 75.01%,#FFFFFF 91.49%,rgba(196,196,196,0) 99.38%);
`

const LegendEntryLabel = styled.div`
  font-weight: 600;
  &:first-letter {
    text-transform: uppercase;
  }
`

const LegendEntryCircle = styled.div`
    width: 1rem;
    height: 1rem;
    border-radius: 100%;
    margin: 1rem;
    box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.25), inset 0px 4px 4px rgba(0, 0, 0, 0.25);
`

interface LegendEntryProps {
    name: string;
    color: string;
}

const LegendEntry = (props: LegendEntryProps) => {
    return (
        <div className="flex-fill d-flex flex-column align-items-center">
            <LegendEntryLabel>{props.name}</LegendEntryLabel>
            <LegendEntryCircle css={{ background: props.color }} />
        </div>
    )
}

const QualityLegend = () => {
    return (
        <div>
          <div className="mb-5">
            <h5 className="text-uppercase mb-3 text-pink">{t`utilitys and rareties`}</h5>
            <div className="header-title h1">{t`5 unique utilities in differnet rareties`}</div>
          </div>
            <div className="d-flex p-2 pt-4 position-relative">
                {Object.keys(NftRarities).map((key) => (
                    <LegendEntry name={NftRarities[key].label} color={NftRarities[key].color} />
                ))}
                <Background />
            </div>
            <BottomLine />
        </div>
    )
}

export default QualityLegend