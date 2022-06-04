import React, { Suspense } from "react";
import styled from 'styled-components'
import PageHeader from "@components/molecules/page-header"
import { t } from "@lingui/macro"
import { Canvas } from "react-three-fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";

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

function Model(props) {
    const { scene } = useGLTF("/glb/paycer_small8.glb")
    return <primitive object={scene} />
}

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

function AnimatedHorse() {
    return (
        <Canvas camera={{ position: [900, 100, 100], zoom: 30, scale: 100}}>
            <ambientLight intensity={0.6} />
            <pointLight intensity={1} position={[-500, 0, 0]} color="purple" />
            <pointLight intensity={1} position={[5, 5, 1000]} color="white" />
            <pointLight intensity={1} position={[0, -4, 700]} color="white" />
            <pointLight intensity={2} position={[0, -4, -700]} color="white" />
            <pointLight intensity={1} position={[-500, -10, 0]} color="purple" />
            <pointLight intensity={2} position={[-40, 500, 0]} color="purple" />
            <spotLight intensity={2} position={[340, -350, 5]} penumbra={1} color="purple" />
            <spotLight intensity={1.5} position={[240, -300, 5]} penumbra={1} color="white" />
            <spotLight intensity={2} position={[400, -400, 5]} penumbra={1} color="white" />
            <spotLight intensity={1.5} position={[-400, -400, 30]} penumbra={1} color="white" />
            <Suspense fallback={null}>
                <Model />
            </Suspense>
            <OrbitControls />
        </Canvas>
    );
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
            <TechnologyList/>
          </div>
          <div className="pb-6 container">
            <div className="row">
                <div className="col-12 col-lg-6">
                    <AboutText/>
                </div>
                <div className="col-lg-6 d-none d-lg-block position-relative">
                    <AnimatedHorse />
                </div>
            </div>
          </div>
        </AboutWrapper>
      </div>

    )
}
