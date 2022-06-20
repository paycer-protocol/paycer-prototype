import Card from "@components/molecules/card";
import { withIpfsGateway } from "@hooks/nft/use-nfts";
import Nft from "../../../../types/nft";

export interface NftCardProps {
  nft: Nft
}

export default function NftCard({ nft }: NftCardProps) {
  return (
    <div>
      <Card>
        <Card.Img src={withIpfsGateway(nft.metadata.image)}></Card.Img>
        <Card.Body>
          <h2 className="d-flex">
            <span className="me-4">{nft.metadata.name}</span>
            <span className="ms-auto">#{nft.id}</span>
          </h2>
        </Card.Body>
      </Card>
    </div>
  )
}