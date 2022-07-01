import Card from '@components/molecules/card'
import PageHeader from '@components/molecules/page-header'
import { t } from '@lingui/macro'
import { ArrowRightCircle } from '@styled-icons/bootstrap'
import Icon from '@components/atoms/icon'
import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'

const achievements = [
  {
    title: 'Registered German Company',
    text: 'Paycer is a fully regulated and registered company. With its headquarters in Hamburg, Germany, we are in the best position to ensure our European leadership as CeDeFi champion.',
  },
  {
    title: 'Utility Token launched (PCR)',
    text: 'Our regulated PCR (ERC-20 Polygon) utility token has been launched successfully in Jan 2022 and is traded on DEX/CEX. The utilities include: loyalty tiers, voting rights, liquidity mining, burning, staking rewards and more.',
  },
  {
    title: 'Staking on Paycer Finance',
    text: 'Users can stake PCR to earn staking rewards. With different loyalty tiers you can earn up to 24% staking rewards. PCR staking will also add new utilities for the NFT and governance soon.',
  },
  {
    title: 'DeFi App launched',
    text: 'Paycers DeFi application has successfully been launched on paycer.finance. This DApp provides fully functional features like Staking, PCR Vesting, Investments, Swap and PCR Analytics.',
  },
  {
    title: 'Awesome Partnerships',
    text: 'Paycer has already partnered with exciting projects that are leading in their area. For example Paycer has partnered with Bloktopia and will announce a banking partnership very soon.',
  },
  {
    title: 'Big and loyal community',
    text: 'Since launching on various launchpads and with institutional & private investors we have enjoyed a big growth of our community. Get involved in Telegram, Twitter and Discord or join our next live AMA session.',
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
    <div>
      <div className="d-none d-md-block">
        <div className="container">
          <div className="mb-5">
            <h5 className="text-uppercase mb-3 text-pink">
              {t`Paycer's experience`}
            </h5>
            <PageHeader.Title>
              {t`Our achievements`}
            </PageHeader.Title>
          </div>

          <div className="row">
            {achievements.map((achievement, key) => (
              <div key={key} className="col-4 mb-4">
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

      </div>

      <div className="d-md-none ms-4">
        <Swiper
          spaceBetween={20}
          slidesPerView={1.4}
        >
          {achievements.map((achievement, key) => (
            <SwiperSlide key={key} className="align-items-center">
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
