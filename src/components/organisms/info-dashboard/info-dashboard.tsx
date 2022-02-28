import React from 'react'
import Form from '@components/atoms/form/form'
import api from '../../../api'
import FilterBar from '@components/organisms/info-dashboard/filter-bar'
import Chart from '@components/organisms/info-dashboard/chart'

import { t } from '@lingui/macro'

export type InfoDashboardFormType = {
    activeFilters: Array<number>
    colors: Array<string>
}

export default function SwapForm() {

    const initialValues: InfoDashboardFormType = {
        activeFilters: [0],
        colors: ['#FFFFFF']
    }

    return (
        <Form
            initialValues={initialValues}
            onSubmit={() => {}}
            enableReinitialize
        >
            {() => {
                return (
                   <>
                       <div className="mb-5">
                           <FilterBar />
                       </div>
                       <div className="row">
                           <div className="col-md-8">
                               <Chart
                                    fetchSeries={api.fetchStakingSeries}
                                    headline={t`Staking TVL`}
                                    type="bar"
                               />
                           </div>
                           <div className="col-md-4">
                               <Chart
                                   fetchSeries={api.fetchVestingSeries}
                                   headline={t`Vesting`}
                                   type="bar"
                                   isSmall
                               />
                               <Chart
                                   fetchSeries={api.fetchVestingSeries}
                                   headline={t`Vesting`}
                                   type="area"
                                   isSmall
                               />
                           </div>
                       </div>
                       <div className="row">
                           <div className="col-12">
                               <Chart
                                   fetchSeries={api.fetchStakingSeries}
                                   headline={t`Staking TVL`}
                                   type="area"
                               />
                           </div>
                       </div>
                   </>
                )
            }}
        </Form>
    )
}


