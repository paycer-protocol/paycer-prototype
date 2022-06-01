import { t } from '@lingui/macro';
import Image from 'next/image';
import styled from "styled-components";
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Pagination, Navigation } from 'swiper'
import Card from "@components/molecules/card";
import Icon from "@components/atoms/icon";
import {ArrowRightCircle} from "@styled-icons/bootstrap";
import React from "react";
import {useMediaQuery} from "react-responsive";

const SwiperInner = styled.div`
    transform: skew(-20deg);
`

const SliderImage = styled.img`
    transform: skew(20deg);
    position: relative;
    left: -30%;
    @media screen and (min-width: 3000px) {
       left: -3vw;
    }
    @media screen and (min-width: 1200px) and (max-width: 1450px)  {
      left: -40%;
    }
    @media screen and (min-width: 800px) and (max-width: 1100px)  {
      left: -50%;
    }
`

export default function SwiperSection() {

    const isVeryLargeScreen = useMediaQuery({ query: '(min-width: 2600px)' })
    const isLargeScreen = useMediaQuery({ query: '(min-width: 1979px)' })
    const isMidScreen = useMediaQuery({ query: '(max-width: 1680px)' })
    const isMobile = useMediaQuery({ query: '(max-width: 600px)' })

    const items = [

        {
            images: [
                '/img/nft/slider/blue-side-1.png',
                '/img/nft/slider/blue-side-2.png'
            ],
            loopDelay: 1500
        },
        {
            images: [
                '/img/nft/slider/green-side-2.png',
                '/img/nft/slider/green-side-1.png'
            ],
            loopDelay: 2500
        },
        {
            images: [
                '/img/nft/slider/yellow-side-2.png',
                '/img/nft/slider/yellow-side-1.png'
            ],
            loopDelay: 3000
        },
        {
            images: [
                '/img/nft/slider/pink-side-2.png',
                '/img/nft/slider/pink-side-1.png'
            ],
            loopDelay: 2500
        },
        {
            images: [
                '/img/nft/slider/purple-side-1.png',
                '/img/nft/slider/purple-side-2.png'
            ],
            loopDelay: 1500
        },
        {
            images: [
                '/img/nft/slider/white-side-1.png',
                '/img/nft/slider/white-side-2.png'
            ],
            loopDelay: 2500
        }
    ]

    const sliderSlidesPerView = () => {
        if (isMobile) {
            return 2
        }
        if (isMidScreen) {
            return 4
        }
        if (isLargeScreen) {
            return 6
        }
    }

  return (
      <>
        <div style={{height: '650px', width: '100%', overflow: 'hidden'}}>
          <Swiper
              spaceBetween={0}
              breakpoints={{
                  2800: {
                      slidesPerView: 8,
                  },
                  2500: {
                      slidesPerView: 7,
                  },
                  1979: {
                      slidesPerView: 6,
                  },
                  1700: {
                      slidesPerView: 5,
                  },
                  1200: {
                      slidesPerView: 4,
                  },
                  800: {
                      slidesPerView: 3,
                  },
                  400: {
                      slidesPerView: 2,
                  },




              }}
              autoHeight
              loop
              slidesOffsetBefore={isMidScreen ? 250 : -100}
              autoplay={{
                  delay: 2500,
                  disableOnInteraction: false,
              }}
              modules={[Autoplay]}
          >
            {items.map((item, innerKey) => (
                <SwiperSlide key={innerKey}>
                    <SwiperInner>
                        <Swiper
                            spaceBetween={0}
                            slidesPerView={1}
                            loop
                            direction="vertical"
                            autoplay={{
                                delay: item.loopDelay,
                                disableOnInteraction: false
                            }}
                            height={650}
                            speed={400}
                            modules={[Autoplay]}
                        >
                            {item.images.map((img, innerKey) => (
                                <SwiperSlide key={innerKey}>
                                    <SliderImage width="650" height="650" src={img} />
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    </SwiperInner>
                </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </>
  )
}