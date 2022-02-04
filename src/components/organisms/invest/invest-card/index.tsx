import React, { useState } from 'react'
import { t, Trans } from '@lingui/macro'
import Card from '@components/molecules/card'
import { FormattedNumber } from '@components/atoms/number'
import Button from '@components/atoms/button'
import InvestModal from '@components/organisms/invest/invest-modal'
import useToken from '@hooks/use-token'
import { StrategyType } from '../../../../types/investment'
import { riskLabels } from '../../../../locales'
import CurrencyIcon from "@components/atoms/currency-icon";

const InvestCard = (props: StrategyType) => {
    const [showInvestModal, setShowInvestModal] = useState(false)
    const totalInterestRate = props.interest.interestRate + props.rewards.rewardRate
    const investedToken = useToken(props.output.symbol)
    const investedBalance = investedToken.tokenBalance()

    const onHide = () => {
        setShowInvestModal(false)
    }
    return (
        <Card className="box-shadow overflow-hidden">
            <Card.Body>
                <div className="mb-3">
                    <h6 className="text-uppercase text-center my-4 font-size-lg">
                        { props.name }
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
                    <div className="h6 text-uppercase text-center">
                        / {t`APR`}
                    </div>
                </div>
                <ul className="list-group list-group-flush">
                    <li className="list-group-item d-flex align-items-center justify-content-between px-0">
                        <span className="">Assets</span>
                        <div className="d-flex justify-content-center">
                            <CurrencyIcon
                                symbol={props.input.symbol}
                                className="ms-2 position-relative"
                                style={{top: '-1px'}}
                                width={30}
                                height={30}
                            />
                        </div>
                    </li>
                    <li className="list-group-item d-flex align-items-center justify-content-between px-0">
                        <span>{t`Total Volume`}</span>
                        <span>-</span>
                    </li>
                    <li className="list-group-item d-flex align-items-center justify-content-between px-0">
                        <span>{t`Holdings`}</span>
                        {
                            investedBalance > 0
                              ? (
                                <>
                                    <FormattedNumber
                                      value={investedBalance}
                                      minimumFractionDigits={2}
                                      maximumFractionDigits={4}
                                    />
                                    &nbsp;{investedToken.symbol}
                                </>
                              )
                              : (
                                <span>-</span>
                              )
                        }
                    </li>
                    <li className="list-group-item d-flex align-items-center justify-content-between px-0">
                        <span>{t`Risk`}</span>
                        <Trans id={riskLabels[props.riskLevel].id} />
                    </li>
                </ul>

                <Button onClick={() => setShowInvestModal(true)} variant="primary" className='w-100 mt-4'>
                    {investedBalance ? t`Edit invest` : t`Start invest`}
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
