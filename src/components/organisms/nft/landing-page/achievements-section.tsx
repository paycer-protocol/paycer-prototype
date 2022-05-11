import Card from "@components/molecules/card"
import PageHeader from "@components/molecules/page-header"
import { t } from "@lingui/macro"
import { ArrowRightCircle } from "@styled-icons/bootstrap"
import Icon from "@components/atoms/icon"
import React from "react"
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'

const achievements = [
    {
        title: 'Company in GER registered',
        text: 'Paycer is a fully regulated and registered company. With its headquarters in Hamburg, Germany, we are in the best position to ensure our European leadership as CeDeFi champion.'
    },
    {
        title: 'Token launched (Utility token)',
        text: 'Our PCR (ERC-20 Polygon) token has been launched successfully and is trading on DEX/CEX. The use cases include loyalty programs, voting rights, staking rewards and platform incentives.'
    },
    {
        title: 'Staking on paycer.finance',
        text: 'By holding PCR tokens in your wallet, you can earn staking rewards. With different loyalty tiers you can earn up to 24% staking rewards and more benefits for deposit and loan rates.'
    },
    {
        title: 'DeFi App launched',
        text: 'Paycers application has successfully launched on paycer.finance. This prototype includes fully functional features like Staking, Vesting, Investments, Swap and PCR Analytics.'
    },
    {
        title: 'Awesome partnerships',
        text: 'Paycer has partnered with other exciting projects that are leading in their area of expertise. We have partnered with Bloktopia’s metaverse and will announce a banking partnership as part of our roadmap'
    },
    {
        title: 'Big and loyal community',
        text: 'Ever since launching our token PCR on various launchpads and with institutional & private investors we have enjoyed a big growth of our community. Get involved in Telegram, Twitter and Discord.'
    },
    /*
    {
        title: 'Building a strong team and company',
        text: 'We have assembled an amazing team of experts. Together we are building on the foundation for future growth. This includes marketing, legal, blockchain, business and management expertise'
    },
    {
        title: 'New Office in VR & AR Hub',
        text: 'Lorem Ypsum ... TBD'
    }
     */
]

export default function AchievementsSection() {
    return (
        <div className="mt-6 mb-0 py-5 ps-md-4 pe-md-4 ps-4">
            <div className="mb-5">
                <h5 className="text-uppercase mb-3 text-pink">
                    {t`WHAT WE ALREADY DID`}
                </h5>
                <PageHeader.Title>
                    {t`Our achievements`}
                </PageHeader.Title>
            </div>

            <div className="d-none d-md-block">
                <div className="row mb-6">
                    {achievements.map((achievement) => (
                        <div className="col-3 mb-4">
                            <Card className="h-100">
                                <div className="card-body h-100">
                                    <div className="d-flex mb-4 align-items-center">
                                        <div>
                                            <Icon color="#E224A2" component={ArrowRightCircle} size={48} />
                                        </div>
                                        <div className="h3 ms-3 mb-0">{achievement.title}</div>
                                    </div>
                                    <span className="text-muted">
                                     {achievement.text}
                                </span>
                                </div>

                            </Card>
                        </div>
                    ))}
                </div>
            </div>

            <div className="d-md-none">
                <Swiper
                    spaceBetween={20}
                    slidesPerView={1.4}
                >
                    {achievements.map((achievement) => (
                        <SwiperSlide className="align-items-center">
                            <Card className="mb-0 mb-md-4">
                                <div className="card-body">
                                    <div className="d-flex mb-4 align-items-center">
                                        <div>
                                            <Icon color="#E224A2" component={ArrowRightCircle} size={48} />
                                        </div>
                                        <div className="h3 ms-3 mb-0">{achievement.title}</div>
                                    </div>
                                    <span className="text-muted">
                                     {achievement.text}
                                </span>
                                </div>
                            </Card>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </div>
    )
}