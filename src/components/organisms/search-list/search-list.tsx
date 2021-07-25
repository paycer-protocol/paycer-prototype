import React, { useState } from 'react'
import {t, Trans} from "@lingui/macro";
import InvestListItem from "@components/organisms/invest/invest-list-item";
import Card from "@components/molecules/card";

const SearchList = (props) => {
    const {
        items
    } = props

    const [filteredItems, setFilteredItems] = useState<any>(items)
    const [keyword, setKeyword] = useState<string>('')

    const handleAutoSuggest = (keyword) => {
        setKeyword(keyword)
        let keywords = keyword.toLowerCase().split(' ')

        if (keyword !== '') {
            keywords = keywords.filter(f => f !== '')
        }

        const filterResult = items.filter(f => keywords.some(k => f.strategyName.toLowerCase().includes(k.toLowerCase()))
            || keywords.some(k => f.strategyType.toLowerCase().includes(k.toLowerCase()))
            || keywords.some(k => (f.interestRate + f.rewardRate).toString() === k.toLowerCase())
            || keywords.some(k => f.assets.some(a => a.name.toLowerCase().includes(k.toLowerCase())))
        )
        setFilteredItems(filterResult)
    }

    const filterStrategy = (checked) => {
        setKeyword('')
        if (checked) {
            setFilteredItems(items.filter(f => f.strategyType !== 'paycer'))
            return
        }
        setFilteredItems(items)
    }

    const filterInvested = (checked) => {
        setKeyword('')
        if (checked) {
            setFilteredItems(items.filter(f => f.invested > 0))
            return
        }
        setFilteredItems(items)
    }

    return (
        <>
        <input
            name="invest-autosuggest"
            type="text"
            value={keyword}
            className="form-control mb-3"
            placeholder={t`Search by Strategy, Investrate, Asset...`}
            onChange={(e) => {
                handleAutoSuggest(e.currentTarget.value)
            }}
        />

        <div className="mb-5 d-flex">
            <div className="me-4">
                <Trans>All</Trans>
                <input
                    name="invest-radio"
                    className="ms-3 form-check-input"
                    checked={keyword === '' && items.length === filteredItems.length}
                    type="radio"
                    onChange={() => {
                        setKeyword('')
                        setFilteredItems(items)
                    }}
                />
            </div>

            <div className="me-4">
                <Trans>With investment</Trans>
                <input
                    name="invest-radio"
                    className="ms-3 form-check-input"
                    type="radio"
                    onChange={(e) => {
                        filterInvested(e.target.checked)
                    }}
                />
            </div>

            <div>
                <Trans>Created by me</Trans>
                <input
                    name="invest-radio"
                    className="ms-3 form-check-input"
                    type="radio"
                    onChange={(e) => {
                        filterStrategy(e.target.checked)
                    }}
                />
            </div>
        </div>

        <Card className="box-shadow bg-transparent border-0 pb-0 pt-0 mb-3">
            <Card.Body className="pt-0 pb-0 overflow-hidden position-relative">
                <div className="row w-100">
                    <div className="col-md-2 d-flex justify-content-center flex-column fw-bold">
                        <Trans>Strategy / Investrate</Trans>
                    </div>
                    <div className="col-md-2 d-flex justify-content-center flex-column fw-bold">
                        <Trans>Assets</Trans>
                    </div>
                    <div className="col-md-2 d-flex justify-content-center flex-column fw-bold">
                        <Trans>Total Volume</Trans>
                    </div>
                    <div className="col-md-2 d-flex justify-content-center flex-column fw-bold">
                        <Trans>Deposited</Trans>
                    </div>
                    <div className="col-md-2 d-flex justify-content-center flex-column fw-bold">
                        <Trans>Earned</Trans>
                    </div>
                </div>
            </Card.Body>
        </Card>

        {filteredItems.map((data, key) => (
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
