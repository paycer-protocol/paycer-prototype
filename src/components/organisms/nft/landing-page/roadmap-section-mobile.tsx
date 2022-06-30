import Image from 'next/image';
import PageHeader from '@components/molecules/page-header';
import { t, Trans } from '@lingui/macro';
import styled, { css } from 'styled-components';
import { Plus } from '@styled-icons/feather';
import Icon from '@components/atoms/icon';

const StageCircleBackground = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #16212E;
  border: 1px solid #1B2E44;
  border-radius: 99999999px;
  width: 5rem;
  height: 5rem;
  z-index: 1;
  box-shadow: 0 0.1rem 2.0rem -0.5rem #2A0073;
`;

function StageCircle({ label, progress }: { label: string, progress: string }) {
  return (
    <StageCircleBackground>
      <span className="small-text text-muted fw-bold mb-2">{label}</span>
      <span className="display-5">{progress}</span>
    </StageCircleBackground>
  );
}

const RoadmapCardBackground = styled.div`
  background-color: #16212E;
  border: 1px solid #1B2E44;
  padding: 1.8rem;
  border-radius: 5px;
  z-index: 2;
  box-shadow: 0 0.1rem 2.0rem -0.5rem #2A0073;
`;

const RoadmapCardWrapper = styled.div<any>`
   margin-bottom: 20px;
   position: relative;
   ${(props) => props.isActive && css`
    background: linear-gradient(284deg,rgba(255,0,184,1),rgba(0,209,255,1));
    padding: 1px;
    border-radius: 5px;
  `}
   ${(props) => props.indicator === 'right' && css`
     &:before {
        content: "";
        height: 15px;
        width: 15px;
        background: white;
        left: -23%;
        top: 46%;
        position: absolute;
        border-radius: 50%;
     }
  `}
   ${(props) => props.indicator === 'left' && css`
     &:before {
        content: "";
        height: 15px;
        width: 15px;
        background: white;
        left: -30%;
        top: 46%;
        position: absolute;
        border-radius: 50%;
     }
  `}
`;

function RoadmapCard({ title, entries, isActive, indicator }: { title: string, entries: string[], isActive?: boolean, indicator?: 'left' | 'right' }) {
  return (
    <RoadmapCardWrapper isActive={isActive} indicator={indicator}>
      <RoadmapCardBackground>
        <h3>{title}</h3>
        {entries.map((entry, key) => (
          <div key={key} className="d-flex mt-2 align-items-center">
            <span className="me-2" style={{ color: '#E224A2' }}><Icon size={16} component={Plus} /></span>
            <span className="text-muted small-text">{entry}</span>
          </div>
        ))}
      </RoadmapCardBackground>
    </RoadmapCardWrapper>
  );
}

export default function RoadmapSectionMobile() {
  return (
    <div style={{ marginBottom: '10rem' }}>
      <div className="container my-5">
        <h5 className="text-uppercase mb-2 text-pink fw-bold">
          {t`NFT ROADMAP`}
        </h5>
        <div className="h1 mb-6">
          {t`What is coming up next?`}
        </div>
        <div>
          <div className="row position-relative">

            <div className="col-3 position-relative ps-5">
              <div style={{ position: 'absolute', top: '2%', left: '45px', transform: 'translate(-50%, -50%)' }}>
                <StageCircle label={t`Stage 1`} progress={t`Q2`} />
              </div>
              <div style={{ position: 'absolute', top: '60%', left: '45px', transform: 'translate(-50%, -50%)' }}>
                <StageCircle label={t`Stage 2`} progress={t`Q3`} />
              </div>
              <div style={{ position: 'absolute', top: '100%', left: '45px', transform: 'translate(-50%, -50%)' }}>
                <StageCircle label={t`Stage 3`} progress={t`Q4/Q1`} />
              </div>
              <img src="/img/nft/timeline-mobile.svg" className="h-100" />
            </div>

            <div className="col-9">
              <RoadmapCard
                isActive
                title={t`Takeoff`}
                indicator="right"
                entries={[
                  t`Launch Landingpage`,
                  t`Launch Whitepaper`,
                  t`Marketing & Grow Community`,
                  t`Whitelisting Events`,
                ]}
              />
              <RoadmapCard
                title={t`Getting Ready For The Ride`}
                indicator="left"
                entries={[
                  t`Launch of Sale Page`,
                  t`Launch of Reveal Page`,
                  t`Launch of NFT Detail Page`,
                ]}
              />
              <RoadmapCard
                title={t`NFT Sale`}
                indicator="right"
                entries={[
                  t`Presale Event`,
                  t`Public Sale Event`,
                  t`NFT Reveal Event`,
                ]}
              />
              <RoadmapCard
                indicator="left"
                title={t`Upgrade Your NFT`}
                entries={[
                  t`Launch of NFT Upgrade Function`,
                  t`Stake PCR on Paycer Finance to:`,
                  t`Receive new awesome NFT Utilities`,
                  t`Receive unique visual Upgrades`,
                ]}
              />
              <RoadmapCard
                indicator="right"
                title={t`Growing The NFT Fam`}
                entries={[
                  t`Launch Breeding Feature`,
                  t`Use PCR to breed the new Generation`,
                  t`Launch of NFT Marketplace`,
                ]}
              />
              <RoadmapCard
                indicator="left"
                title={t`Ready for Metaverse`}
                entries={[
                  t`Early NFT Metaverse demo`,
                  t`Develop Metaverse Partnerships`,
                  t`Start to integrate the NFT`,
                ]}
              />
              <RoadmapCard
                indicator="right"
                title={t`NFT Credit Cards`}
                entries={[
                  t`Launch Paycer NFT Credit Cards`,
                  t`Get your unique NFT Credit Card!`,
                  t`Ship the NFT Credit Cards`,
                ]}
              />
              <RoadmapCard
                indicator="left"
                title={t`Cashback & Metaverse`}
                entries={[
                  t`Special Items & Cashback Partnerships`,
                  t`Launch NFT Credit Card Cashback Features`,
                  t`Gamification and level your NFT`,
                  t`Use NFT Credit Card in Metaverse`,
                ]}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
