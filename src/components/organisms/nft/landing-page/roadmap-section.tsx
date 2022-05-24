import Image from 'next/image';
import PageHeader from "@components/molecules/page-header";
import { t, Trans } from "@lingui/macro";
import styled, { css } from "styled-components";
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
  width: 7rem;
  height: 7rem;
  z-index: 1;
  box-shadow: 0 0.1rem 2.0rem -0.5rem #2A0073;
`

function StageCircle({ label, progress }: { label: string, progress: string }) {
  return (
    <StageCircleBackground>
      <span className="small-text text-muted fw-bold mb-2">{label}</span>
      <span className="display-4">{progress}</span>
    </StageCircleBackground>
  )
}

const RoadmapCardBackground = styled.div`
  background-color: #16212E;
  border: 1px solid #1B2E44;
  width: 20rem;
  padding: 1.8rem;
  border-radius: 5px;
  z-index: 2;
  box-shadow: 0 0.1rem 2.0rem -0.5rem #2A0073;
`

const RoadmapCardWrapper= styled.div<any>`
   ${props => props.isActive && css`
    background: linear-gradient(284deg,rgba(255,0,184,1),rgba(0,209,255,1));
    padding: 1px;
    border-radius: 5px;
  `}
`

function RoadmapCard({ title, entries, isActive }: { title: string, entries: string[], isActive?: boolean }) {
  return (
      <RoadmapCardWrapper isActive={isActive}>
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
  )
}

export default function RoadmapSection() {
  return (
    <div className="mt-5 py-5" style={{ marginBottom: '10rem' }}>
      <div className="container my-5">
        <h5 className="text-uppercase mb-2 text-pink fw-bold">
            {t`NFT ROADMAP`}
        </h5>
        <div className="h1 mb-4">
            {t`What is coming up next?`}
        </div>
        <div className="d-flex align-items-center justify-content-center w-100 my-5 py-5" style={{ height: '80rem' }}>
          <div className="position-relative">
            <Image src="/img/nft/timeline.svg" width="254px" height="977px" />
            <div style={{ position: 'absolute', top: '-15px', left: '25px', transform: 'translate(-50%, -50%)' }}>
              <StageCircle label={t`Stage 1`} progress={t`30%`} />
            </div>
            <div style={{ position: 'absolute', top: '260px', left: '235px', transform: 'translate(-50%, -50%)' }}>
              <StageCircle label={t`Stage 2`} progress={t`60%`} />
            </div>
            <div style={{ position: 'absolute', top: '980px', left: '232px', transform: 'translate(-50%, -50%)' }}>
              <StageCircle label={t`Stage 3`} progress={t`100%`} />
            </div>
            <div style={{ position: 'absolute', top: '-15px', left: '280px', transform: 'translate(-50%, -50%)' }}>
              <RoadmapCard
                isActive
                title={t`Vision & Value`}
                entries={[
                  t`Launch Landingpage`,
                  t`Launch Whitepaper`,
                  t`Launch Marketing`,
                ]}
              />
            </div>
            <div style={{ position: 'absolute', top: '200px', left: '-180px', transform: 'translate(-50%, -50%)' }}>
              <RoadmapCard
                title={t`Launching NFT Collections`}
                entries={[
                  t`Presale`,
                  t`Public Sale`,
                  t`Reveal Date`,
                  t`Upgrade Event`,
                ]}
              />
            </div>
            <div style={{ position: 'absolute', top: '230px', left: '500px', transform: 'translate(-50%, -50%)' }}>
              <RoadmapCard
                title={t`Ready for Metaverse`}
                entries={[
                  t`3D NFT`,
                  t`Metaverse Partnerships`,
                ]}
              />
            </div>
              <div style={{ position: 'absolute', top: '520px', left: '470px', transform: 'translate(-50%, -50%)' }}>
                  <RoadmapCard
                      title={t`Expand NFT Partnerships`}
                      entries={[
                          t`Partnership quests`,
                          t`Breeding (Breed NFTs using PCR tokens)`,
                      ]}
                  />
              </div>
            <div style={{ position: 'absolute', top: '460px', left: '-150px', transform: 'translate(-50%, -50%)' }}>
              <RoadmapCard
                title={t`Upgrade Event`}
                entries={[
                  t`Level Up NFT function`,
                  t`Stacking rewards on Paycer`,
                ]}
              />
            </div>
              <div style={{ position: 'absolute', top: '830px', left: '-130px', transform: 'translate(-50%, -50%)' }}>
                  <RoadmapCard
                      title={t`Credit Cards (Metaverse & real world)`}
                      entries={[
                          t`Launch NFT Credit Cards`,
                          t`Send NFT Credit Cards`,
                      ]}
                  />
              </div>
            <div style={{ position: 'absolute', top: '750px', left: '470px', transform: 'translate(-50%, -50%)' }}>
              <RoadmapCard
                title={t`Cashback in PCR Tokens`}
                entries={[
                  t`Cashback Partnerships`,
                ]}
              />
            </div>
            <div style={{ position: 'absolute', bottom: '-400px', left: '250px', transform: 'translate(-50%, -50%)' }}>
              <RoadmapCard
                title={t`Marketing Events & Community Boost`}
                entries={[
                  t`Special Items & Marketing Partnerships`,
                  t`Exclusive airdrops & Voting System`,
                  t`Use NFT Credit Card in Metaverse`,
                ]}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}