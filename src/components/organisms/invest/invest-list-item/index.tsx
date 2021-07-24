import React, { useState } from 'react'
import styled from 'styled-components'
import { Trans, t } from '@lingui/macro'
import Card from '@components/molecules/card'
import { Money, FormattedNumber } from '@components/atoms/number'
import Button from '@components/atoms/button'
import InvestModal from '@components/organisms/invest/invest-modal'
import { InvestmentStrategy } from '../../../../types/investment'
import { normalizeFilename } from "../../../../helper/filename";

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
        <Card className="box-shadow">
            <Card.Body className="pt-3 pb-3">
                <div className="d-flex justify-content-between align-items-center ">
                    <h6 className="text-uppercase text-center my-4 font-size-lg">
                        { strategyName }
                    </h6>

                    <div>
                        <strong className="d-block">% <span className="display-2">{totalInterestRate}</span> /</strong>
                        <Trans>APR</Trans>
                    </div>

                    <div>

                        <div className="d-flex justify-content-center">
                            {assets.map((asset, key) => (
                                <img width="32" key={key} src={asset.imgPath} alt={asset.name} />
                            ))}
                        </div>
                    </div>
                    <div>
                        <strong className="d-block mb-1">
                            <Trans>Total Volume</Trans>
                        </strong>
                        <span className="">
                        <Money value={tvl}/>
                        </span>
                    </div>

                    <div>
                        <strong className="d-block mb-1">
                            <Trans>Deposited</Trans>
                        </strong>
                        <span className={invested ? 'link-invest' : ''}>
                        <Money value={invested} />
                        </span>
                    </div>


                    <div>
                        <strong className="d-block mb-1">
                            <Trans>Earned</Trans>
                        </strong>
                        <FormattedNumber
                            value={earnedInterest}
                            minimumFractionDigits={2}
                            maximumFractionDigits={4}
                        />
                        &nbsp;
                        {investSymbol}
                    </div>

                    <Button onClick={() => setShowInvestModal(true)} variant={'outline-primary'}>
                        {invested ? t`Edit invest` : t`Start invest`}
                    </Button>

                </div>
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
