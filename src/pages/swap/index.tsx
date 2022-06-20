import React from 'react'
import Layout from '@components/organisms/layout'
import PageHeader from '@components/molecules/page-header'
import Swap from '@components/organisms/swap'
export default function SwapPage() {
    return (
        <Layout>
            <div className="container mt-3">
                <PageHeader>
                    <div className="row align-items-center justify-content-center">
                        <div className="col-md-5">
                            <PageHeader.Subtitle>Overview</PageHeader.Subtitle>
                            <PageHeader.Title>Swap</PageHeader.Title>
                        </div>
                    </div>
                </PageHeader>

                <div>
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
