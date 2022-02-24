import React from 'react'
import { ChainId } from '@usedapp/core'
import { t } from '@lingui/macro'
import { useFormikContext } from 'formik'
import { InfoDashboardFormType } from '@components/organisms/info-dashboard/info-dashboard'

const FilterBar = () => {

    const { values, setFieldValue } = useFormikContext<InfoDashboardFormType>()

    const handleChange = (e) => {
        const chainId = Number(e.currentTarget.value)
        const checked = e.currentTarget.checked
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
        <div className="d-flex mb-4">
            <label className="custom-checkbox me-3">
                <span className="custom-checkbox-label">{t`All Chain`}</span>
                <input onChange={handleChange} value={0} checked={values.activeFilters.includes(0)} type="checkbox" />
                <span className="checkmark card mb-0" />
            </label>
            <label className="custom-checkbox me-3">
                <span className="custom-checkbox-label">{t`Polygon`}</span>
                <input onChange={handleChange} checked={values.activeFilters.includes(ChainId.Polygon)} value={ChainId.Polygon} type="checkbox" />
                <span className="checkmark card mb-0" />
            </label>
            <label className="custom-checkbox">
                <span className="custom-checkbox-label">{t`Etherum`}</span>
                <input onChange={handleChange} checked={values.activeFilters.includes(ChainId.Mainnet)} value={ChainId.Mainnet} type="checkbox" />
                <span className="checkmark card mb-0" />
            </label>
        </div>
    )
}

export default FilterBar
