import React, { useContext } from 'react'
import {t, Trans} from '@lingui/macro'
import { InvestListContext } from '../../../../context/invest-list-context'

const InvestList = () => {

    const {
        resetFilters,
        handleAutoSuggest,
        filterStrategy,
        keyword,
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
                    <div className="form-check form-switch">
                        <input className="form-check-input me-3"
                               type="checkbox"
                               name="with-invest-card"
                               onChange={(e) => {
                                   if (e.currentTarget.checked) {
                                       filterStrategy()
                                   } else {
                                       resetFilters()
                                   }
                               }}
                        />
                        <label className="form-check-label" htmlFor="flexSwitchCheckDefault">
                            {t`All / Custom`}
                        </label>
                    </div>
                </div>
            </div>
        </>
    )
}

export default InvestList
