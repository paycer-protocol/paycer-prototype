import React, { useState } from 'react'
import styled from 'styled-components'
import { Trans, t } from '@lingui/macro'
import Card from '@components/molecules/card'
import { Money, FormattedNumber } from '@components/atoms/number'
import Button from '@components/atoms/button'
import InvestModal from '@components/organisms/invest/invest-modal'
import { InvestmentStrategy } from '../../../../types/investment'
import { normalizeFilename } from "../../../../helper/filename";

const StackedIcons = styled.div`
  display: flex;
  align-items: center;
  
  img {
      width: 32px;
      height: 32px;
      margin-right: -12px;
  }
`

const InvestCard = (props: InvestmentStrategy) => {
    const {
        strategyName,
        interestRate,
        rewardRate,
        assets,
        tvl,
        invested,
        earnedInterest,
        investSymbol,
    } = props

    const [showInvestModal, setShowInvestModal] = useState(false)
    const totalInterestRate = interestRate + rewardRate;

    const onHide = () => {
        setShowInvestModal(false)
    }
    return (
        <Card className="box-shadow" border={invested > 0 ? 'invest' : ''}>
            <Card.Body>
                <h6 className="text-uppercase text-center my-4 font-size-lg">
                    { strategyName }
                </h6>
                <div className="row g-0 align-items-center justify-content-center">
                    <div className="col-auto">
                        <div className="h2 mb-0">%</div>
                    </div>
                    <div className="col-auto">
                        <div className="display-2 mb-0">
                            {totalInterestRate}
                        </div>
                    </div>
                </div>
                <div className="h6 text-uppercase text-center  mb-5">
                    / <Trans>APR</Trans>
                </div>
                <ul className="list-group list-group-flush">
                    <li className="list-group-item d-flex align-items-center justify-content-between px-0">
                        <span className="">Assets</span>
                        <StackedIcons>
                            {assets.map((asset, key) => (
                                <img key={key} src={asset.imgPath} alt={asset.name} />
                            ))}
                        </StackedIcons>
                    </li>
                    <li className="list-group-item d-flex align-items-center justify-content-between px-0">
                        <span className="">
                            <Trans>Total Volume</Trans>
                        </span>
                        <span className="">
                            <Money withIcon value={tvl}/>
                        </span>
                    </li>
                    <li className="list-group-item d-flex align-items-center justify-content-between px-0">
                        <span className="">
                            <Trans>Deposited</Trans>
                        </span>
                        <span className={invested ? 'link-invest' : ''}>
                            <Money withIcon value={invested} />
                        </span>
                    </li>
                    <li className="list-group-item d-flex align-items-center justify-content-between px-0">
                        <span className="">
                            <Trans>Earned</Trans>
                        </span>
                        <span className="">
                            <FormattedNumber
                              value={earnedInterest}
                              minimumFractionDigits={2}
                              maximumFractionDigits={4}
                            />
                            &nbsp;
                            {investSymbol}
                            <img width="28" className="ms-2" style={{marginTop: '-4px'}} src={`assets/icons/${normalizeFilename(investSymbol)}.svg`} alt={investSymbol} />
                        </span>
                    </li>
                </ul>

                <Button onClick={() => setShowInvestModal(true)} variant={'outline-primary'} className='w-100'>
                    {invested ? t`Edit invest` : t`Start invest`}
                </Button>
            </Card.Body>
            <InvestModal
                {...props}
                show={showInvestModal}
                onHide={onHide}
            />
        </Card>
    )
}

export default InvestCard
