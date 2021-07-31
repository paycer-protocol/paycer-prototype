import { Trans, t } from '@lingui/macro'
import DashCard from '@components/organisms/dashboard/dash-card'
import { Money } from '@components/atoms/number'
import React from "react";
import styled from 'styled-components'


const Circle = styled.div`
  position: absolute;
  border-radius: 50%;
  -webkit-mask: radial-gradient(farthest-side, transparent calc(100% - 5px),#fff 0);
  width: 260px;
  padding-top: 260px;
  top: -75%;
  
  
  @media (max-width: 767.98px) {
      width: 350px;
      padding-top: 350px;
      top: -140%;
  }

  
  &:before {
    position: absolute;
    content: "";
    width: 104%;
    height: 104%;
    top: -2%;
    left: -2%;
    background-color: transparent;
    border-radius: 50%;
    z-index: -1;
  }
  
  &:after {
    position: absolute;
    content: "";
    width: 106%;
    height: 106%;
    top: -3%;
    left: -3%;
    background-color: transparent;
    // TODO loop dynamically
    background: radial-gradient(white 40%, transparent 41%), conic-gradient(#3C01E3 0% 35%, #6808C0 35% 60%, #8D0EA2 60% 100%);
    border-radius: 50%;
    z-index: -2;
  }
`

interface DashCardsProps {
  totalBalance: number
}

export default function DashCards ({ totalBalance }: DashCardsProps) {
    return (
        <div className="row justify-content-between">
            <div className="col-12 col-md-4 col-lg-3 justify-content-center d-flex ms-auto">
                <DashCard title={t`Balance`} className="mb-0">
                    <div className="d-flex justify-content-between">
                        <img
                          width="30"
                          className="me-3"
                          src={`assets/icons/usd.svg`}
                          alt={'USD'}
                        />
                        <div className="fw-normal">
                            <Money value={totalBalance} />
                        </div>
                    </div>
                </DashCard>
            </div>
            <div className="col-12 col-md-4 col-lg-3 justify-content-center d-flex position-relative">
                <Circle />
                <DashCard title={t`Savings`} className="mb-0">
                    <div className="d-flex justify-content-between fw-normal">
                        <Money value={totalBalance * 13.3 / 100} currency="USD" />
                    </div>
                </DashCard>
            </div>
            <div className="col-12 col-md-4 col-lg-3 justify-content-center d-flex me-auto">
                <DashCard title={t`Risk`} className="mb-0">
                    <div className="d-flex justify-content-between fw-normal">
                        <Trans>Low</Trans>
                    </div>
                </DashCard>
            </div>
        </div>
    )
}
