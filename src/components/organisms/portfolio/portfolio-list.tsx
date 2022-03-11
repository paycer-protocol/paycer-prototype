import React from 'react'
import styled, { css } from 'styled-components'
import { Trans } from '@lingui/macro'
import Link from 'next/link'
import ProgressBar from '@components/atoms/progress-bars'
import Button from '@components/atoms/button'
import { Money, Percentage } from '@components/atoms/number'
import Card from '@components/molecules/card'
import { StrategyType } from '../../../types/investment'
import { riskLabels } from '../../../locales'
import CurrencyIcon from "@components/atoms/currency-icon";

interface PortfolioStrategy extends StrategyType {
  balance?: number
  color: string
}

interface PortfolioProps {
  strategies: PortfolioStrategy[]
  totalBalance: number
}

const ProgressbarColorWrapper = styled.div`
  ${props => props.color && css`
    .progress-bar {
      background: ${props.color};
    }
  `}
`

export default function PortfolioList(props: PortfolioProps) {
    const { strategies, totalBalance } = props

    const thClass = 'bg-card-blue border border-secondary-dark'
    const tdClass = 'bg-dark border border-purple-dark'
    return (
        <div className="table-responsive mb-0 border-0">
            <table className="table table-sm table-nowrap card-table" style={{background: 'rgb(14 22 40 / 50%)'}}>
                <thead className="position-relative" style={{top: '-10px'}}>
                    <tr>
                        <th className={`${thClass} card-border-top-left-radius card-border-bottom-left-radius border-right-0`}>
                            <span className="text-white">
                                <Trans>Pool</Trans>
                            </span>
                        </th>
                        <th className={`${thClass} border-left-0 border-right-0`}>
                            <span className="text-white">
                                <Trans>Risk Level</Trans>
                            </span>
                        </th>
                        <th className={`${thClass} border-left-0 border-right-0`}>
                            <span className="text-white">
                                <Trans>Investment ratio </Trans>
                            </span>
                        </th>
                        <th className={`${thClass} border-left-0 border-right-0`}>
                            <span className="text-white">
                                <Trans>APR</Trans>
                            </span>
                        </th>
                        <th className={`${thClass} border-left-0 border-right-0`}>
                            <span className="text-white">
                                <Trans>Investment</Trans>
                            </span>
                        </th>
                    </tr>
                </thead>
                <tbody className="list position-relative" style={{top: '-10px'}}>
                    {strategies.length ? strategies.map((strategy, key) => {
                        const tokenBalance = strategy.balance
                        const interest = strategy.interest.interestRate + strategy.rewards.rewardRate

                        return (
                            <tr key={key}>
                                <td className={`${tdClass} card-border-top-left-radius card-border-bottom-left-radius border-right-0`}>
                                    <div className="d-flex align-items-center">
                                        <CurrencyIcon
                                            symbol={strategy.input.symbol}
                                            className="me-3 pe-1 position-relative"
                                            style={{top: '-1px'}}
                                            width={30}
                                            height={30}
                                        />
                                      <strong className="font-size-lg">{strategy.name}</strong>
                                    </div>
                               </td>
                                <td className={`${tdClass} border-left-0 border-right-0`}>
                                    <Trans id={riskLabels[strategy.riskLevel].id}/>
                                </td>
                                <td className={`${tdClass} border-left-0 border-right-0`}>
                                    <div className="row align-items-center g-0">
                                        <div className="col-auto me-3">
                                            <Percentage
                                            value={(tokenBalance * 100 / totalBalance) / 100}
                                            className="mb-2"
                                            />
                                        </div>
                                        <div className="col">
                                            <ProgressbarColorWrapper color={strategy.color}>
                                                <ProgressBar
                                                    className="progress-sm"
                                                    now={tokenBalance * 100 / totalBalance}
                                                    min={0}
                                                    max={100}
                                                />
                                            </ProgressbarColorWrapper>
                                        </div>
                                    </div>
                                </td>
                                <td className={`${tdClass} border-left-0 border-right-0`}>
                                    <Percentage value={interest / 100} />
                                </td>
                                <td className={`${tdClass} card-border-top-right-radius card-border-bottom-right-radius  border-left-0 pt-0 pb-0`}>
                                    <Money value={tokenBalance} />
                                </td>
                            </tr>
                            )
                            }) : (
                            <tr>
                                <td colSpan={4}>
                                    <div className="text-center">
                                        <h4 className="text-muted mb-4">
                                            <Trans>You have no investments in your portfolio</Trans>
                                        </h4>
                                        <Link href="/invest">
                                            <Button variant="primary">
                                                <Trans>Invest now</Trans>
                                            </Button>
                                        </Link>
                                    </div>
                                </td>
                            </tr>
                        )}
                </tbody>
            </table>
        </div>
    )
}
