import React from 'react'
import { infoChartProviders } from '@providers/networks'
import { t } from '@lingui/macro'
import { useFormikContext } from 'formik'
import { InfoDashboardFormType } from '../types'

const FilterBar = () => {

    const { values, setFieldValue } = useFormikContext<InfoDashboardFormType>()

    const handleChange = (e):any => {
        const chainId = Number(e.currentTarget.value)
        const checked = e.currentTarget.checked

        if (chainId === 0 && !checked) {
            return false
        }

        let filters
        if (checked) {
            if (chainId !== 0) {
                filters = values.selectedChains.filter(f => f !== 0)
            } else {
                filters = []
            }
            filters.push(chainId)
        } else {
            filters = values.selectedChains.filter(f => f !== chainId)
        }
        if (!filters.length) {
            filters.push(0)
        }
        setFieldValue('selectedChains', [...filters])
    }

    return (
        <div className="d-flex">
            <label className="custom-checkbox me-4">
                <span className="custom-checkbox-label">{t`All`}</span>
                <input onChange={handleChange} value={0} checked={values.selectedChains.includes(0)} type="checkbox" />
                <span className="checkmark card mb-0" />
            </label>
            {Object.keys(infoChartProviders).map((key) => (
                <label key={key} className="custom-checkbox me-4">
                    <span className="custom-checkbox-label">{infoChartProviders[key].chainName}</span>
                    <input onChange={handleChange} checked={values.selectedChains.includes(parseInt(infoChartProviders[key].chainId, 16))} value={parseInt(infoChartProviders[key].chainId, 16)} type="checkbox" />
                    <span className="checkmark card mb-0" />
                </label>
            ))}
            <label style={{pointerEvents: 'none', opacity: 0.3}} className="custom-checkbox me-4 d-none d-md-block">
                <span className="custom-checkbox-label">Binance Smart Chain</span>
                <input onChange={handleChange} type="checkbox" />
                <span className="checkmark card mb-0" />
            </label>
            <label style={{pointerEvents: 'none', opacity: 0.3}} className="custom-checkbox me-4 d-none d-md-block">
                <span className="custom-checkbox-label">Avalanche</span>
                <input onChange={handleChange} type="checkbox" />
                <span className="checkmark card mb-0" />
            </label>
        </div>
    )
}

export default FilterBar
