import Image from 'next/image'
import PageHeader from '@components/molecules/page-header'
import { t, Trans } from '@lingui/macro'
import styled, { css } from 'styled-components'
import { Plus } from '@styled-icons/feather'
import Icon from '@components/atoms/icon'

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

const RoadmapCardWrapper = styled.div<any>`
   ${(props) => props.isActive && css`
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
    <div>
      <div className="container">
        <h5 className="text-uppercase mb-2 text-pink fw-bold">
          {t`PAYCER NFT ROADMAP`}
        </h5>
        <div className="h1 mb-4">
          {t`Awesome Milestones to be exited about!`}
        </div>
        <div className="d-flex align-items-center justify-content-center w-100 my-5 py-5" style={{ height: '80rem' }}>
          <div className="position-relative">
            <Image src="/img/nft/timeline.svg" width="254px" height="977px" />
            <div style={{ position: 'absolute', top: '-15px', left: '25px', transform: 'translate(-50%, -50%)' }}>
              <StageCircle label={t`Stage 1`} progress={t`Q2/22`} />
            </div>
            <div style={{ position: 'absolute', top: '260px', left: '235px', transform: 'translate(-50%, -50%)' }}>
              <StageCircle label={t`Stage 2`} progress={t`Q3/Q4`} />
            </div>
            <div style={{ position: 'absolute', top: '980px', left: '232px', transform: 'translate(-50%, -50%)' }}>
              <StageCircle label={t`Stage 3`} progress={t`Q4/Q1+`} />
            </div>
            <div style={{ position: 'absolute', top: '-15px', left: '280px', transform: 'translate(-50%, -50%)' }}>
              <RoadmapCard
                isActive
                title={t`Takeoff`}
                entries={[
                  t`Launch Landingpage`,
                  t`Launch Whitepaper`,
                  t`Marketing & Grow Community`,
                  t`Whitelisting Events`,
                ]}
              />
            </div>
            <div style={{ position: 'absolute', top: '200px', left: '-180px', transform: 'translate(-50%, -50%)' }}>
              <RoadmapCard
                title={t`Getting Ready For The Ride`}
                entries={[
                  t`Launch of Sale Page`,
                  t`Launch of Reveal Page`,
                  t`Launch of NFT Detail Page`,
                ]}
              />
            </div>
            <div style={{ position: 'absolute', top: '230px', left: '500px', transform: 'translate(-50%, -50%)' }}>
              <RoadmapCard
                title={t`NFT Sale`}
                entries={[
                  t`Presale Event`,
                  t`Public Sale Event`,
                  t`NFT Reveal Event`,
                ]}
              />
            </div>
            <div style={{ position: 'absolute', top: '520px', left: '470px', transform: 'translate(-50%, -50%)' }}>
              <RoadmapCard
                title={t`Growing The NFT Fam`}
                entries={[
                  t`Launch Breeding Feature`,
                  t`Use PCR to breed the new Generation`,
                  t`Launch of NFT Marketplace`,
                ]}
              />
            </div>
            <div style={{ position: 'absolute', top: '460px', left: '-150px', transform: 'translate(-50%, -50%)' }}>
              <RoadmapCard
                title={t`Upgrade Your NFT`}
                entries={[
                  t`Launch of NFT Upgrade Function`,
                  t`Stake PCR on Paycer Finance to:`,
                  t`Receive new awesome NFT Utilities`,
                  t`Receive unique visual Upgrades`,
                ]}
              />
            </div>
            <div style={{ position: 'absolute', top: '830px', left: '-130px', transform: 'translate(-50%, -50%)' }}>
              <RoadmapCard
                title={t`NFT Credit Cards`}
                entries={[
                  t`Launch Paycer NFT Credit Cards`,
                  t`Get your unique NFT Credit Card!`,
                  t`Ship the NFT Credit Cards`,
                ]}
              />
            </div>
            <div style={{ position: 'absolute', top: '750px', left: '470px', transform: 'translate(-50%, -50%)' }}>
              <RoadmapCard
                title={t`Ready for Metaverse`}
                entries={[
                  t`Early NFT Metaverse demo`,
                  t`Develop Metaverse Partnerships`,
                  t`Start to integrate the NFT`,
                ]}
              />
            </div>
            <div style={{ position: 'absolute', bottom: '-400px', left: '250px', transform: 'translate(-50%, -50%)' }}>
              <RoadmapCard
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
  )
}
