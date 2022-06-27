import Card from "@components/molecules/card";
import { withIpfsGateway } from "@hooks/nft/use-nfts";
import Nft from "../../../../types/nft";
import NftModelViewer from "../common/model-viewer";

export interface NftCardProps {
  nft: Nft
}

export default function NftCard({ nft }: NftCardProps) {
  return (
    <div>
      <Card className="overflow-hidden">
        <div style={{ width: '100%', height: '16rem' }}>
          <NftModelViewer url={withIpfsGateway(nft.metadata.animation_url)} />
        </div>
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