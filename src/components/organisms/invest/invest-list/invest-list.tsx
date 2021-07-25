import React, { useContext } from 'react'
import {t, Trans} from '@lingui/macro'
import InvestListItem from '@components/organisms/invest/invest-list-item'
import InvestListSearch from './invest-list-search'
import Card from '@components/molecules/card'
import { InvestListContext } from '../../../../context/invest-list-context'

const InvestList = () => {

    const {
        items
    } = useContext(InvestListContext);

    return (
        <>
        <InvestListSearch />
        <Card className="box-shadow bg-transparent border-0 pb-0 pt-0 mb-4">
            <Card.Body className="pt-0 pb-0 overflow-hidden position-relative">
                <div className="row w-100">
                    <div className="col-md-2 d-flex justify-content-center flex-column fw-bold">
                        <Trans>Assets</Trans>
                    </div>
                    <div className="col-md-1 d-flex justify-content-center flex-column fw-bold">
                        <Trans>Strategy</Trans>
                    </div>
                    <div className="col-md-2 d-flex justify-content-center flex-column fw-bold align-items-center">
                        <Trans>Investrate</Trans>
                    </div>
                    <div className="col-md-2 d-flex justify-content-center flex-column fw-bold">
                        <Trans>Deposited</Trans>
                    </div>
                    <div className="col-md-2 d-flex justify-content-center flex-column fw-bold">
                        <Trans>Earned</Trans>
                    </div>
                    <div className="col-md-2 d-flex justify-content-center flex-column fw-bold">
                        <Trans>Total Volume</Trans>
                    </div>
                </div>
            </Card.Body>
        </Card>

        {items.map((data, key) => (
            <div key={key} className="">
                <InvestListItem
                    { ...data }
                />
            </div>
        ))}
        </>
    )
}

export default InvestList
