import PageHeader from "@components/molecules/page-header";
import {t, Trans} from "@lingui/macro";
import Image from "next/image";
import styled from "styled-components";

const TeamMemberCircle = styled.div`
  position: relative;
  background: linear-gradient(to right, #FF00B8, #00D1FF);
  width: 10.5rem;
  height: 10.5rem;
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
    <div className="mx-auto d-flex flex-column align-items-center" style={{ width: '13rem', height: '20rem' }}>
      <TeamMemberCircle className="mb-3">
        <TeamMemberCircleContent>
          <Image src="/img/avatars/profiles/avatar-2.jpg" layout="fill" />
        </TeamMemberCircleContent>
      </TeamMemberCircle>
      <div className="text-center p-2">
        <h2 className="mt-3 mb-2 fw-normal">{name}</h2>
        <span className="opacity-50">{jobTitle}</span>
      </div>
    </div>
  )
}

export default function TeamSection() {
  return (
    <div className="my-5 py-5 container">
        <div className="mb-6">
            <h5 className="text-uppercase mb-2 text-pink fw-bold">
                {t`PAYCER TEAM`}
            </h5>
            <div className="h1 mb-4">
                {t`Professionals working on Paycer NFT`}
            </div>
            <div className="my-5 pt-5 d-flex flex-wrap justify-content-between">
                <TeamMember name="Richard Vo" jobTitle="Founder & Managing Director" />
                <TeamMember name="Richard Vo" jobTitle="Founder & Managing Director" />
                <TeamMember name="Richard Vo" jobTitle="Founder & Managing Director" />
                <TeamMember name="Richard Vo" jobTitle="Founder & Managing Director" />
                <TeamMember name="Richard Vo" jobTitle="Founder & Managing Director" />
                <TeamMember name="Richard Vo" jobTitle="Founder & Managing Director" />
                <TeamMember name="Richard Vo" jobTitle="Founder & Managing Director" />
                <TeamMember name="Richard Vo" jobTitle="Founder & Managing Director" />
                <TeamMember name="Richard Vo" jobTitle="Founder & Managing Director" />
                <TeamMember name="Richard Vo" jobTitle="Founder & Managing Director" />
            </div>
        </div>

        <h5 className="text-uppercase mb-2 text-pink fw-bold">
            {t`ADVISORS`}
        </h5>
        <div className="h1 mb-4">
            {t`Advisors helping on Paycer NFT`}
        </div>
      <div className="mt-5 pt-5 d-flex flex-wrap justify-content-between">
        <TeamMember name="Richard Vo" jobTitle="Founder & Managing Director" />
        <TeamMember name="Richard Vo" jobTitle="Founder & Managing Director" />
        <TeamMember name="Richard Vo" jobTitle="Founder & Managing Director" />
        <TeamMember name="Richard Vo" jobTitle="Founder & Managing Director" />
        <TeamMember name="Richard Vo" jobTitle="Founder & Managing Director" />
      </div>
    </div>
  )
}