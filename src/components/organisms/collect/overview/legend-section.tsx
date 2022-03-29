import styled from 'styled-components'
import {Trans} from "@lingui/macro";

const Background = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(180deg, #0C1121 0%, rgba(12, 17, 33, 0) 100%), linear-gradient(270deg, rgba(112, 0, 255, 0) 0%, #7000FF 12.28%, #0035F1 25.31%, #FF9900 41.79%, #E14B4B 58.66%, #75EA8E 75.01%, #F1E265 91.49%, rgba(196, 196, 196, 0) 99.38%);
    opacity: 0.15;
`;

const BottomLine = styled.div`
    height: 1px;
    background: linear-gradient(270deg, rgba(112, 0, 255, 0) 0%, #7000FF 12.28%, #0035F1 25.31%, #FF9900 41.79%, #E14B4B 58.66%, #75EA8E 75.01%, #F1E265 91.49%, rgba(196, 196, 196, 0) 99.38%);
`;

const LegendEntryCircle = styled.div`
    width: 1rem;
    height: 1rem;
    border-radius: 100%;
    margin: 1rem;

    box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.25), inset 0px 4px 4px rgba(0, 0, 0, 0.25);
`;

interface LegendEntryProps {
    name: string;
    colorName: string;
    color: string;
}

const LegendEntry = (props: LegendEntryProps) => {
    return (
        <div className="flex-fill d-flex flex-column align-items-center">
            <b>{props.name}</b>
            <span>{props.colorName}</span>
            <LegendEntryCircle css={{ background: props.color }} />
        </div>
    );
};

const LegendSection = () => {
    return (
        <div>
            <h2 className="display-4 mb-5">
                <Trans>NFT Qualities</Trans>
            </h2>
            <div className="d-flex p-2 pt-4 position-relative">
                <LegendEntry name="Common" colorName="(Yellow)" color="#FFF06B" />
                <LegendEntry name="Uncommon" colorName="(Green)" color="#77EA8E" />
                <LegendEntry name="Rare" colorName="(Red)" color="#E14D4C" />
                <LegendEntry name="Epic" colorName="(Orange)" color="#FF9901" />
                <LegendEntry name="Legendary" colorName="(Blue)" color="#0135F2" />
                <LegendEntry name="Artifact" colorName="(Purple)" color="#5605C5" />
                <Background />
            </div>
            <BottomLine />
        </div>
    )
}

export default LegendSection;