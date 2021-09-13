import React  from 'react'
import { t } from '@lingui/macro'
import Card from '@components/molecules/card'

const InvestListItemHeader = () => {

    return (
        <>
            <Card className="box-shadow bg-transparent border-0 pb-0 pt-0 mb-4">
                <Card.Body className="pt-0 pb-0 overflow-hidden position-relative">
                    <div className="row w-100">
                        <div className="col-md-2 d-flex justify-content-center flex-column fw-bold">
                            {t`Strategy`}
                        </div>
                        <div className="col-md-2 d-flex justify-content-center flex-column fw-bold">
                            {t`Rewards`}
                        </div>
                        <div className="col-md-2 d-flex justify-content-center flex-column fw-bold">
                            {t`APR`}
                        </div>
                        <div className="col-md-1 d-flex justify-content-center flex-column fw-bold align-items-center">
                            {t`Risk`}
                        </div>
                        <div className="col-md-2 d-flex justify-content-center flex-column fw-bold">
                            {t`Holdings`}
                        </div>
                        <div className="col-md-2 d-flex justify-content-center flex-column fw-bold">
                            {t`Total Volume`}
                        </div>
                    </div>
                </Card.Body>
            </Card>
        </>
    )
}

export default InvestListItemHeader


