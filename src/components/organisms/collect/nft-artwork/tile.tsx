import GradientButton from "@components/atoms/button/gradient-button";
import Card from "@components/molecules/card";
import styled from 'styled-components'

const Seperator = styled.div`
    height: 1px;
    background: linear-gradient(270deg, rgba(112, 0, 255, 0) 0%, #7000FF 12.28%, #0035F1 25.31%, #FF9900 41.79%, #E14B4B 58.66%, #75EA8E 75.01%, #F1E265 91.49%, rgba(196, 196, 196, 0) 99.38%);
`;


export interface NftArtworkTileProps {

}

const NftArtworkTile = (props: NftArtworkTileProps) => {
    return (
        <Card>
            <Card.Img src="/img/nft/nft.png" />
            <Seperator />
            <Card.Body>
                <div className="d-flex">
                    <div className="d-flex-1">Staked</div>
                    <div className="col">&gt; 5,000 PCR</div>
                </div>
                <GradientButton>MINT YOUR NFT</GradientButton>
            </Card.Body>
        </Card>
    );
};

export default NftArtworkTile;