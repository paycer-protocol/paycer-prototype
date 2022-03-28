import React, {useState} from 'react'
import {t} from '@lingui/macro'
import PageHeader from '@components/molecules/page-header'
import CrosschainSwap from '@components/organisms/crosschain-swap'
import SupplyLiquidity from '@components/organisms/supply-liquidity'
import PortalBlockNumber from '@components/organisms/portal-block-number'

export default function CrosschainBridge() {
    const [supplyTabActive, setSupplyTabActive] = useState(false)

    return (
        <>
            <div className="container mt-3">
                <PageHeader>
                    <div className="row align-items-center">
                        <div className="col">
                            <PageHeader.Subtitle>Overview</PageHeader.Subtitle>
                            <PageHeader.Title>Swap</PageHeader.Title>
                            <span className="badge bg-danger-soft mt-3 text-white py-2 px-3">This page is a demo</span>
                        </div>
                    </div>
                </PageHeader>
                <div>
                    <div className="d-flex">
                        <div className={supplyTabActive ? 'PCR-Tab' : 'PCR-Tab PCR-Tab--isActive'}
                             onClick={() => setSupplyTabActive(false)}>{t`Swap`}</div>
                        <div className={supplyTabActive ? 'PCR-Tab PCR-Tab--isActive' : 'PCR-Tab'}
                             onClick={() => setSupplyTabActive(true)}>{t`Liquidity`}</div>
                    </div>
                    <div className="card blur-background">
                        <div className="card-body p-0">
                            <div className="d-flex flex-column flex-md-row">
                                <div className="w-100">
                                    {supplyTabActive ? <SupplyLiquidity/> : <CrosschainSwap/>}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <PortalBlockNumber/>
        </>
    )
}
