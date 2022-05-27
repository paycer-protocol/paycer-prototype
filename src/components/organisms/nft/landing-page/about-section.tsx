import Card from "@components/molecules/card";
import PageHeader from "@components/molecules/page-header";
import { t } from "@lingui/macro";
import Image from "next/image";
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import React from "react";

const partners = [
    '/img/nft/partner/bigbrain.png',
    '/img/nft/partner/bloktopia.png',
    '/img/nft/partner/dodo.png',
    '/img/nft/partner/mexc.png',
    '/img/nft/partner/polkaex.png',
    '/img/nft/partner/polygon.png'
]

function TechnologyList() {
    return (
        <div>
            <div className="d-none d-md-block mb-6">
                <div className="row">
                    {partners.map((partner, key) => (
                        <div key={key} className="col-4 col-md-2 mb-3 mb-md-0">
                            <Card className="mb-3 mb-md-0">
                                <div className="d-flex py-4">
                                    <Image src={partner} alt="Technology" objectFit="contain" objectPosition="center center"
                                           width="200" height="30"/>
                                </div>
                            </Card>
                        </div>
                    ))}
                </div>

            </div>

            <div className="d-md-none mb-6">
                <Swiper
                    spaceBetween={20}
                    slidesPerView={2}
                    initialSlide={3}
                    centeredSlides
                >
                    {partners.map((partner, key) => (
                        <SwiperSlide key={key} className="align-items-center">
                            <Card className="mb-3 mb-md-0">
                                <div className="d-flex py-4">
                                    <Image src={partner} alt="Technology" objectFit="contain" objectPosition="center center"
                                           width="200" height="30"/>
                                </div>
                            </Card>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>

        </div>
    )
}

function AboutText() {
    return (
        <div className="col-md-6">
            <div className="mb-5">
                <h5 className="text-uppercase mb-3 text-pink">
                    {t`NEXT LEVEL NFT`}
                </h5>
                <PageHeader.Title>
                    {t`About Paycer NFT`}
                </PageHeader.Title>
            </div>

            <p className="mt-4 text-muted paragraph-content">
                {t`Paycer's mission is to make web3 accesible for retail clients. Paycer will be able to provide fully regulated bank accounts, crypto, CeDeFi and credit cards by end of 2022. The Paycer team is putting a lot of effort into the NFT development to provide the best possible product. With the Paycer NFT you get your unique 3D model that is ready for the Metaverse. The Paycer NFT will also provide utilities on our DeFi and CeDeFi platform. In addition the NFT will be linked to your Paycer credit card to provide cash back rewards and more.`}
            </p>
        </div>
    )
}

function Animation() {
    return (
        <div className="col-md-6 text-center">
            <img src="/img/nft/nft-about-image.png" className="w-100"  />
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