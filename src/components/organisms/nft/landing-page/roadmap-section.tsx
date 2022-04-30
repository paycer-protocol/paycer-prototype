import Image from 'next/image';
import PageHeader from "@components/molecules/page-header";
import { Trans } from "@lingui/macro";
import styled from "styled-components";
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
`

function StageCircle({ label, progress }: { label: string, progress: string }) {
  return (
    <StageCircleBackground>
      <span>{label}</span>
      <span className="display-4">{progress}</span>
    </StageCircleBackground>
  )
}

const RoadmapCardBackground = styled.div`
  background-color: #16212E;
  border: 1px solid #1B2E44;
  width: 20rem;
  padding: 2rem;
  border-radius: 5px;
  z-index: 2;
`

function RoadmapCard({ title, entries }: { title: string, entries: string[] }) {
  return (
    <RoadmapCardBackground>
      <h2><b>{title}</b></h2>
      {entries.map((entry) => (
        <div className="d-flex mt-2">
          <span className="me-2" style={{ color: '#E224A2' }}><Icon size={16} component={Plus} /></span>
          {entry}
        </div>
      ))}
    </RoadmapCardBackground>
  )
}

export default function RoadmapSection() {
  return (
    <div className="my-5 py-5">
      <div className="container my-5">
        <PageHeader.Subtitle><Trans>NFT ROADMAP</Trans></PageHeader.Subtitle>
        <PageHeader.Title><Trans>What is coming up next?</Trans></PageHeader.Title>

        <div className="d-flex align-items-center justify-content-center w-100 my-5 py-5" style={{ height: '80rem' }}>
          <div className="position-relative">
            <Image src="/img/nft/timeline.svg" width="254px" height="977px" />
            <div style={{ position: 'absolute', top: '-15px', left: '25px', transform: 'translate(-50%, -50%)' }}>
              <StageCircle label="Stage 1" progress="30%" />
            </div>
            <div style={{ position: 'absolute', top: '260px', left: '235px', transform: 'translate(-50%, -50%)' }}>
              <StageCircle label="Stage 2" progress="60%" />
            </div>
            <div style={{ position: 'absolute', top: '730px', left: '120px', transform: 'translate(-50%, -50%)' }}>
              <StageCircle label="Stage 3" progress="100%" />
            </div>

            <div style={{ position: 'absolute', top: '-15px', left: '280px', transform: 'translate(-50%, -50%)' }}>
              <RoadmapCard
                title="Vision and Value"
                entries={[
                  'Launch Landingpage',
                  'Launch Whitepaper',
                ]}
              />
            </div>
            <div style={{ position: 'absolute', top: '200px', left: '-180px', transform: 'translate(-50%, -50%)' }}>
              <RoadmapCard
                title="Launching NFT Collections"
                entries={[
                  'Presale',
                  'Public Sale',
                  'Reveal Date',
                  'Upgrade Event',
                ]}
              />
            </div>
            <div style={{ position: 'absolute', top: '230px', left: '500px', transform: 'translate(-50%, -50%)' }}>
              <RoadmapCard
                title="Ready for Metaverse"
                entries={[
                  '3D NFT',
                  'Metaverse Partnerships',
                ]}
              />
            </div>
            <div style={{ position: 'absolute', top: '460px', left: '-150px', transform: 'translate(-50%, -50%)' }}>
              <RoadmapCard
                title="Upgrade Event"
                entries={[
                  'Level Up NFT function',
                  'Stacking rewards on Paycer',
                ]}
              />
            </div>
            <div style={{ position: 'absolute', top: '520px', left: '470px', transform: 'translate(-50%, -50%)' }}>
              <RoadmapCard
                title="Expand NFT Partnerships"
                entries={[
                  'Partnership quests',
                  'Breeding (Breed NFTs using PCR tokens)',
                ]}
              />
            </div>
            <div style={{ position: 'absolute', top: '750px', left: '470px', transform: 'translate(-50%, -50%)' }}>
              <RoadmapCard
                title="Cashback in PCR Tokens"
                entries={[
                  'Cashback Partnerships',
                ]}
              />
            </div>
            <div style={{ position: 'absolute', top: '830px', left: '-130px', transform: 'translate(-50%, -50%)' }}>
              <RoadmapCard
                title="Credit Cards (Metaverse & Real)"
                entries={[
                  'Launch NFT Credit Cards',
                  'Send NFT Credit Cards',
                ]}
              />
            </div>
            <div style={{ position: 'absolute', bottom: '-400px', left: '250px', transform: 'translate(-50%, -50%)' }}>
              <RoadmapCard
                title="Marketing Events & Community Boost"
                entries={[
                  'Special Items & Marketing Partnerships',
                  'Exclusive airdrops & Voting Systems',
                  'Use NFT Credit Card in Metaverse',
                ]}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}