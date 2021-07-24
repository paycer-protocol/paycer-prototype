import React from 'react'
import {t} from "@lingui/macro";
import {investmentStrategies} from "@config/investment/strategies";
import InvestListItem from "@components/organisms/invest/invest-list-item";

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
