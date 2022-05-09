import Card from "@components/molecules/card";
import PageHeader from "@components/molecules/page-header";
import { t } from "@lingui/macro";
import Image from "next/image";

const partners = [
    '/img/nft/partner/bigbrain.png',
    '/img/nft/partner/binance.png',
    '/img/nft/partner/dodo.png',
    '/img/nft/partner/mexc.png',
    '/img/nft/partner/polkaex.png',
    '/img/nft/partner/polygon.png',
    '/img/nft/partner/uniswap.png',
]

function TechnologyList() {
    return (
        <div>
            <div className="mb-5">
                <h5 className="text-uppercase mb-3 text-pink">
                    {t`PAYCER ECOSYSTEM`}
                </h5>
                <PageHeader.Title>
                    {t`Our Partners & Infrastructure`}
                </PageHeader.Title>
            </div>
            <div className="row mb-6">
                {partners.map((partner) => (
                    <div className="col-2 mb-3 mb-md-0">
                        <Card>
                            <div className="d-flex py-4">
                                <Image src={partner} alt="Technology" objectFit="contain" objectPosition="center center"
                                       width="200" height="30"/>
                            </div>
                        </Card>
                    </div>
                ))}
            </div>
        </div>
    )
}

function AboutText() {
    return (
        <div className="col-md">
            <div className="mb-5">
                <h5 className="text-uppercase mb-3 text-pink">
                    {t`POSSIBLE FEATURES`}
                </h5>
                <PageHeader.Title>
                    {t`About Paycer NFT`}
                </PageHeader.Title>
            </div>

            <p className="mt-4 text-muted paragraph-content">
                {t`Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut
                    labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores
                    et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.
                    Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut
                    labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores
                    et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.`}
            </p>
        </div>
    )
}

function Animation() {
    return (
        <div className="col-md text-center">
            (Animation)
        </div>
    )
}

export default function AboutSection() {
    return (
        <div className="my-5 py-5 container">
            <TechnologyList/>
            <div className="row">
                <AboutText/>
                <Animation/>
            </div>
        </div>
    )
}