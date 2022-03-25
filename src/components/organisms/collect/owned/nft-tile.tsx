import Card from "@components/molecules/card";
import { Nft } from "@hooks/nft/use-owned-nfts";

export interface NftTileProps {
    nft: Nft;
}

const NftTile = ({ nft }: NftTileProps) => {
    return (
        <Card className="position-relative">
            <Card.Img src={nft.image} className="p-5" />
            <Card.Body css={{ textAlign: 'center' }}>
                {nft.name}
                <br />
                {nft.description}
            </Card.Body>
        </Card>
    );
};

export default NftTile;