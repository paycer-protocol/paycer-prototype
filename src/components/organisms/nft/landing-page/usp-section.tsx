import { t } from '@lingui/macro';
import Image from 'next/image';
import styled from "styled-components";

const Background = styled.div`
  background: url("/img/nft/icon-section/background.png");
  padding: 6rem 0;
`

function IconElement({ title, description, icon }: { title: string, description: string, icon: string }) {
  return (
    <div className="m-3 d-flex align-items-center">
      <div className="position-relative me-4 flex-shrink-0" style={{ width: '4.5rem', height: '4.5rem' }}>
        <Image src={`/img/nft/icon-section/${icon}.svg`} layout="fill" />
      </div>
      <div className="d-flex flex-column">
        <div className="mb-3 h2"><b>{title}</b></div>
        <small style={{fontSize: '14px'}} className="mb-0 text-muted">{description}</small>
      </div>
    </div>
  )
}

const elements = [
  {
    title: t`Discount & Bonus`,
    description: t`Holding an NFT with this utility will lower the platform fees for you.`,
    icon: 'discount',
  },
  {
    title: t`Discount & Bonus`,
    description: t`Holding an NFT with this utility will lower the platform fees for you.`,
    icon: 'discount',
  },
  {
    title: t`Discount & Bonus`,
    description: t`Holding an NFT with this utility will lower the platform fees for you.`,
    icon: 'discount',
  },
  {
    title: t`Discount & Bonus`,
    description: t`Holding an NFT with this utility will lower the platform fees for you.`,
    icon: 'discount',
  },
  {
    title: t`Discount & Bonus`,
    description: t`Holding an NFT with this utility will lower the platform fees for you.`,
    icon: 'discount',
  },
  {
    title: t`Discount & Bonus`,
    description: t`Holding an NFT with this utility will lower the platform fees for you.`,
    icon: 'discount',
  },
  {
    title: t`Discount & Bonus`,
    description: t`Holding an NFT with this utility will lower the platform fees for you.`,
    icon: 'discount',
  },
  {
    title: t`Discount & Bonus`,
    description: t`Holding an NFT with this utility will lower the platform fees for you.`,
    icon: 'discount',
  },
] as const

export default function UspSection() {

  return (
      <>
        <Background>
          <div className="container">
            <div className="row">
              {elements.map((element) => (
                  <div className="col-lg-4 mb-3">
                    <IconElement
                        title="Discount & Bonus"
                        description="Holding an NFT with this utility will lower the platform fees for you."
                        icon="discount"
                    />
                  </div>
              ))}
            </div>
          </div>
        </Background>
        <div className="content-gradient-border" />
      </>

  )
}