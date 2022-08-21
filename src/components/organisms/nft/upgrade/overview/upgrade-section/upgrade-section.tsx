
import React, { useEffect, useState } from 'react'
import { t } from '@lingui/macro'
import Icon from '@components/atoms/icon'
import { useLingui } from '@lingui/react'
import { useDapp } from '@context/dapp-context'
import { ArrowForward } from '@styled-icons/material'
import Button from '@components/atoms/button'
import Image from 'next/image'
import styled from 'styled-components'
import useNftSale from '@hooks/nft/use-nft-sale'
import Link from "next/link";
import GradientButton from "@components/atoms/button/gradient-button";
import {ModelViewerWrapperProps} from "@components/organisms/nft/landing-page/about-section";
import NftModelViewer from "@components/organisms/nft/common/model-viewer";

const Background = styled.div`
  position: relative;
  background: linear-gradient(270deg, #3A00E3 0%, #8D0DA2 100%);
`

const PrettyLi = styled.li`
  display: flex;
  align-items: center;
  font-size: 18px;

  counter-increment: ordered-list;

  &:not(:last-child) {
    margin-bottom: 1rem;
  }

  &::before {
    content: counter(ordered-list);
    flex-shrink: 0;
    margin-right: 1.5rem;
    color: #3A00E3;
    background-color: white;
    display: flex;
    font-size: 22px;
    font-weight: bold;
    align-items: center;
    justify-content: center;
    width: 2rem;
    height: 2rem;
    border-radius: 99999px;
  }

  &::marker {
    display: none;
  }
`

const StyledLink = styled.a`
  text-decoration: underline;
  &:hover {
    text-decoration: none;
  }
`

export const ModelViewerWrapper = styled.div`
  width: 700px;
  height: 700px;
  top: -30px;
  right: -100px;
  @media (max-width: 767px) {
     width: 350px;
     height: 350px;  
     top: 25px;
  }
`

function InfoColumn() {

  return (
    <div className="col-lg-6 mb-4 mb-md-0">
      <ol className="p-0 mb-5">
        <PrettyLi>{t`Connect Matamask wallet for minting`}</PrettyLi>
        <PrettyLi>{t`Price: Stack min. 5000 PCR Token`}</PrettyLi>
        <PrettyLi>{t`Limits: Upgrade to max. Level`}</PrettyLi>
      </ol>
    </div>
  )
}

export default function UpgradeSection() {

  return (
    <Background className="px-4 p-md-0">
      <div className="position-relative mx-auto px-4 py-md-6" style={{ maxWidth: '75rem' }}>
        <div className="row">
          <div className="col-md-7">
            <div>
              <div className="mb-4">
                <h5 className="header-pretitle text-pink">{t`NFT Utilities`}</h5>
                <h1 className="header-title">{t`Upgrade your NFT by...??`}</h1>
              </div>
              <h2 className="display-1 mb-3 mb-md-4">
                {t`Upgrade NFT`}
              </h2>
              <div>
                <InfoColumn />
                <div className="w-50">

                  <Link href="/nft/upgrade/">
                    <button type="button" className="btn btn-white fw-normal border-0 d-flex justify-content-center align-items-center px-5 py-3 mt-5">
                      {t`UPGRADE NFT NOW`}
                      <div className="ms-3"><Icon size={16} component={ArrowForward} /></div>
                    </button>
                  </Link>
                  <div className="mt-4 text-end">
                    <span className="cursor-pointer">
                      <p className="paragraph-content opacity-50 text-start">
                        <StyledLink>
                          {t`Need help?`}
                        </StyledLink>
                      </p>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-5">
            <ModelViewerWrapper className="position-absolute">
              <NftModelViewer url="/assets/models/nft/Horse_3_lp_final.glb"  />
            </ModelViewerWrapper>
          </div>
        </div>

      </div>
    </Background>
  )
}
