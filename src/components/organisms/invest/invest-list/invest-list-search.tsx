import React, { useContext } from 'react'
import {t, Trans} from '@lingui/macro'
import { InvestListContext } from '../../../../context/invest-list-context'

const InvestList = () => {

    const {
        resetFilters,
        handleAutoSuggest,
        filterInvested,
        filterStrategy,
        keyword,
        activeFilter
    } = useContext(InvestListContext);

    return (
        <>
            <input
                name="invest-autosuggest"
                type="text"
                value={keyword}
                className="form-control mb-4 fw-normal"
                placeholder={t`Search by: Strategy, APR, Asset, Risk Level, Address...`}
                onChange={(e) => {
                    handleAutoSuggest(e.currentTarget.value)
                }}
            />

            <div className="d-flex">
                <div className="me-4">
                    <Trans>All</Trans>
                    <input
                        name="invest-radio"
                        checked={activeFilter === 'all'}
                        className="ms-3 form-check-input"
                        type="radio"
                        onChange={() => {
                            resetFilters()
                        }}
                    />
                </div>

                <div className="me-4">
                    <Trans>Investment</Trans>
                    <input
                        name="invest-radio"
                        checked={activeFilter === 'invested'}
                        className="ms-3 form-check-input"
                        type="radio"
                        onChange={(e) => {
                            filterInvested()
                        }}
                    />
                </div>

                <div>
                    <Trans>Custom</Trans>
                    <input
                        name="invest-radio"
                        checked={activeFilter === 'strategy'}
                        className="ms-3 form-check-input"
                        type="radio"
                        onChange={(e) => {
                            filterStrategy()
                        }}
                    />
                </div>
            </div>

        </>
    )
}

export default InvestList
