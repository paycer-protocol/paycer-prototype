import Button from "@components/atoms/button";
import Card from "@components/molecules/card";
import Nft from "@hooks/nft/nft";
import { t } from "@lingui/macro";
import Link from "next/link";

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
                <div className="mt-4">
                    <Link href={`/collect/${nft.id}`}>
                        <Button>{t`View Details`}</Button>
                    </Link>
                </div>
            </Card.Body>
        </Card>
    );
};

export default NftTile;