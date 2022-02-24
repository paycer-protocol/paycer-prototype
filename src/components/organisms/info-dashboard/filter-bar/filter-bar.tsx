import React from 'react'
import { ChainId, Mainnet, Polygon, Kovan, Mumbai } from '@usedapp/core'
import {t} from '@lingui/macro'
import  { useInfoDashboard } from '@context/info-dashboard-context'
const FilterBar = () => {

    const { updateFilters, activeFilters } = useInfoDashboard()

    const handleChange = (e) => {
        updateFilters(Number(e.currentTarget.value), e.currentTarget.checked)
    }

    return (
        <div className="d-flex mb-4">
            <label className="custom-checkbox me-3">
                <span className="custom-checkbox-label">{t`All Chain`}</span>
                <input onChange={handleChange} value={0} checked={activeFilters.includes(0)} type="checkbox" />
                <span className="checkmark card mb-0" />
            </label>
            <label className="custom-checkbox me-3">
                <span className="custom-checkbox-label">{t`Polygon`}</span>
                <input onChange={handleChange} checked={activeFilters.includes(ChainId.Polygon)} value={ChainId.Polygon} type="checkbox" />
                <span className="checkmark card mb-0" />
            </label>
            <label className="custom-checkbox">
                <span className="custom-checkbox-label">{t`Etherum`}</span>
                <input onChange={handleChange} checked={activeFilters.includes(ChainId.Mainnet)} value={ChainId.Mainnet} type="checkbox" />
                <span className="checkmark card mb-0" />
            </label>
        </div>
    )
}

export default FilterBar
