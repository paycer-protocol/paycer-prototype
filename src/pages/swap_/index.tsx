import React, {useState} from 'react'

import Layout from "@components/organisms/layout";
import PageHeader from "@components/molecules/page-header";
import Swap from '@components/organisms/swap/swap_'
export default function Swap_() {
    const [supplyTabActive, setSupplyTabActive] = useState(false)

    return (
        <Layout>
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
                    {/*
                    <div className="d-flex">
                        <div className={supplyTabActive ? 'PCR-Tab' : 'PCR-Tab PCR-Tab--isActive'}
                             onClick={() => setSupplyTabActive(false)}>{t`Swap`}</div>
                        <div className={supplyTabActive ? 'PCR-Tab PCR-Tab--isActive' : 'PCR-Tab'}
                             onClick={() => setSupplyTabActive(true)}>{t`Liquidity`}</div>
                    </div>
                    */}
                    <div className="card blur-background col-md-5 m-auto">
                        <div className="card-body p-0">
                            <div className="d-flex flex-column flex-md-row">
                                <div className="w-100">
                                    <Swap />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    )
}
