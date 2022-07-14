import Link from 'next/link'
import Nft from '../../../../types/nft'
import NftCard from './card'

interface NftCardListProps {
  nfts: Nft[]
}

export default function NftCardList({ nfts }: NftCardListProps) {
  return (
    <div className="row">
      {nfts.map((nft, key) => (
        <div key={nft.id} className="col-12 col-md-6">
          <Link className="bla" href={`/nft/detail/${key}`}>
            <a href="#!">
              <NftCard nft={nft} />
            </a>
          </Link>
        </div>
      ))}
    </div>
  )
}
