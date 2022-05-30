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

const InnerImageSlide = styled.div`
    height: 650px;
    width: 100%;
    background-position: center;
    background-size: cover;
`



export default function SwiperSection() {

const isLargeScreen = useMediaQuery({ query: '(min-width: 1979px)' })
const isMidScreen = useMediaQuery({ query: '(max-width: 1680px)' })

const items = [

    {
        images: [
            '/img/nft/renderings/1.png',
            '/img/nft/renderings/2.png',
        ],
        loopDelay: 1500
    },
    {
        images: [
            '/img/nft/renderings/4.png',
            '/img/nft/renderings/3.png',
        ],
        loopDelay: 2500
    },
    {
        images: [
            '/img/nft/renderings/5.png',
            '/img/nft/renderings/6.png',
        ],
        loopDelay: 3000
    },
    {
        images: [
            '/img/nft/renderings/7.png',
            '/img/nft/renderings/8.png',
        ],
        loopDelay: 2500
    },
    {
        images: [
            '/img/nft/renderings/9.png',
            '/img/nft/renderings/10.png',
        ],
        loopDelay: 1500
    },
    {
        images: [
            '/img/nft/renderings/11.png',
            '/img/nft/renderings/12.png',
        ],
        loopDelay: 2500
    },
    {
        images: [
            '/img/nft/renderings/13.png',
            '/img/nft/renderings/14.png',
        ],
        loopDelay: 2000
    },

]

console.log(isLargeScreen)
  
  return (
      <>
        <div style={{height: '650px', width: '100%', overflow: 'hidden'}}>
          <Swiper
              spaceBetween={0}
              slidesPerView={4}
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
                                disableOnInteraction: false,
                                reverseDirection: innerKey % 2 === 0,
                            }}
                            height={650}
                            speed={400}
                            modules={[Autoplay]}
                        >
                            {item.images.map((img, innerKey) => (
                                <SwiperSlide key={innerKey}>
                                    <InnerImageSlide style={{backgroundImage: `url("${img}")`}} />
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