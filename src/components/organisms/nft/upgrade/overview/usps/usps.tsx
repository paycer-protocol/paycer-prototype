import { t } from '@lingui/macro'
import Image from 'next/image'
import styled from 'styled-components'

function IconElement({ title, description, icon }: { title: string, description: string, icon: string }) {
  return (
    <div className="m-3 d-flex align-items-start">
      <div className="position-relative me-4 flex-shrink-0" style={{ width: '4rem', height: '4rem' }}>
        <Image src={`/img/nft/usps/icon-${icon}.svg`} layout="fill" />
      </div>
      <div className="d-flex flex-column">
        <div className="mb-3 h2"><b>{title}</b></div>
        <small style={{ fontSize: '14px' }} className="mb-0 text-muted">{description}</small>
      </div>
    </div>
  )
}

const usps = [
  {
    title: t`Unique 3D Artwork`,
    description: t`High quality and true 3D generative artwork with 10,000 unique NFTs`,
    icon: 'artwork',
  },
  {
    title: t`Utility NFT`,
    description: t`Holding the NFT provides benefits on Paycer's DeFi and CeDeFi platform`,
    icon: 'utilities',
  },
  {
    title: t`Branded NFT Credit Card`,
    description: t`Get your own branded credit card with your unique NFT to get more benefits.`,
    icon: 'creditcard',
  },
  {
    title: t`Ready for Metaverse`,
    description: t`Our 3D NFT is ready for the implementation in Metaverse partner projects`,
    icon: 'metaverse',
  },
  {
    title: t`Doxxed Team`,
    description: t`Public team of professionals and Paycer company based in Germany`,
    icon: 'team',
  },

]

export default function Usps() {
  return (
    <>
      <div>
        <div className="row">
          {usps.map((usp, key) => (
            <div key={key} className="col-lg-4 mb-5">
              <IconElement
                title={usp.title}
                description={usp.description}
                icon={usp.icon}
              />
            </div>
          ))}
        </div>
      </div>
    </>
  )
}
