import {t} from "@lingui/macro";
import Image from "next/image";
import styled from "styled-components";

const TeamMemberCircle = styled.div`
  position: relative;
  width: 10.5rem;
  height: 10.5rem;
  padding: 2px;
  border-radius: 50%;
  border: 2px solid rgb(226, 36, 162);
`

const TeamMemberCircleContent = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
  border-radius: 99999999px;
`

function TeamMember({ name, jobTitle, imgSrc }: { name: string, jobTitle: string, imgSrc: string }) {
  return (
    <div className="d-flex flex-column align-items-center">
      <TeamMemberCircle className="mb-3">
        <TeamMemberCircleContent>
          <Image src={imgSrc} layout="fill" />
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
    <div className="container">
        <div className="mb-6">
            <div className="mb-5">
                <h5 className="text-uppercase mb-2 text-pink fw-bold">
                    {t`PAYCER TEAM`}
                </h5>
                <div className="h1 mb-4 mb-5">
                    {t`Professionals working on Paycer NFT`}
                </div>
            </div>

            <div className="row">
                <div className="col-md-3 mb-4 mb-5">
                    <TeamMember imgSrc="/img/nft/team/richard.jpg" name={t`Richard Vo`} jobTitle={t`Founder & Managing Director`} />
                </div>
                <div className="col-md-3 mb-4 mb-5">
                    <TeamMember imgSrc="/img/nft/team/nils.jpg" name={t`Nils Gregersen`} jobTitle={t`Founder & Managing Director`} />
                </div>
                <div className="col-md-3 mb-4 mb-5">
                    <TeamMember imgSrc="/img/nft/team/helge.jpg" name={t`Helge Ippensen`} jobTitle={t`Co-Founder & CRO`} />
                </div>
                <div className="col-md-3 mb-4 mb-5">
                    <TeamMember imgSrc="/img/nft/team/lukas.jpg" name={t`Lukas Gurschler`} jobTitle={t`Co-Founder & Fullstack DApp Developer`} />
                </div>
                <div className="col-md-3 mb-4 mb-5">
                    <TeamMember imgSrc="/img/nft/team/metin.jpg" name={t`Metin Demirdere`} jobTitle={t`PR & Head of HR`} />
                </div>
                <div className="col-md-3 mb-4 mb-5">
                    <TeamMember imgSrc="/img/nft/team/christoff.png" name={t`Christoff Berlage`} jobTitle={t`Head of Marketing`} />
                </div>
                <div className="col-md-3 mb-4 mb-5">
                    <TeamMember imgSrc="/img/nft/team/mahsa.png" name={t`Mahsa Doorfard`} jobTitle={t`Researcher & Marketing Manager`} />
                </div>
                <div className="col-md-3 mb-4 mb-5">
                    <TeamMember imgSrc="/img/nft/team/kerim.jpg" name={t`Kerim Yurttas`} jobTitle={t`Head of UI / UX`} />
                </div>
                <div className="col-md-3 mb-4 mb-5">
                    <TeamMember imgSrc="/img/nft/team/daniel.png" name={t`Daniel`} jobTitle={t`DeFi Architect & NFT Developer`} />
                </div>
                <div className="col-md-3 mb-4 mb-5">
                    <TeamMember imgSrc="/img/nft/team/julien.png" name={t`Julien Scholz`} jobTitle={t`3D Backend & Fullstack Developer`} />
                </div>
            </div>
        </div>
        <div className="mb-5">
            <h5 className="text-uppercase mb-2 text-pink fw-bold">
                {t`ADVISORS`}
            </h5>
            <div className="h1 mb-4 mb-5">
                {t`Advisors helping on Paycer NFT`}
            </div>
        </div>
        <div className="row">
            <div className="col-md-3 mb-4 mb-5">
                <TeamMember imgSrc="/img/nft/team/hermann.png" name={t`Hermann Neunaber`} jobTitle={t`Banking Advisor | former Bank Director and Board Member`} />
            </div>
            <div className="col-md-3 mb-4 mb-5">
                <TeamMember imgSrc="/img/nft/team/dias.png" name={t`Dias Lonappan`} jobTitle={t`Smart Contract & DeFi Advisor | CTO at CACHE GOLD`} />
            </div>
        </div>
    </div>
  )
}
