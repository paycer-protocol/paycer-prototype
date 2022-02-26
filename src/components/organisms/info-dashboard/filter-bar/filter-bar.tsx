import React from 'react'
import { mainNetProviders } from '@providers/networks'
import { t } from '@lingui/macro'
import { useFormikContext } from 'formik'
import { InfoDashboardFormType } from '@components/organisms/info-dashboard/info-dashboard'

const FilterBar = () => {

    const { values, setFieldValue } = useFormikContext<InfoDashboardFormType>()

    const handleChange = (e) => {
        const chainId = Number(e.currentTarget.value)
        const checked = e.currentTarget.checked

        if (chainId === 0 && !checked) {
            return false
        }

        let filters
        if (checked) {
            if (chainId !== 0) {
                filters = values.activeFilters.filter(f => f !== 0)
            } else {
                filters = []
            }
            filters.push(chainId)
        } else {
            filters = values.activeFilters.filter(f => f !== chainId)
        }
        if (!filters.length) {
            filters.push(0)
        }
        setFieldValue('activeFilters', [...filters])
    }

    return (
        <div className="d-flex">
            <label className="custom-checkbox me-4">
                <span className="custom-checkbox-label">{t`All`}</span>
                <input onChange={handleChange} value={0} checked={values.activeFilters.includes(0)} type="checkbox" />
                <span className="checkmark card mb-0" />
            </label>
            {Object.keys(mainNetProviders).map((key) => (
                <label key={key} className="custom-checkbox me-4">
                    <span className="custom-checkbox-label">{mainNetProviders[key].chainName}</span>
                    <input onChange={handleChange} checked={values.activeFilters.includes(parseInt(mainNetProviders[key].chainId, 16))} value={parseInt(mainNetProviders[key].chainId, 16)} type="checkbox" />
                    <span className="checkmark card mb-0" />
                </label>
            ))}
        </div>
    )
}

export default FilterBar
