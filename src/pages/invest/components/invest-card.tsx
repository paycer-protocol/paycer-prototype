import React, { useState } from 'react'
import styled from 'styled-components'
import { Trans } from '@lingui/macro'
import Card from '@components/molecules/card'
import InvestModal from './invest-modal'
import { Money } from '@components/atoms/number'
import Button from '@components/atoms/button'
import useWallet from '@components/organisms/web3/hooks/useWallet'

const StackedIcons = styled.div`
  display: flex;
  align-items: center;
  
  img {
      width: 32px;
      height: 32px;
      margin-right: -12px;
  }
`

export interface InvestCardProps {
  title?: string,
  percentageRate?: string,
  assets?: object[],
  tvl?: number,
  deposited?: number,
  earned?: number,
  currency?: string,
  setShowWalletProviderModal?: any
}

const InvestCard = (props: InvestCardProps) => {
    const {
        title,
        percentageRate,
        assets,
        tvl,
        deposited,
        earned,
        currency,
        setShowWalletProviderModal
    } = props

    const wallet = useWallet()
    const { isConnected } = wallet
    const [showInvestModal, setShowInvestModal] = useState(false)

    const onHide = () => {
        setShowInvestModal(false)
    }
    return (
        <Card className="box-shadow" border={deposited > 0 ? 'invest' : ''}>
            <Card.Body>
                <h6 className="text-uppercase text-center my-4 font-size-lg">
                    { title }
                </h6>
                <div className="row g-0 align-items-center justify-content-center">
                    <div className="col-auto">
                        <div className="h2 mb-0">%</div>
                    </div>
                    <div className="col-auto">
                        <div className="display-2 mb-0">{percentageRate}</div>
                    </div>
                </div>
                <div className="h6 text-uppercase text-center  mb-5">
                    / <Trans>APR</Trans>
                </div>
                <ul className="list-group list-group-flush">
                    <li className="list-group-item d-flex align-items-center justify-content-between px-0">
                        <span className=""><Trans>Assets</Trans></span>
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
                            <Money value={tvl}/>
                        </span>
                    </li>
                    <li className="list-group-item d-flex align-items-center justify-content-between px-0">
                        <span className="">
                            <Trans>Deposited</Trans>
                        </span>
                        <span className={deposited ? 'link-invest' : ''}>
                            <Money value={deposited}/>
                        </span>
                    </li>
                    <li className="list-group-item d-flex align-items-center justify-content-between px-0">
                        <span className="">
                            <Trans>Earned</Trans>
                        </span>
                        <span className="">
                            <Money value={earned} currency={currency} />
                        </span>
                    </li>
                </ul>

                <Button onClick={isConnected ? () => setShowInvestModal(true) : () => setShowWalletProviderModal(true)} variant={deposited ? 'invest' : 'primary'} className='w-100'>
                    <Trans>
                        {deposited ? 'Edit invest' : 'Start invest'}
                    </Trans>
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
