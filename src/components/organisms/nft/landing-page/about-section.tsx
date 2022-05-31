import React from "react";
import styled from 'styled-components'
import PageHeader from "@components/molecules/page-header"
import { t } from "@lingui/macro"

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
    name: 'Benzinga',
    url: 'https://www.benzinga.com/pressreleases/21/12/g24432433/german-fintech-startup-paycer-to-combine-defi-crypto-with-conventional-banking-services',
    imagePath: 'img/featured/bezinga.png',
  },
  {
    name: 'MarketWatch',
    url: 'http://www.marketwatch.com/story/german-fintech-startup-paycer-to-combine-defi-crypto-with-conventional-banking-services-2021-12-03',
    imagePath: 'img/featured/marketwatch.png',
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
      list-style: none;filter: grayscale(100%);
      @media (max-width: 770px) {
         display: flex;
         flex-direction: column;
         align-items: center;  
      }
    }
  }
`


function TechnologyList() {
    return (
      <div className="mt-5 mb-6">
        <FeatureListWrapper>
          <ul className="row">
            {partners.map((item, key) => (
              <a href={item.url} target="_blank" key={key} className="col-12 col-md-6 col-lg-3 mb-4 mb-lg-0">
                <li style={{height: '80px', margin: '0 45px', background: `center / 100% no-repeat url(${item.imagePath})`}} >
                </li>
              </a>
            ))}
          </ul>
        </FeatureListWrapper>
      </div>
    )
}

function AboutText() {
    return (
        <div className="col-md-6">
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
        </div>
    )
}


const AboutWrapper = styled.div`
  position: relative;
`

export default function AboutSection() {
    return (
      <div>
        <AboutWrapper>
          <img
            src={`/img/nft/shape_.png`}
            style={{
              position: 'absolute',
              left: 0,
              right: 0,
              top: 0,
              bottom: 0,
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              zIndex: -5,
              opacity: '50%',
            }}
          />
          <div className="pt-5 container">
            <TechnologyList/>
          </div>
          <div className="pb-6 container">
            <div className="row">
              <AboutText/>
            </div>
          </div>
        </AboutWrapper>
      </div>

    )
}
