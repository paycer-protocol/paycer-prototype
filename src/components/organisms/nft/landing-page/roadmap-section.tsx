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
  width: 6rem;
  height: 6rem;
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

        <div className="w-100 my-5 py-5" style={{ height: '80rem' }}>
          <div className="position-relative h-100 my-5">
            <Image src="/img/nft/timeline.svg" layout="fill" objectFit="contain" objectPosition="top center" />
            <StageCircle label="Stage 1" progress="30%" />
            <RoadmapCard
              title="Vision and Value"
              entries={[
                'Launch Landingpage',
                'Launch Whitepaper',
              ]}
            />
          </div>
        </div>
      </div>
    </div>
  )
}