import Card from "@components/molecules/card";
import PageHeader from "@components/molecules/page-header";
import { Trans } from "@lingui/macro";
import Image from "next/image";

const technologies = [
  '/img/nft/technologies/polygon.png',
  '/img/nft/technologies/polygon.png',
  '/img/nft/technologies/polygon.png',
  '/img/nft/technologies/polygon.png',
  '/img/nft/technologies/polygon.png',
  '/img/nft/technologies/polygon.png',
]

function TechnologyList() {
  return (
    <div className="m-5 d-flex justify-content-center overflow-hidden">
      {technologies.map((technology) => (
        <Card className="mx-3">
          <div className="d-flex p-3">
            <Image src={technology} alt="Technology" objectFit="contain" objectPosition="center center" width="250" height="80" />
          </div>
        </Card>
      ))}
    </div>
  )
}

function AboutText() {
  return (
    <div className="col-md">
      <PageHeader.Subtitle>POSSIBLE FEATURES</PageHeader.Subtitle>
      <PageHeader.Title>About Paycer NFT</PageHeader.Title>
      <p className="mt-4">
        <Trans>
          Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.
        </Trans>
      </p>
    </div>
  );
}

function Animation() {
  return (
    <div className="col-md">
      (Animation)
    </div>
  );
}

export default function AboutSection() {
  return (
    <div className="container">
      <TechnologyList />
      <div className="row">
        <AboutText />
        <Animation />
      </div>
    </div>
  );
}