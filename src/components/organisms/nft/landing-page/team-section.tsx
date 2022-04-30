import PageHeader from "@components/molecules/page-header";
import { Trans } from "@lingui/macro";
import Image from "next/image";
import styled from "styled-components";

const TeamMemberCircle = styled.div`
  position: relative;
  background: linear-gradient(to right, #FF00B8, #00D1FF);
  width: 12rem;
  height: 12rem;
  padding: 2px;
  border-radius: 99999999px;
`

const TeamMemberCircleContent = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
  border-radius: 99999999px;
`

function TeamMember({ name, jobTitle }: { name: string, jobTitle: string }) {
  return (
    <div className="d-flex flex-column align-items-center" style={{ width: '15rem', height: '20rem' }}>
      <TeamMemberCircle>
        <TeamMemberCircleContent>
          <Image src="/img/avatars/profiles/avatar-2.jpg" layout="fill" />
        </TeamMemberCircleContent>
      </TeamMemberCircle>
      <div className="text-center">
        <h2 className="mt-4 mb-2"><b>{name}</b></h2>
        <span className="opacity-50">{jobTitle}</span>
      </div>
    </div>
  )
}

export default function TeamSection() {
  return (
    <div className="container">
      <PageHeader.Subtitle><Trans>PAYCER TEAM</Trans></PageHeader.Subtitle>
      <PageHeader.Title><Trans>Professionals working on Paycer NFT</Trans></PageHeader.Title>

      <div className="mt-5 d-flex flex-wrap justify-content-center">
        <TeamMember name="Richard Vo" jobTitle="Founder & Managing Director" />
        <TeamMember name="Richard Vo" jobTitle="Founder & Managing Director" />
        <TeamMember name="Richard Vo" jobTitle="Founder & Managing Director" />
        <TeamMember name="Richard Vo" jobTitle="Founder & Managing Director" />
        <TeamMember name="Richard Vo" jobTitle="Founder & Managing Director" />
        <TeamMember name="Richard Vo" jobTitle="Founder & Managing Director" />
      </div>
    </div>
  )
}