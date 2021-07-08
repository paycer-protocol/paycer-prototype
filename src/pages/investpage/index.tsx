import React from 'react'
import PageHeader from '@components/molecules/page-header'
import Button from '@components/atoms/button'
import InvestCard from './components/invest-card'
import Modal from "@components/molecules/modal";

const InvestModal = () => {
    return (
        <Modal show={show} onHide={onHide}>
            <Modal.Header closeButton onHide={onHide}>
                <Modal.Title>
                   Blubb
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
               Blubb
            </Modal.Body>
        </Modal>
    )
}

export default () => {

    return (
        <div className="container">
            <PageHeader>
                <div className="row align-items-center">
                    <div className="col">
                        <PageHeader.Subtitle>Overview</PageHeader.Subtitle>
                        <PageHeader.Title>Invest</PageHeader.Title>
                    </div>
                    <div className="col-auto">
                        <Button variant="outline-primary">
                            Create Portfolio
                        </Button>
                    </div>
                </div>
            </PageHeader>
            <div className="row">
                <div className="col-12 col-md-6 col-lg-4">
                    <InvestCard />
                </div>
                <div className="col-12 col-md-6 col-lg-4">
                    <InvestCard />
                </div>
                <div className="col-12 col-md-6 col-lg-4">
                    <InvestCard />
                </div>
            </div>
        </div>
    )
}
