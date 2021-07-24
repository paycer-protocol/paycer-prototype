import React from 'react'
import {t, Trans} from "@lingui/macro";
import InvestListItem from "@components/organisms/invest/invest-list-item";
import Card from "@components/molecules/card";

const SearchList = (props) => {
    const {
        items
    } = props

    interface SearchListFormFields {
        items: object
    }

    const handleSubmit = (values: SearchListFormFields) => {

    }

    const initialValues: SearchListFormFields = {
        // invest pairs
        items
    }

    return (
        <>
        <input
            name="search-form"
            type="text"
            className="form-control mb-4"
            placeholder={t`Search ...`}
            onChange={(e) => {
                console.log(items)
            }}
        />

        <Card className="box-shadow bg-transparent border-0 pb-0 pt-0 mb-3">
            <Card.Body className="pt-0 pb-0 overflow-hidden position-relative">
                <div className="row w-100">
                    <div className="col-md-2 d-flex justify-content-center flex-column">
                        &nbsp;
                    </div>
                    <div className="col-md-2 d-flex justify-content-center flex-column">
                       <span className="d-block mb-1">
                            <Trans>Assets</Trans>
                        </span>
                    </div>
                    <div className="col-md-2 d-flex justify-content-center flex-column">
                        <span className="d-block mb-1">
                            <Trans>Total Volume</Trans>
                        </span>
                    </div>
                    <div className="col-md-2 d-flex justify-content-center flex-column">
                        <span className="d-block mb-1">
                            <Trans>Deposited</Trans>
                        </span>
                    </div>
                    <div className="col-md-2 d-flex justify-content-center flex-column">
                        <span className="d-block mb-1">
                            <Trans>Earned</Trans>
                        </span>
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

export default SearchList
