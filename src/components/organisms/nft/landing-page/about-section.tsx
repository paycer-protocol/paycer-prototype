import React from "react";
import styled from 'styled-components'
import PageHeader from "@components/molecules/page-header"
import { t } from "@lingui/macro"
import NftModelViewer from "../common/model-viewer";

const partners = [
  {
    name: 'Cointelegraph',
    url: 'https://cointelegraph.com/press-releases/paycer-set-to-combine-defi-and-crypto-with-traditional-banking-services',
    imagePath: 'img/featured/cointelegraph.png',
  },
  {
    name: 'YAHOO Finance Global',
    url: 'https://finance.yahoo.com/news/german-fintech-startup-paycer-combine-155400031.html',
    imagePath: 'img/featured/yahoo-finance.png',
  },
  {
    name: 'Forbes',
    url: 'https://www.forbes.com/sites/kenrapoza/2021/12/30/cryptocurrency-investing-predictions-for-2022/',
    imagePath: 'img/featured/forbes.png',
  },
  {
    name: 'Benzinga',
    url: 'https://www.benzinga.com/pressreleases/21/12/g24432433/german-fintech-startup-paycer-to-combine-defi-crypto-with-conventional-banking-services',
    imagePath: 'img/featured/bezinga.png',
  },
]

export const FeatureListWrapper = styled.div`
  margin-top: -8px;
  .team-card {
    margin-top: 48px;
    padding-right: 60px;
    
    @media (max-width: 770px) {
      margin-top: 40px; 
      padding-right: 13px;
    }
    @media (max-width: 768px) and (min-width: 600px) {
      margin-top: 40px; 
      padding-right: 13px;
    }
  }

  ul {
    padding: 0;
    margin-bottom: 0;
    li {
      list-style: none;
      img {
        filter: grayscale(100%);
      }
    }
  }
`


function TechnologyList() {
  return (
    <div className="mt-5 mb-6">
      <div className="mb-5">
        <h5 className="text-uppercase mb-3 text-pink">
          {t`featured on`}
        </h5>
        <PageHeader.Title>
          {t`Paycer in the Media`}
        </PageHeader.Title>
      </div>
      <FeatureListWrapper>
        <ul className="row">
          {partners.map((item, key) => (
            <li className="col-6 col-lg-3 mb-4 d-flex align-items-center">
              <a href={item.url} target="_blank" key={key} className="d-flex justify-content-md-center">
                <img className="w-75" src={item.imagePath} />
              </a>
            </li>
          ))}
        </ul>
      </FeatureListWrapper>
    </div>
  )
}

function AboutText() {
  return (
    <>
      <div className="mb-2"></div>
      <div className="mb-5">
        <h5 className="text-uppercase mb-3 text-pink">
          {t`NEXT LEVEL NFT`}
        </h5>
        <PageHeader.Title>
          {t`What is the Paycer NFT?`}
        </PageHeader.Title>
      </div>

      <p className="mt-4 text-muted paragraph-content">
        {t`The Paycer team will drop a fresh and creative 3D utility NFT collection. With the Paycer NFT you get your unique & full 3D robot horse that is ready for game implementations and the Metaverse.
                The NFT will also provide utilities on our DeFi and CeDeFi platform. Get your own unique Paycer NFT and enjoy cashback rewards with your branded Paycer credit card.`}
        <br />
        <br />
        {t`Paycer will be able to provide fully regulated bank accounts, crypto custody, CeDeFi and branded credit cards by end of 2022. You can utilize the Paycer token (PCR) to upgrade your NFT to the next level to get more benefits. So what are you waiting for? Jump on your Paycer NFT and ride into the Metaverse!`}
      </p>
    </>
  )
}


const AboutWrapper = styled.div`
  position: relative;
`

const HorseImage = styled.img`
    width: 1150px;
    z-index: -5;
    opacity: 80%;
    position: absolute;
    top: -60px;
    right: -16vw;
`

export default function AboutSection() {
  return (
    <div>
      <AboutWrapper>

        <div className="pt-5 container">
          <TechnologyList />
        </div>
        <div className="pb-6 container">
          <div className="row">
            <div className="col-12 col-lg-6" style={{ zIndex: 1 }}>
              <AboutText />
            </div>
            {/* <div className="col-lg-6 d-none d-lg-block position-relative">
              <HorseImage
                src={`/img/nft/about-nft-3.png`}
              />
            </div> */}
            <div className="col-12 col-lg-6 position-relative" style={{ minHeight: '20rem' }}>
              <div className="position-absolute" style={{ width: '130%', height: '130%', top: '-15%', left: '-15%' }}>
                <NftModelViewer url="/assets/models/nft/horse1.glb" />
              </div>
            </div>
          </div>
        </div>
      </AboutWrapper>
    </div>

  )
}
