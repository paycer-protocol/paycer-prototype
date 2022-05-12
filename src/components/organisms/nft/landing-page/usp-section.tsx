import { t } from '@lingui/macro';
import Image from 'next/image';
import styled from "styled-components";

function IconElement({ title, description, icon }: { title: string, description: string, icon: string }) {
  return (
    <div className="m-3 d-flex align-items-start">
      <div className="position-relative me-4 flex-shrink-0" style={{ width: '4rem', height: '4rem' }}>
        <Image src={`/img/nft/usps/icon-${icon}.svg`} layout="fill" />
      </div>
      <div className="d-flex flex-column">
        <div className="mb-3 h2"><b>{title}</b></div>
        <small style={{fontSize: '14px'}} className="mb-0 text-muted">{description}</small>
      </div>
    </div>
  )
}

const usps = [
  {
    title: t`Unique 3D Artwork`,
    description: t`High quality 3D generative art, 10,000 unique NFTs`,
    icon: 'artwork',
  },
  {
    title: t`Utilities`,
    description: t`Holding the NFT provides platform benefits for DeFi and CeDeFi`,
    icon: 'utilities',
  },
  {
    title: t`Get your Unique NFT Credit Card`,
    description: t`get your NFT printed on your Credit Card`,
    icon: 'creditcard',
  },
  {
    title: t`Ready for Metaverse`,
    description: t`Our 3D NFT will be implemented in Metaverse Partner Projects`,
    icon: 'metaverse',
  },
  {
    title: t`Doxxed Team`,
    description: t`public team and company based in Germany`,
    icon: 'team',
  },
  {
    title: t`Interaction with PCR token`,
    description: t`Paycer has is own DeFi utility token PCR that interacts with the NFT`,
    icon: 'pcrtoken',
  },
  {
    title: t`Upgradable NFT`,
    description: t`Level up your NFT by staking PCR tokens to create an even more valuable NFT`,
    icon: 'upgrade',
  },
  {
    title: t`Breeding`,
    description: t`Breed with two Paycer NFTs to create a new generation of NFTs by utilizing the PCR token`,
    icon: 'breed',
  },
  {
    title: t`Future Cash Back & Reward Program`,
    description: t`The NFT adds features to your credit card and account to receive rewards and cash back`,
    icon: 'cashback',
  },
] as const

export default function UspSection() {

  return (
      <>
        <div className="container pt-6">
          <div className="mb-5">
            <h5 className="text-uppercase mb-2 text-pink fw-bold">
              {t`WHAT WE OFFER`}
            </h5>
            <div className="h1 mb-4">
              {t`Your advantages`}
            </div>
          </div>
          <div className="row">
            {usps.map((usp) => (
                <div className="col-lg-4 mb-3">
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