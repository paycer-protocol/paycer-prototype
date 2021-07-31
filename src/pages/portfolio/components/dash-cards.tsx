import { Trans, t } from '@lingui/macro'
import DashCard from '@components/organisms/dashboard/dash-card'
import useWallet from '@hooks/use-wallet'
import { FormattedNumber, Money } from '@components/atoms/number'
import {normalizeFilename} from "../../../helper/filename";
import React from "react";
import styled from 'styled-components'


const Circle = styled.div`
  position: absolute;
  width: 100%;
  padding-top: 100%;
  border-radius: 50%;
  -webkit-mask: radial-gradient(farthest-side, transparent calc(100% - 5px),#fff 0);
  top: -75%;
  
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
    background: radial-gradient(white 40%, transparent 41%), conic-gradient(#3C01E3 0% 35%, #6808C0 35% 60%, #8D0EA2 60% 100%);
    border-radius: 50%;
    z-index: -2;
  }
`

export default function DashCards () {
  const wallet = useWallet()

  return (
    <div className="row justify-content-between">
      <div className="col-12 col-md-3 col-xl justify-content-center d-flex ms-auto">
        <DashCard title={t`Total Balance`}>
            <div className="d-flex justify-content-between">
                <img width="30" className="me-3" src={`assets/icons/${normalizeFilename(wallet.etherSymbol)}.svg`} alt={wallet.etherSymbol} />
                <div className="fw-normal">
                    <FormattedNumber
                        value={wallet.etherBalance}
                        minimumFractionDigits={2}
                        maximumFractionDigits={4}
                    />
                    &nbsp;
                    {wallet.etherSymbol}
                </div>
            </div>
            </DashCard>
      </div>
      <div className="col-12 col-md-3 col-xl justify-content-center d-flex position-relative">


        <Circle />


        <DashCard title={t`Savings`}>
            <div className="d-flex justify-content-between fw-normal">
                <Money value={0} currency="USD" />
            </div>
        </DashCard>
      </div>
      <div className="col-12 col-md-3 col-xl justify-content-center d-flex me-auto">
        <DashCard title={t`Risk`}>
            <div className="d-flex justify-content-between fw-normal">
              <Trans>Low</Trans>
            </div>
        </DashCard>
      </div>
    </div>
  )
}
